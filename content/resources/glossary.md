---
title: Glossary
description: Definitions of Web3 security terms used across the Ovia Labs documentation, from allowance and approval to Permit2, RPC and Sybil attack.
status: draft
related: [protect/approvals, web3-security, resources/faq]
---

## A–E

**Allowance.** The amount of a token that a spender may still move from an owner’s wallet, as returned by `allowance(owner, spender)` on an ERC-20 contract.

**Approval.** The act of granting an allowance, usually through `approve(spender, amount)`. Emits an `Approval` event.

**Attestation.** A signed statement by a verifier that a claim is true, used in the Ovia Network research concept.

**Block.** A batch of transactions added to the chain. Reads can be pinned to a block number so that results are reproducible.

**Discovery.** In Ovia Protect’s design: finding candidate (token, spender) pairs for an owner. Distinct from verification.

**EIP / ERC.** Ethereum Improvement Proposal; an ERC (Ethereum Request for Comments) is an application-level standard such as ERC-20.

**EIP-712.** A standard for signing typed, structured data so wallets can display what is being signed.

**EIP-7702.** A standard that lets an externally owned account set code to run on its behalf (delegation).

**`eth_call`.** A JSON-RPC method that executes a read-only contract call without creating a transaction.

**`eth_getLogs`.** A JSON-RPC method that returns event logs matching a filter.

## F–O

**False negative.** A real issue that a check fails to report, such as an active approval that was not found.

**False positive.** An issue reported that does not exist.

**Indexer.** A service that processes chain data into searchable records, such as all approvals by owner.

**Non-custodial.** Never holding or controlling users’ assets or keys.

**Operator approval.** Under ERC-721 and ERC-1155, `setApprovalForAll` lets an operator move all of a user’s tokens in a collection.

**Owner.** The address whose tokens an allowance applies to.

## P–Z

**Permit (ERC-2612).** An extension to ERC-20 that lets an owner set an allowance by signing a message instead of sending a transaction.

**Permit2.** A contract that manages token approvals for applications through one approval per token and signature-based sub-allowances with amounts and expirations.

**PRD.** Product requirements document: the specification a product is built from.

**Revocation.** Reducing an allowance to zero, usually with `approve(spender, 0)`.

**RPC endpoint.** A node interface that answers JSON-RPC requests about the chain.

**Spender.** The address allowed to move an owner’s tokens under an allowance, usually an application’s contract.

**Sybil attack.** One actor posing as many independent participants to gain influence.

**Unlimited approval.** An allowance set to the maximum value (2²⁵⁶ − 1), letting the spender move any amount of that token.

**Verification.** In Ovia Protect’s design: confirming a candidate allowance on-chain with `eth_call` at a recorded block.
