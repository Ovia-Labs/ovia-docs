---
title: "5. Ovia Protect: Technical Architecture"
description: Proposed architecture for Ovia Protect, covering data retrieval, RPC, approval state, indexing, normalisation, responsibilities and trade-offs.
status: draft
related: [protect/technical-design, developers, whitepaper/security-privacy-limitations]
---

> [!STATUS] Updated for the public beta
> This chapter describes the architecture options that were considered and, in its last section, the choices made for the Ovia Protect public beta. The beta’s current design is documented in [Technical design](/protect/technical-design).

## Design constraints

The architecture is shaped by the working constraints used during validation:

- **Zero additional cost:** free, public infrastructure only; no paid plans.
- **No API keys** unless optional.
- **No database** and no permanent storage of scanned addresses.
- **Read-only:** no wallet connection, signatures or transactions.
- **Ethereum Mainnet** first.

These constraints are deliberate. They limit what the beta can do, but they keep it cheap to run, simple to audit and free of user data.

## Discovery and verification are different problems

Finding out which approvals an address has is a **discovery** problem. Confirming that a specific approval is still active is a **verification** problem. Ovia Protect treats them separately.

| | Discovery | Verification |
|---|---|---|
| Question | Which (token, spender) pairs might this owner have approved? | What is the allowance for this pair right now? |
| Data | Historical `Approval` events | Current contract state via `allowance()` |
| Difficulty | High: spread across all token contracts and all of history | Low: one read per pair |
| Trust | Depends on the completeness of the source | Reproducible by anyone with an Ethereum node |
| PRD-010 result | Tested free API: no-go. Free RPC log scans: impractical | Free public RPC: works |

The proposed rule is simple: **discovery may come from any source, but nothing is shown until it has been verified on-chain.** A discovery source can only cause false negatives (missed approvals), never false positives in the displayed results.

## Blockchain data retrieval and RPC

Applications read Ethereum through the [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) exposed by nodes. Two methods matter most:

- `eth_call` executes a read-only contract call, such as `allowance(owner, spender)`, at a chosen block, without creating a transaction.
- `eth_getLogs` returns event logs that match a filter, such as all `Approval` events where the owner is a given address.

PRD-010 established that a free public endpoint answers `eth_call` reliably, accepts JSON-RPC batches (a batch of 48 calls was accepted in one request), and restricts `eth_getLogs` to ranges of 100 blocks. At roughly 26.4 million blocks of history, a full log scan per wallet through that endpoint would take on the order of 264,000 requests, which rules it out for discovery.

Pinning every read to a **specific block number** makes results reproducible: anyone can repeat the same `eth_call` at the same block and get the same answer.

## Token approval events and state

The ERC-20 `Approval(owner, spender, value)` event is emitted when an allowance is set. Because `owner` and `spender` are indexed, logs can be filtered by owner. Events are a history, not a state: an allowance can be reduced by `transferFrom` without a new `Approval` event in some implementations, so the event value may no longer be current. Ovia Protect therefore uses events, from whichever source, only to find candidate pairs, and the `allowance()` result as the truth.

## Indexing considerations

Full discovery requires an index of `Approval` events by owner across all token contracts. The options are:

| Option | Pros | Cons | Fit with constraints |
|---|---|---|---|
| Run an own indexer | Full control, complete coverage | Needs archive data, storage and hosting | Conflicts with zero cost and no database |
| Free public indexer or explorer API | No infrastructure | Coverage, rate limits and terms vary | Possible, must be validated per source |
| Paid indexer | Reliable, complete | Ongoing cost, API keys | Conflicts with zero cost |
| Known-pairs probing | Fully on-chain | Only finds approvals to listed spenders and tokens | Fits, but incomplete by design |

For the beta, discovery uses a public RPC gateway that accepts full-history `eth_getLogs` queries for `Approval` events, with a second public endpoint as fallback. Its coverage still has to be measured against an independent source and published.

## Data normalisation

Each verified result is proposed to be normalised into a single record:

```json
{
  "chainId": 1,
  "block": 26435990,
  "owner": "0x…",
  "token": { "address": "0x…", "symbol": "USDC", "decimals": 6 },
  "spender": { "address": "0x…", "label": null },
  "allowanceRaw": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
  "unlimited": true,
  "source": "rpc:eth_call"
}
```

