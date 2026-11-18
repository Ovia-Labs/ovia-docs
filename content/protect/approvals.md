---
title: Token Approvals
description: How ERC-20 approvals and allowances work, why unlimited approvals exist, and how Permit2, ERC-2612 permits and NFT operator approvals differ.
status: draft
related: [web3-security, protect/technical-design, resources/glossary]
---

> [!NOTE] Educational
> This page explains existing Ethereum standards. It describes how approvals work in general, not features of Ovia Protect.

## Approve, then transfer

The [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) lets a token holder (the **owner**) allow another address (the **spender**) to move tokens on their behalf:

- `approve(spender, amount)` sets the spender’s allowance and emits an `Approval(owner, spender, value)` event.
- `allowance(owner, spender)` returns how much the spender may still move.
- `transferFrom(owner, recipient, amount)` lets the spender move tokens, reducing the allowance.

This two-step pattern lets smart contracts, such as an exchange, pull exactly the tokens a user agreed to trade.

## Unlimited approvals

Many applications request the maximum possible value (2²⁵⁶ − 1), often shown as “unlimited”. This saves the user an approval transaction, and its fee, each time they use the application. The trade-off is that the spender can move **all** of that token, now and in the future, until the allowance is reduced.

## Why approvals matter after you stop using an app

An allowance has no expiry. If a spender contract is exploited, upgraded maliciously or was malicious from the start, any active allowance to it can be used. Approval-based losses usually do not require the victim to do anything at the time of the theft. The permission was granted long before.

## Reducing or revoking an approval

Calling `approve(spender, 0)` sets the allowance to zero. This is an on-chain transaction and costs gas. Established tools such as [Etherscan’s token approval checker](https://etherscan.io/tokenapprovalchecker) and [Revoke.cash](https://revoke.cash) help users do this from their own wallet.

## Signature-based approvals

| Mechanism | How it grants permission | What to know |
|---|---|---|
| [ERC-2612 permit](https://eips.ethereum.org/EIPS/eip-2612) | The owner signs an off-chain message; anyone can submit it to set an allowance | Signing alone can grant an approval, without a transaction from the owner |
| [Permit2](https://docs.uniswap.org/contracts/permit2/overview) | Users approve the Permit2 contract once per token; applications then receive sub-allowances, often by signature, with amounts and expirations | An ERC-20 scan shows the approval to Permit2, not the sub-allowances inside it |
| [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data | The standard format for such signatures | Wallets can display the fields, which helps users see what they sign |

The canonical Permit2 contract on Ethereum Mainnet is `0x000000000022D473030F116dDEE9F6B43aC78BA3`.

## NFT operator approvals

[ERC-721](https://eips.ethereum.org/EIPS/eip-721) and [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) include `setApprovalForAll(operator, true)`, which lets an operator move **every** token of that collection held by the owner. These are a different mechanism from ERC-20 allowances and are not covered by the Ovia Protect beta.

## Account delegation

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) lets an externally owned account set code that runs on its behalf. A delegation to a malicious contract is a different and broader risk than a token approval. It is noted here for completeness and is not covered by the Ovia Protect beta.
