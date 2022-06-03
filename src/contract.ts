import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  ActionPerformed,
  BountyApproversUpdated,
  BountyChanged,
  BountyDataChanged,
  BountyDeadlineChanged,
  BountyDrained,
  BountyFulfilled,
  BountyIssued,
  BountyIssuersUpdated,
  ContributionAdded,
  ContributionRefunded,
  ContributionsRefunded,
  FulfillmentAccepted,
  FulfillmentUpdated
} from "../generated/Contract/Contract"
import { Bounty } from "../generated/schema"

export function handleActionPerformed(event: ActionPerformed): void {
  let id = event.transaction.from.toHex()
  let bounty = Bounty.load(id)
  if (bounty == null) {
    bounty = new Bounty(id)
  }

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type

  // Entity fields can be set based on event parameters
  bounty.bountyId = event.params._bountyId
  bounty.fulfiller = event.params._fulfiller
  bounty.data = event.params._data

  // Entities can be written to the store with `.save()`
  bounty.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.bounties(...)
  // - contract.callStarted(...)
  // - contract.getBounty(...)
  // - contract.issueBounty(...)
  // - contract.metaTxRelayer(...)
  // - contract.numBounties(...)
  // - contract.owner(...)
  // - contract.tokenBalances(...)
}

export function handleBountyApproversUpdated(
  event: BountyApproversUpdated
): void {}

export function handleBountyChanged(event: BountyChanged): void {}

export function handleBountyDataChanged(event: BountyDataChanged): void {}

export function handleBountyDeadlineChanged(
  event: BountyDeadlineChanged
): void {}

export function handleBountyDrained(event: BountyDrained): void {}

export function handleBountyFulfilled(event: BountyFulfilled): void {}

export function handleBountyIssued(event: BountyIssued): void {}

export function handleBountyIssuersUpdated(event: BountyIssuersUpdated): void {}

export function handleContributionAdded(event: ContributionAdded): void {}

export function handleContributionRefunded(event: ContributionRefunded): void {}

export function handleContributionsRefunded(
  event: ContributionsRefunded
): void {}

export function handleFulfillmentAccepted(event: FulfillmentAccepted): void {}

export function handleFulfillmentUpdated(event: FulfillmentUpdated): void {}
