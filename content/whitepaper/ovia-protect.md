---
title: "4. Ovia Protect: Product Vision"
description: Objectives, users, workflows, approval analysis, risk communication and the proposed MVP boundaries of Ovia Protect.
status: draft
related: [protect, protect/scope, protect/user-experience]
---

> [!STATUS] Source of truth
> The confirmed product definition and validation constraints come from the Ovia Protect PRD work items, including PRD-010. Everything else in this chapter is a proposal and is labelled as such.

## Product objectives

1. **Show active approvals clearly.** For a given Ethereum address, list the ERC-20 approvals that are currently active: token, spender, and remaining allowance, with unlimited approvals clearly marked.
2. **Prove what is shown.** Each displayed allowance is checked against the blockchain at a recorded block, so a user or third party can reproduce it.
3. **Be honest about gaps.** When the product cannot be sure it has found everything, it says so. It never reports a wallet as “safe”.
4. **Explain in plain language.** Translate raw values into statements a non-expert understands, and suggest what the user might consider doing.

## Intended users

| User | Need | How Ovia Protect helps (proposed) |
|---|---|---|
| Everyday holders | “What have I approved over the years?” | A plain-language list, unlimited approvals first |
| Active DeFi users | Regular clean-up of permissions | Fast, repeatable checks of any address |
| People who think they were phished | “What can still be taken?” | A quick view of active permissions to prioritise removal |
| Educators and support staff | Explaining approvals with real examples | Shareable, verifiable results for a public address |

## Potential user workflows {{status:proposed}}

**Check a wallet.** The user pastes a public Ethereum address. Ovia Protect discovers candidate approvals, verifies each one on-chain, and shows the result with the block number used.

**Understand one approval.** The user opens an approval to see the token, the spender, the remaining allowance, whether it is unlimited, and a short explanation of what the spender can do.

**Decide what to do next.** For approvals the user no longer needs, Ovia Protect explains how they can be removed. Because the first version does not connect to wallets or send transactions, removal would happen in the user’s own wallet or another tool. Whether Ovia Protect should later offer removal itself is an open question.

## Wallet inspection concepts

Ovia Protect inspects; it does not act. It reads public blockchain state for an address the user supplies. It never asks for a private key, seed phrase or signature, and the validation constraints exclude wallet connections entirely. This keeps the attack surface small and makes the product safe to use on any address, including addresses the user does not own.

## Permission visibility and approval analysis

For each candidate (token, spender) pair:

1. **Verify** the current allowance by calling `allowance(owner, spender)` on the token contract at a fixed block.
2. **Discard** pairs whose current allowance is zero, so that only active permissions are shown.
3. **Classify** the amount: unlimited (2²⁵⁶−1 or a value so large it is effectively unlimited), larger than the current balance, or limited.
4. **Describe** the spender where possible (for example, a well-known router), while making clear when a spender is unknown.
5. **Record** the block number and time of verification with the result.

Steps 1 to 3 rely only on public chain data. Step 4 depends on labelling information that cannot be verified on-chain; this is exactly the kind of information Ovia Network research is concerned with.

## Risk communication {{status:proposed}}

Ovia Protect does not issue safety scores. It uses **descriptive signals** that state facts and their implications:

| Signal | Basis | Example wording |
|---|---|---|
| Unlimited approval | Allowance equals or approaches 2²⁵⁶−1 | “This contract can move all of your USDC, including USDC you receive later.” |
| Exceeds balance | Allowance is larger than the current balance | “This permission is larger than what you hold today.” |
| Unknown spender | No reliable label for the spender | “We could not identify this contract.” |
| Incomplete coverage | Discovery may have missed approvals | “We may not have found every approval for this address.” |

Words such as “safe”, “secure” or “risk-free” are never used to describe a wallet or contract.

## User experience principles

- **Plain language first, details on demand.** Addresses and raw values are available, never the headline.
- **The most consequential items first.** Unlimited approvals are listed before limited ones.
- **Show your working.** Every result shows the block it was verified at.
- **No false comfort.** An empty result is presented as “no active approvals found by our sources”, together with the sources’ known limits.
- **Calm, not alarming.** The aim is informed decisions, not fear.

## Proposed MVP boundaries

| In scope for the first version | Out of scope for the first version |
|---|---|
| Ethereum Mainnet | Other networks and Layer 2s |
| ERC-20 approvals | NFT operator approvals (`setApprovalForAll`) |
| Public address input | Wallet connection |
| On-chain verification at a recorded block | Transaction simulation, blocking or alerts |
| Plain-language explanations | Revoking approvals inside Ovia Protect |
| No stored scans, no accounts | User accounts, history or monitoring |

The left column reflects the confirmed definition and validation constraints. The exact feature list will be fixed in the PRD.

## Features requiring additional research

- **Discovery of all approvals for an address** at zero additional cost. PRD-010 showed that free RPC log queries are too limited for full-history scans and that the tested free API missed ERC-20 approvals. {{status:not-specified}}
- **Permit2 sub-allowances**, which live in the Permit2 contract rather than in each token. A scanner that only checks ERC-20 `allowance()` will miss them. {{status:research}}
- **NFT operator approvals** and ERC-1155 approvals. {{status:research}}
- **Spender labelling** that users can trust and verify. {{status:research}}
- **Continuous monitoring and alerts**, which would require persistent infrastructure the first version deliberately avoids. {{status:future}}
