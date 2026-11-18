---
title: Security & Privacy
description: Ovia Protect beta security principles, data handling and third-party providers, and its known limitations, including incomplete results and out-of-scope permissions.
status: beta
related: [whitepaper/security-privacy-limitations, resources/security-disclosures]
---

> [!WARNING] Not audited
> The Ovia Protect beta has not been independently reviewed or audited. Its results describe one block and can be incomplete.

## Principles

- **No signing capability.** The beta never asks for a connection, signature, private key or seed phrase, and never sends transactions. Anyone who does, claiming to be Ovia Protect, is not Ovia Labs.
- **Verify before display.** Shown allowances are read on-chain at a recorded block.
- **No safe verdicts.** No result is ever presented as “safe”.
- **Fail visibly.** Contracts that could not be read are counted and shown.

## Data handling

The beta runs entirely in your browser.

| Data | Handling |
|---|---|
| Address entered | Used to run the scan in your browser; not sent to or stored by Ovia Labs |
| Results | Shown, then gone when you close or reload the page |
| Cookies, accounts | None |
| Requests to RPC providers | Contain the address being scanned, plus your IP address and browser details |

## Third parties that receive data during a scan

Your browser sends requests directly to these public Ethereum RPC providers:

- **Tenderly** (public Ethereum gateway): searches historical approval events.
- **MEV Blocker RPC:** used only if Tenderly does not answer.
- **Alchemy** (public Ethereum endpoint): reads current allowances, token details and contract code.

They process that data under their own privacy policies and terms. Ovia Labs has no control over what they log or retain. Links to Revoke.cash and Etherscan open those independent sites; nothing is sent to them unless you click a link. The full notice is in the app under **Privacy**.

## Known limitations

- **Discovery can be incomplete.** An approval that does not appear in the historical event search is not shown. This is why results never say “safe”.
- **Ethereum Mainnet only.**
- **Not covered:** NFT approvals, Permit2 sub-allowances, unused `permit()` signatures, tokens that do not emit standard `Approval` events, EIP-7702 delegations.
- **Non-standard tokens** may not return a valid allowance. They are counted as unreadable.
- **Labels are not proof.** A spender name says who Ovia believes the contract belongs to, not that it is trustworthy. Unrecognized token names are self-reported by the contract.
- **Point in time.** Results are true at the block shown and can change afterwards.
- **No judgement of intent.** An allowance can be read; whether a spender is honest cannot.
- **Public infrastructure.** The beta depends on free public endpoints without service guarantees. If they are slow or unavailable, scans can fail.

## Reporting a vulnerability

See [Security Disclosures](/resources/security-disclosures).
