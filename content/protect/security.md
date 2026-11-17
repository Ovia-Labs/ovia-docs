---
title: Security & Privacy
description: Ovia Protect security principles, data handling and privacy, and its known limitations, including false negatives and out-of-scope permissions.
status: prd
related: [whitepaper/security-privacy-limitations, resources/security-disclosures]
---

> [!WARNING] Not audited
> Ovia Protect has not been built or audited. These are design requirements.

## Principles

- **No signing capability.** The product never asks for a connection, signature, private key or seed phrase. Anyone who does, claiming to be Ovia Protect, is not Ovia Labs.
- **Verify before display.** Shown allowances are read on-chain at a recorded block.
- **No safe verdicts.** “No approvals found” is never presented as “safe”.
- **Fail visibly.** Partial or failed checks are labelled as such.

## Data handling

| Data | Handling |
|---|---|
| Address entered | Used to run the check; not stored |
| Results | Shown, then discarded; no history |
| Request metadata (such as IP address) | Visible to hosting and RPC providers, as with any web request |
| Tracking cookies, accounts | None planned |

## Known limitations

- **Discovery may be incomplete.** An approval that the discovery source does not return will not be shown. This is the main limitation, and why results carry a coverage notice.
- **Ethereum Mainnet only** in the first version.
- **Not covered:** Permit2 sub-allowances (untested), NFT operator approvals, unsubmitted permit signatures, EIP-7702 delegations.
- **Non-standard tokens** may revert or return unexpected values.
- **Labels are not proof.** A spender name says who someone believes the contract belongs to, not that it is trustworthy.
- **Point in time.** Results are true at the block shown and can change afterwards.
- **No judgement of intent.** An allowance can be read; whether a spender is honest cannot.

## Reporting a vulnerability

See [Security Disclosures](/resources/security-disclosures).
