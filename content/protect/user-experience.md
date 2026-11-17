---
title: User Experience
description: The planned Ovia Protect user flow, from entering a public address to understanding each approval and the limits of the check.
status: prd
related: [protect, protect/scope]
---

> [!PROPOSAL] Planned experience
> This describes the intended flow from the PRD. Screens and wording will change during design and user testing.

## Principles

- **One input.** A public address or ENS name. Nothing to install or connect.
- **Explanation over alarm.** Results are written to help a decision, not to frighten.
- **Visible certainty.** Every result shows what was checked, when and how.

## Planned flow

1. **Enter an address.** The interface reminds users that Ovia Protect never asks for a seed phrase, private key or signature.
2. **Check runs.** The product finds candidate approvals and verifies each one on-chain. Progress is shown; if a source fails, that is shown too.
3. **Results.** Each active approval appears as a row: token, spender, allowance (with “unlimited” called out), and the block the value was read at.
4. **Explanation.** Opening a row explains, in plain language, what that spender can do with that token and why an application may have asked for it.
5. **Coverage notice.** Every result page says what was covered and what was not, for example Permit2 sub-allowances or other networks.
6. **Next steps.** Guidance on how to reduce an allowance using the user’s own wallet or an established revocation tool. The first version does not revoke anything itself.

## Result states

| State | Meaning | Wording principle |
|---|---|---|
| Approvals found | Verified non-zero allowances exist | Explain each one; no verdict |
| None found | No verified allowances among covered sources | “No active approvals found in the sources checked”, never “safe” |
| Partial | Some sources or checks failed | Show what succeeded and what did not |
| Failed | The check could not run | Plain error with a retry option |

## Accessibility and language

The interface is planned to be fully keyboard-accessible, readable at high zoom and written in plain English, with technical detail available on request rather than shown by default.
