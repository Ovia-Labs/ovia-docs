---
title: 6. Security, Privacy and Limitations
description: Security principles, privacy, third-party dependencies, false positives and negatives, threat model and validation requirements for Ovia Protect.
status: draft
related: [protect/security, resources/security-disclosures, whitepaper/risks-open-questions]
---

> [!WARNING] No audits, no guarantees
> The Ovia Protect beta has not been audited or independently reviewed. Nothing in this chapter is a security guarantee. It describes principles and requirements that the product must meet before release.

## Security design principles

1. **Least capability.** A tool that cannot sign cannot be tricked into signing. The beta has no wallet connection and no transaction capability.
2. **Verify before display.** Only on-chain values read at a recorded block support security-relevant statements.
3. **Fail visibly.** When data is missing, delayed or contradictory, the product says so instead of guessing.
4. **No safe verdicts.** The product never declares a wallet or contract safe.
5. **Minimal data.** Nothing that identifies a user is stored.

## Read-only inspection

Inspecting a public address is inherently low-risk for the user: it requires no permissions and reveals nothing that is not already public on-chain. The main residual risk is **misleading output**: a missed approval, a wrong label or an unclear explanation that leads to a poor decision. Most of this chapter is about that risk.

## Wallet connection risks

The beta has no wallet connection. Revoking inside Ovia Protect, the next planned step, would add one, which brings new risks: users becoming accustomed to approving requests from the product, spoofed versions of the site asking for signatures, and session handling. Any future connection must be read-only, request no signatures beyond what is strictly needed, and pass a dedicated security review.

## Data handling and privacy

| Data | Collected? | Notes |
|---|---|---|
| Wallet address entered | Processed, not stored | Needed to run the check. Public by nature, but linkable to a person. |
| Scan results | Not stored | Shown to the user and discarded. |
| IP address | Seen by infrastructure providers | Unavoidable for any web request; see third-party dependencies. |
| Accounts, emails, cookies | No | The beta has no accounts and uses no cookies. |

Even though addresses are public, the act of checking an address can reveal interest in it. This is why scans are not stored and why execution placement is treated as a privacy decision.

## Third-party infrastructure dependencies

The product depends on public RPC endpoints and on whichever discovery source is chosen. These parties can see request metadata, can rate-limit or stop service, and can return incorrect or incomplete data. Mitigations:

- Verification uses a source that is independently reproducible (any Ethereum node).
- Multiple RPC endpoints can be supported, so a single provider cannot silently alter results.
- Each result records its source and block so it can be re-checked.
- Terms of use of every dependency are reviewed before production use. PRD-010 rejected one free API partly because it publishes no terms.

## Detection limitations

- **Discovery is incomplete by nature** unless a full, current index of approvals is available.
- **Non-standard tokens** may not follow ERC-20 exactly, so `allowance()` may revert or behave unexpectedly.
- **Permissions outside token contracts**, such as Permit2 allowances, NFT operator approvals, signed but unsubmitted permits and EIP-7702 delegations, are not covered by an ERC-20 scanner.
- **Malicious intent is not on-chain.** Whether a spender is trustworthy cannot be proven by reading its allowance.

## False positives and false negatives

| Error | Example | Consequence | Mitigation |
|---|---|---|---|
| False negative | An active approval is not found | False reassurance | Coverage notice on every result; never “safe” |
| False positive | An approval shown that is not active | Unnecessary worry or revocation cost | Show only allowances verified as non-zero at a recorded block |
| Mislabelled spender | Wrong application name | Wrong decision | Labels marked as unverified; addresses always available |
| Stale result | Allowance changed after the check | Outdated picture | Show block number and time; easy re-check |

The architecture is designed so that the false positive rate for displayed allowances is close to zero, because every displayed value is read on-chain. False negatives cannot be eliminated without complete discovery, which is why they are communicated rather than hidden.

## Threat modelling

| Threat | Description | Planned response |
|---|---|---|
| Phishing clone | A fake Ovia Protect site asks for signatures or seed phrases | Product never asks for either; this is stated in the interface and docs |
| Data source manipulation | A dependency returns false data | On-chain verification; multiple endpoints |
| Misleading token metadata | A token claims a familiar name or symbol | Metadata treated as untrusted; addresses shown |
| Supply-chain compromise | Malicious code in a dependency or build | Minimal dependencies, lockfiles, review before release |
| Front-end injection | Crafted on-chain strings rendered as HTML | All external strings escaped |
| Denial of service | Public endpoints rate-limited | Graceful degradation, clear error states |

## Responsible disclosure

Ovia Labs welcomes reports of vulnerabilities in its website, documentation and future products. See [Security Disclosures](/resources/security-disclosures). There is currently no paid bug bounty programme.

## Security validation requirements before release

Version 0.1 of this paper listed these as requirements before any public release. Ovia Protect was released as a public beta first, so they now apply before Ovia Protect leaves beta:

1. A written threat model reviewed against the final architecture.
2. Accuracy testing: displayed allowances match `eth_call` results at the recorded block for a published test set of addresses.
3. Coverage testing: discovery results compared with an independent source, with the measured coverage stated in the product.
4. A dependency and build review.
5. An independent security review. Its scope and reviewer have not been decided, and no audit has taken place.
