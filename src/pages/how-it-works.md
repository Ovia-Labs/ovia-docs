# How It Works

Ovia Protocol is a trust layer for digital transactions.

The protocol allows two parties to define an agreement, lock funds inside a smart contract, and settle the transaction according to predefined conditions.

Instead of relying on a centralized intermediary, Ovia Protocol coordinates settlement through transparent on-chain infrastructure.

This page explains both the user experience and the protocol architecture behind the scenes.

---

## High-Level Overview

Every Ovia transaction follows the same lifecycle:


The objective is simple:

Reduce counterparty risk while maintaining transparency for both sides of a transaction.

---

{{diagram:escrow-flow}}

## User Flow

## Step 1 — Create An Agreement

The process begins when two parties agree on the terms of a transaction.

An agreement may include:

* Transaction amount
* Asset type
* Deadline
* Description
* Release conditions
* Refund conditions

Examples include:

* Freelance work
* Digital products
* OTC trades
* Business agreements
* Milestone payments

At this stage, no funds have moved.

The purpose is to define the rules before value changes hands.

---

## Step 2 — Create Escrow

Once the agreement is finalized, Ovia Protocol creates a dedicated escrow contract.

This escrow becomes the neutral settlement environment for that transaction.

Neither party controls the escrow.

The escrow only follows the predefined rules established during creation.

---

## Step 3 — Deposit Funds

The payer deposits funds into the escrow contract.

The protocol verifies:

* Correct asset
* Correct amount
* Valid agreement
* Valid transaction state

Once deposited, the funds become locked.

The recipient can verify on-chain that payment is secured before performing any work.

---

## Step 4 — Complete The Agreement

The required action takes place outside the protocol.

Examples include:

* Delivering a service
* Completing freelance work
* Providing a digital product
* Reaching a milestone
* Transferring an agreed asset

During this phase, the escrow contract continues to securely hold the funds.

---

## Step 5 — Settlement

After completion, the agreement reaches settlement.

The escrow will execute one of two outcomes:

### Release

Funds are released to the recipient.

### Refund

Funds are returned to the original payer.

The exact outcome depends on the predefined agreement logic.

Once settlement occurs, the escrow lifecycle is complete.

---

## Behind The Scenes

While the user experiences a simple workflow, several protocol components operate behind the scenes.

The architecture is intentionally designed to remain modular, transparent, and easy to audit.

---

## Protocol Architecture

At a high level, Ovia Protocol consists of two primary layers:

```text
Escrow Factory
        │
        ▼
Individual Escrow Contracts
```

The Factory acts as the deployment layer.

Escrow contracts handle transaction execution.

Each agreement receives its own isolated escrow contract.

This approach improves security, accounting, transparency, and auditing.

---

## Escrow Factory

The Factory is responsible for creating new escrow agreements.

Conceptually:

```solidity
Escrow escrow = new Escrow(
    buyer,
    seller,
    token,
    amount,
    deadline
);
```

The Factory records the newly created escrow and emits an event that external applications can monitor.

This creates a standardized deployment process for every transaction.

---

## Escrow Contracts

Each escrow contract stores the data required for a specific agreement.

Examples include:

```text
Buyer
Seller
Asset
Amount
Deadline
Status
Metadata
```

The escrow contract becomes responsible for managing the complete transaction lifecycle.

---

## State Management

Every escrow follows a finite state machine.

```text
Created
    ↓
Funded
    ↓
Active
    ↓
Released
```

or

```text
Created
    ↓
Funded
    ↓
Active
    ↓
Refunded
```

The protocol only allows valid transitions between states.

For example:

```solidity
require(
    status == Status.Active,
    "Invalid state"
);
```

This prevents unexpected settlement behavior.

---

## Funding Logic

Before funds are accepted, the escrow validates the transaction.

Examples include:

```solidity
require(
    msg.value == amount
);
```

or

```solidity
IERC20(token).transferFrom(
    sender,
    address(this),
    amount
);
```

Only after successful validation do assets become locked inside the escrow.

---

## Settlement Logic

Settlement is executed through predefined rules.

When a release occurs:

```solidity
function release() external {

    require(
        status == Status.Active
    );

    status = Status.Released;

    token.transfer(
        recipient,
        amount
    );
}
```

When a refund occurs:

```solidity
function refund() external {

    require(
        block.timestamp > deadline
    );

    status = Status.Refunded;

    token.transfer(
        buyer,
        amount
    );
}
```

These examples are simplified but demonstrate the principle behind protocol settlement.

---

## Event Infrastructure

Every major protocol action emits an event.

Examples include:

```solidity
event EscrowCreated(
    address escrow
);

event FundsDeposited(
    uint256 amount
);

event FundsReleased(
    uint256 amount
);

event FundsRefunded(
    uint256 amount
);
```

Applications built on top of Ovia can listen for these events to update interfaces in real time.

---

## Why Separate Escrows?

Ovia Protocol intentionally creates a dedicated escrow for each agreement.

Benefits include:

* Isolated risk
* Independent settlement
* Clear transaction history
* Simpler auditing
* Easier integration

Each transaction becomes its own self-contained settlement environment.

---

## What Happens On-Chain?

The protocol records critical settlement events on-chain.

Examples include:

* Escrow creation
* Deposits
* Releases
* Refunds
* Expirations

This creates a transparent and verifiable record of transaction activity.

---

## What Happens Off-Chain?

Not every part of an agreement needs to exist on-chain.

Examples include:

* Messages
* Files
* Deliverables
* Project communication
* Business discussions

Ovia Protocol focuses on the settlement layer.

Applications built on top of the protocol can decide how additional information is handled.

---

## Design Philosophy

Ovia Protocol is built around a simple principle:

> Agreements should be understandable by humans and enforceable by software.

The protocol is intentionally designed around predictable state transitions, transparent settlement logic, and independently verifiable outcomes.

This allows applications, businesses, and communities to coordinate value exchange with fewer intermediaries and greater confidence.

---

## Summary

Ovia Protocol transforms transactions into structured agreements.

The process is straightforward:

1. Define the agreement
2. Create escrow
3. Lock funds
4. Complete the obligation
5. Settle the transaction

For users, this creates a safer transaction experience.

For developers, it provides a reusable settlement layer.

For the broader ecosystem, it represents another step toward trust-minimized digital coordination.
