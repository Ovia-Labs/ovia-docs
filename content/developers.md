---
title: Developers
description: Technical concepts behind Ovia Labs products for developers. There is no public API or SDK; this page explains what exists and what does not.
status: not-specified
related: [protect/technical-design, whitepaper/technical-architecture, resources/references]
---

> [!STATUS] No API or SDK
> Ovia Labs has no public API, SDK, endpoint, package or contract. Nothing on this page is an interface you can integrate with today.

## Architecture concepts

The Ovia Protect beta separates two steps:

- **Discovery:** finding candidate (token, spender) pairs for an owner, from historical `Approval` events.
- **Verification:** reading `allowance(owner, spender)` with `eth_call` at a pinned block, so every displayed value can be reproduced by anyone with an Ethereum node.

Every check is fixed to one block. The beta runs entirely in the browser against public RPC endpoints; it has no backend and no API of its own. See [Technical design](/protect/technical-design) and [whitepaper chapter 5](/whitepaper/technical-architecture).

## Integration opportunities

Possible future directions, all {{status:proposed}}:

- Wallets or applications showing approval information to their users.
- Educators linking to explained, reproducible approval checks.
- Researchers comparing approval data sources against on-chain ground truth.

None of these exists. If you are interested in a future integration, [contact Ovia Labs](https://ovialabs.xyz/contact).

## API and SDK status

| Interface | Status |
|---|---|
| Public REST or JSON API | {{status:not-specified}} |
| JavaScript or TypeScript SDK | {{status:not-specified}} |
| Smart contracts | None deployed |
| Data schema | Illustrative draft in the whitepaper; not published or stable |

When an interface is specified, it will be documented here with its version and stability level.

## Technical references

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-2612: Permit extension](https://eips.ethereum.org/EIPS/eip-2612)
- [EIP-712: Typed structured data signing](https://eips.ethereum.org/EIPS/eip-712)
- [Permit2 overview](https://docs.uniswap.org/contracts/permit2/overview)
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)

More in [References](/resources/references).
