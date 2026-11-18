---
title: Understanding Web3 Security
description: A plain-language introduction to wallets, approvals, signatures and the risks they carry.
lead: A short guide to what actually happens when you click Connect, Sign or Approve, written for people who use crypto rather than build it.
related: [protect/approvals, whitepaper/problem, resources/glossary]
---

## Your wallet holds keys, not coins

Your tokens live on the blockchain. Your wallet holds the private key that proves you control an address. Anything that key signs is treated as your decision. That is why most risks in Web3 are not about someone “breaking into” the blockchain, but about getting you to sign something you did not fully understand.

## Four things your wallet can ask you to do

| Request | What it does | Can it move your funds? |
|---|---|---|
| **Connect** | Shares your public address with a website | No, not on its own |
| **Sign a message** | Proves you control the address, often as a login | Usually no, but some signed messages grant permissions (see below) |
| **Approve** | Gives a smart contract permission to move a token from your wallet later | Yes, up to the approved amount, until you remove it |
| **Send a transaction** | Changes something on-chain right now: a transfer, swap or approval | Yes |

## Approvals: the permission most people forget

Many apps need to move tokens on your behalf. A decentralised exchange cannot swap your USDC unless it is allowed to take it from your wallet. The ERC-20 token standard handles this with an **approval**: you allow a *spender* (a smart contract) to move up to a set amount of a token.

Two things make approvals easy to underestimate:

- **They persist.** An approval stays active after you leave the website, often for years, until it is used up or you remove it.
- **They are often unlimited.** Apps frequently request the maximum possible amount so you do not have to approve again. An unlimited approval lets that contract move all of that token you hold now, and any you receive later.

If an approved contract is later exploited, or if you approved a malicious contract on a phishing site, those permissions can be used to move your tokens without any further action from you.

## Signatures that act like approvals

Some permissions are granted by **signing a message** instead of sending a transaction:

- Tokens that support **ERC-2612 “permit”** let a signed message set an allowance.
- **Permit2**, a widely used contract from Uniswap Labs, manages allowances and transfers through signed messages after a one-time approval to Permit2 itself.

Because no transaction is sent, these requests can look harmless. A signature can still authorise spending.

## NFTs: approval for everything

For NFTs, the common permission is `setApprovalForAll`, which lets an *operator* manage **every** NFT you hold in that collection. Marketplaces need it to list items, and phishing sites ask for it for the same reason.

## Good habits

- Read what a request is for before you approve it. If your wallet shows an unlimited amount, consider setting a lower limit.
- Review your active approvals from time to time and remove ones you no longer use. Removing an approval is itself a transaction and costs a network fee.
- Be wary of urgency, unexpected “claims” and sites reached through links in messages.
- No legitimate service needs your seed phrase. Ovia Labs will never ask for it.

> [!LIMITATION] What approval checks cannot do
> Reviewing approvals reduces one kind of risk. It does not protect against a compromised seed phrase, a malicious transaction you sign directly, a fake token or a bug in a contract you use today. Removing an approval does not recover tokens that were already taken.

Ovia Protect, now in public beta, makes the approval part of this picture easier to see. See [Ovia Protect](/protect).
