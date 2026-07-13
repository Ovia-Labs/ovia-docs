# Architecture

Ovia Protocol is designed as modular escrow infrastructure.

The architecture separates agreement creation from agreement execution. This keeps the protocol easier to understand, easier to audit, and easier to integrate into external applications.

The code snippets on this page are simplified conceptual examples. The deployed contract interface may differ as testing and development continue.

---

{{diagram:architecture}}

## High-Level Architecture


---

## Core Components

## Escrow Factory

The Escrow Factory acts as the deployment layer.

It creates new escrow contracts and keeps a record of agreements created through the protocol.

Conceptually:

```solidity
function createEscrow(
    address buyer,
    address seller,
    address token,
    uint256 amount,
    uint256 deadline,
    string memory metadata
) external returns (address escrow) {
    escrow = address(
        new OviaEscrow(
            buyer,
            seller,
            token,
            amount,
            deadline,
            metadata
        )
    );

    escrows.push(escrow);

    emit EscrowCreated(
        escrow,
        buyer,
        seller,
        token,
        amount
    );
}
```

The factory makes it easier for wallets, dashboards, marketplaces, and other applications to create escrow agreements in a consistent way.

---

## Escrow Contract

Each escrow contract represents one individual agreement.

It stores the agreement data, holds the funds, and executes the release or refund logic.

```solidity
contract OviaEscrow {
    address public buyer;
    address public seller;
    address public token;

    uint256 public amount;
    uint256 public deadline;

    Status public status;
}
```

This design keeps every transaction isolated from other agreements.

If one escrow reaches settlement, it does not affect any other escrow.

---

## Agreement Data

Each escrow may store:

```text
Buyer
Seller
Token
Amount
Deadline
Metadata
Status
```

Metadata can be used by applications to reference external information, such as:

* Order ID
* Project ID
* Milestone ID
* Off-chain description
* IPFS hash
* Application-specific data

Ovia Protocol focuses on settlement infrastructure, while applications decide how much additional information they want to display or store.

---

## State Machine

Every escrow follows a controlled lifecycle.

```text
Created
   ↓
Funded
   ↓
Active
   ↓
Released
```

or:

```text
Created
   ↓
Funded
   ↓
Active
   ↓
Refunded
```

The protocol only allows valid state transitions.

For example, funds cannot be released if the escrow has not been funded.

```solidity
require(
    status == Status.Active,
    "Escrow is not active"
);
```

This makes the agreement lifecycle predictable and easier to audit.

---

## Funding Flow

When funds are deposited, the escrow verifies the transaction before accepting assets.

For native ETH-style deposits:

```solidity
require(
    msg.value == amount,
    "Incorrect amount"
);
```

For ERC20-style deposits:

```solidity
IERC20(token).transferFrom(
    msg.sender,
    address(this),
    amount
);
```

After the deposit is complete, the escrow status updates.

```solidity
status = Status.Active;

emit FundsDeposited(
    address(this),
    msg.sender,
    amount
);
```

---

## Settlement Flow

Settlement happens through either release or refund logic.

## Release

Release transfers funds to the seller or recipient.

```solidity
function release() external {
    require(
        status == Status.Active,
        "Escrow is not active"
    );

    status = Status.Released;

    IERC20(token).transfer(
        seller,
        amount
    );

    emit FundsReleased(
        address(this),
        seller,
        amount
    );
}
```

## Refund

Refund returns funds to the buyer or payer.

```solidity
function refund() external {
    require(
        status == Status.Active,
        "Escrow is not active"
    );

    require(
        block.timestamp > deadline,
        "Deadline has not passed"
    );

    status = Status.Refunded;

    IERC20(token).transfer(
        buyer,
        amount
    );

    emit FundsRefunded(
        address(this),
        buyer,
        amount
    );
}
```

The exact authorization model may evolve as the protocol develops, but the core settlement principle remains the same:

Funds move only when predefined conditions allow it.

---

## Event Layer

Events make protocol activity visible to external applications.

```solidity
event EscrowCreated(
    address indexed escrow,
    address indexed buyer,
    address indexed seller,
    address token,
    uint256 amount
);

event FundsDeposited(
    address indexed escrow,
    address indexed payer,
    uint256 amount
);

event FundsReleased(
    address indexed escrow,
    address indexed recipient,
    uint256 amount
);

event FundsRefunded(
    address indexed escrow,
    address indexed buyer,
    uint256 amount
);
```

Applications can listen to these events to update dashboards, user interfaces, analytics, or notifications.

---

## Why This Architecture?

Ovia Protocol separates responsibilities clearly.

```text
Factory
→ Creates agreements

Escrow Contract
→ Holds funds and settles transactions

Events
→ Make activity observable

Applications
→ Provide user experience
```

This separation creates several benefits:

* Easier integration
* Clearer auditing
* Isolated transaction risk
* Transparent settlement history
* Flexible application design

---

## Integration Model

External applications do not need to rebuild escrow logic from scratch.

They can integrate Ovia Protocol as a settlement layer.

```text
Application UI
    ↓
Ovia Factory
    ↓
Escrow Contract
    ↓
On-chain Events
    ↓
Application Updates
```

This means Ovia can support multiple frontends, marketplaces, dashboards, and community tools while keeping the underlying escrow logic consistent.

---

## Design Principle

Ovia Protocol is built around one core idea:

> Agreements should be understandable by humans and enforceable by software.

The architecture is intentionally simple.

Each agreement has clear participants, clear funds, clear rules, and a clear lifecycle.

That simplicity is what makes the protocol easier to trust, audit, and build on.
