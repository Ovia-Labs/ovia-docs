---
title: User Experience
description: How the Ovia Protect beta works for a user, from pasting a public address to reading each approval and the limits of the check.
status: beta
related: [protect, protect/scope]
---

> [!STATUS] Describes the public beta
> This is the flow in the beta at [protect.ovialabs.xyz](https://protect.ovialabs.xyz) as of 18 November 2026. Screens and wording may change as the beta develops.

## Principles

- **One input.** A public wallet address. Nothing to install, connect or sign.
- **Facts, not scores.** Results show what the blockchain says. Ovia Protect does not calculate risk scores.
- **Visible certainty.** Every result shows the block it was checked at and what was not covered.

## The flow

1. **Enter an address.** A 42-character `0x` address. ENS names are not supported yet. An example address is available to try the scanner without using your own.
2. **Scan.** Ovia Protect fixes the check to the latest block, searches the wallet’s history for approvals and verifies each one on the token contract.
3. **Summary.** The number of active approvals, how many are unlimited, and how many involve recognized or unrecognized tokens, with the wallet and the block number the check used.
4. **Approvals.** Each active approval shows the token, the spender and the allowance. Unlimited allowances are marked as such. Spenders that Ovia recognizes are named; others are shown as an unknown contract with their address.
5. **Recognized and unrecognized tokens.** Tokens on Ovia’s curated list are shown first. Approvals on other tokens are grouped separately, with a note that they may include spam airdrops and that their names are self-reported by the token contract.
6. **What else was found.** Past approvals that are no longer active (used up, reset or revoked) and token contracts that could not be read are counted, so nothing disappears silently.
7. **Next steps.** Each approval links to Revoke.cash. The beta explains that removing an approval means the wallet owner sends an `approve(spender, 0)` transaction, that Ovia Protect never sends transactions itself, and that users should check the address bar before connecting a wallet anywhere.

## Result states

| State | What the user sees | Wording principle |
|---|---|---|
| Approvals found | Verified non-zero allowances, with the block number | Facts per approval; no verdict |
| None found | No active approvals among what was checked | Never “safe” |
| Partly readable | Approvals plus a count of contracts that could not be read | Say what could not be checked |
| Failed | The scan could not complete | Plain error, so the user can try again |

## Every result carries its limits

Each result repeats what the beta does not cover: NFT approvals, Permit2 sub-allowances, unused `permit()` signatures, other chains and tokens that do not emit standard `Approval` events. It also states that an approval is not proof of a problem and that no result means a wallet is safe.