This is an illustrative schema, not a published interface. Key decisions are to keep raw values as strings (allowances exceed JavaScript’s safe integer range), to keep token metadata separate from the verified allowance (metadata is not part of the security claim), and to record the block and source with every result.

## Frontend and backend responsibilities

<figure class="diagram">
<svg viewBox="0 0 720 300" role="img" aria-labelledby="arch-t arch-d">
<title id="arch-t">Ovia Protect beta data flow</title>
<desc id="arch-d">The user enters a public address in the browser. Candidate approvals come from a historical Approval event search on a public RPC gateway. Each candidate is verified with eth_call on a public Ethereum RPC at a pinned block. Verified results are normalised and shown with their block number. No scan is stored.</desc>
<defs><marker id="arch-ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L8,4 L0,8z" class="arrowHead"/></marker></defs>
<rect x="10" y="20" width="190" height="80" rx="12" class="boxA"/><text x="26" y="50" class="t">Browser</text><text x="26" y="70" class="s">Public address in,</text><text x="26" y="86" class="s">explained results out</text>
<rect x="265" y="20" width="190" height="80" rx="12" class="boxD"/><text x="281" y="50" class="t">Discovery source</text><text x="281" y="70" class="s">Candidate pairs</text><text x="281" y="86" class="tag">PUBLIC RPC GATEWAY</text>
<rect x="520" y="20" width="190" height="80" rx="12" class="box"/><text x="536" y="50" class="t">Public Ethereum RPC</text><text x="536" y="70" class="s">eth_call allowance()</text><text x="536" y="86" class="s">at a pinned block</text>
<rect x="265" y="180" width="190" height="80" rx="12" class="box"/><text x="281" y="210" class="t">Verify &amp; normalise</text><text x="281" y="230" class="s">Drop zero allowances,</text><text x="281" y="246" class="s">flag unlimited ones</text>
<path d="M202 60 H261" class="ln" marker-end="url(#arch-ah)"/>
<path d="M360 102 V176" class="ln" marker-end="url(#arch-ah)"/>
<path d="M457 205 Q615 205 615 104" class="ln" marker-end="url(#arch-ah)"/>
<path d="M263 240 Q105 240 105 104" class="ln" marker-end="url(#arch-ah)"/>
<text x="470" y="150" class="s">verify each pair</text><text x="40" y="160" class="s">results + block number</text>
<text x="10" y="290" class="s">In the beta, all of this runs in the browser. Nothing is stored.</text>
</svg>
<figcaption>{{status:beta}} Architecture of the public beta.</figcaption>
</figure>

Two placements were considered:

- **Browser-only.** The page calls public endpoints directly. This needs no server and keeps addresses off Ovia Labs infrastructure, but it exposes users’ IP addresses to third-party endpoints, depends on CORS support, and shares rate limits per user.
- **Thin stateless proxy.** A small serverless function forwards requests. This allows caching of token metadata, consistent rate limiting and hiding of third-party details, at the cost of routing addresses through Ovia Labs infrastructure (without storing them).

The beta is browser-only. The privacy notice in the app names the RPC providers that receive requests.

## Security boundaries

- **No secrets in the client.** If an optional key is ever used, it stays server-side.
- **No signing capability.** The product never constructs or requests transactions or signatures in the beta.
- **Untrusted inputs.** Token names and symbols come from contracts and can be crafted to mislead (for example, a symbol imitating a well-known token). They are displayed as data, escaped, and never used as proof of identity.
- **Third-party data is advisory.** Only verified on-chain values support the security claim; labels and metadata are marked as such.

## Reliability and scalability trade-offs

- **Free endpoints have no service-level agreement.** The product must degrade gracefully and say when a check could not be completed.
- **Batching** reduces round trips; PRD-010 confirmed batch support on the tested endpoint.
- **Caching** is limited to non-personal data, such as token metadata, so that no scan history is created.
- **Coverage over speed.** A slower result with clear coverage information is preferred over a fast result that hides gaps.

## Architectural decisions

| Decision | Options considered | Beta |
|---|---|---|
| Discovery source | Free indexer, explorer API, known-pairs probing, public RPC log search | {{status:beta}} Public RPC gateway with fallback |
| Execution placement | Browser-only, stateless proxy | {{status:beta}} Browser-only |
| Permit2 sub-allowances | Include, defer | Deferred |
| Spender and token labels | Curated list, third-party labels, none | {{status:beta}} Curated lists in the app |
