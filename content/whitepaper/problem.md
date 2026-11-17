---
title: "2. The Problem: Trust, Permissions and Transparency"
description: How Web3 permissions work, why unlimited approvals and signatures create risk, and where existing tools fall short.
status: draft
related: [web3-security, protect/approvals, whitepaper/ovia-protect]
---

## How wallet permissions work

An Ethereum account controlled by a private key is called an externally owned account (EOA). Every action the account takes on-chain is a transaction signed by that key. Smart contracts cannot pull tokens out of an account on their own; they need permission, and that permission is itself recorded on-chain.

Permissions are granted in several ways that look similar to users but behave differently:

| Mechanism | Granted by | Stored where | Typical scope |
|---|---|---|---|
| ERC-20 approval | A transaction calling `approve(spender, amount)` | In the token contract | One token, one spender, up to an amount |
| ERC-2612 permit | A signed message, submitted by anyone | In the token contract, once submitted | Same as an approval, with a deadline on the signature |
| Permit2 allowance | An approval to Permit2, then signed messages | In the Permit2 contract | Per token and spender, with an amount and an expiry |
| NFT operator approval | A transaction calling `setApprovalForAll(operator, true)` | In the NFT contract | Every token the owner holds in that collection |
| Transaction signature | Signing and sending a transaction | The resulting state change | Whatever the transaction does |
| Message signature | Signing a message (EIP-191 or EIP-712) | Off-chain, until used | Depends on the contract that accepts it |
| Account delegation (EIP-7702) | A signed authorisation in a set-code transaction | On the account itself | Sets code on the EOA, which then runs on every call |

## ERC-20 approvals and allowances

The ERC-20 standard ([EIP-20](https://eips.ethereum.org/EIPS/eip-20)) defines how fungible tokens behave. Two functions matter here:

- `approve(spender, value)` sets how much of the caller’s tokens `spender` may transfer, and emits an `Approval(owner, spender, value)` event.
- `allowance(owner, spender)` returns the amount `spender` can still transfer.

A spender then uses `transferFrom(owner, recipient, amount)` to move tokens, reducing the allowance as it goes. This is what allows a decentralised exchange to pull your tokens into a swap in the same transaction.

Two properties are important for security. First, **an allowance persists** until it is spent, changed or set to zero; leaving the website does nothing. Second, **the current allowance is the authoritative state**. Historical `Approval` events show what was granted over time, but the value returned by `allowance()` today is what a spender can actually use.

## Unlimited approvals

To spare users from approving again on every interaction, many applications request the largest possible value, 2²⁵⁶−1, often called an “infinite” or unlimited approval. Common token implementations treat this value as a sentinel that is not reduced on use.

Unlimited approvals are convenient, but they change the risk profile. The spender can move **all** of that token the owner holds, including tokens received in the future. If the spender contract is later exploited, upgraded maliciously or was malicious from the start, the approval is the path to the funds. The PRD-010 test found unlimited approvals to well-known contracts on a single, publicly known address, which illustrates how ordinary they are.

The EIP-20 text itself recommends that user interfaces set an allowance to zero before changing it to a new non-zero value, because a spender can otherwise use both the old and new allowance if transactions are reordered.

## Signatures that grant spending rights

[ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) adds a `permit` function to tokens that support it: the owner signs a structured message ([EIP-712](https://eips.ethereum.org/EIPS/eip-712)) and anyone can submit it to set an allowance. [Permit2](https://docs.uniswap.org/contracts/permit2/overview), from Uniswap Labs, generalises this to any ERC-20: the user approves Permit2 once, and then grants per-application allowances with signed messages. Permit2’s allowance mode supports expirations, and its signature-transfer mode authorises one-off transfers.

These designs reduce the number of transactions and can make permissions more precise. They also mean that a **message signature can authorise spending**. Phishing sites rely on users treating signature requests as harmless logins.

## Smart contract interaction risks

Even a well-understood permission is only as safe as the contract that receives it. Risks include bugs in the spender contract, upgradeable contracts whose code can change after the approval is given, compromised administrator keys, and contracts that impersonate known applications. Since the activation of [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), an EOA can also delegate its behaviour to contract code through a signed authorisation, which adds a powerful new kind of permission for wallets and users to understand.

## The visibility problem

Most wallets show permissions at the moment they are requested, if at all, and often as raw function data. Afterwards, the user has no default view of what is still active. Answering “what can spend my tokens?” requires knowing which token contracts to check, which spenders to check them against, and how to read the result. The data is public, but discovery is hard: an account’s approvals are spread across many token contracts, and the standard offers no way to list all spenders for an owner.

## Common misunderstandings

- “Disconnecting a site removes its access.” Disconnecting only stops the site from seeing your address. On-chain approvals remain.
- “I only approved what I swapped.” Many interfaces request unlimited approvals by default.
- “Signing is free, so it is safe.” A signed message can grant an allowance or authorise a transfer.
- “A hardware wallet protects me.” It protects the key. It does not undo a permission you signed with it.
- “No approvals were found, so I am safe.” A tool can only show what its data source found. Incomplete data produces false reassurance.

## Existing approaches and their limits

Approval checkers already exist. Block explorers such as Etherscan offer a [token approval checker](https://etherscan.io/tokenapprovalchecker), and dedicated tools such as [Revoke.cash](https://revoke.cash) let users inspect and revoke approvals across many networks. Some wallets add transaction simulation or security warnings at signing time.

These tools are valuable, and Ovia Labs does not claim they are inadequate. Their common limits are structural:

- **Data provenance is opaque to users.** Results usually come from a single indexer or provider. Users cannot easily tell how complete or current a result is.
- **Explanations target experienced users.** Spender addresses, raw amounts and contract names are shown without context about what they mean for the user.
- **Coverage gaps are rarely stated.** An empty list is often indistinguishable from “we could not check”.

## Why better transparency helps

Transparency does not remove risk; it changes decisions. A user who can see that an old, unlimited approval is still active can choose to remove it. A user who understands that a signature request grants spending rights can pause before signing. Ovia Labs’ hypothesis is that **clear, verifiable, plainly explained information** improves those decisions, provided the product is equally clear about what it could not verify.

> [!LIMITATION] What permission inspection cannot prevent
> Inspecting approvals cannot prevent seed phrase theft, malware, malicious transactions signed directly, address poisoning, fake tokens or exploits in contracts a user deliberately interacts with. Ovia Protect addresses one important category of risk, not all of them.
