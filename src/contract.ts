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

export function handleActionPerformed(event: ActionPerformed): void {}

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

export function handleBountyIssued(event: BountyIssued): void {
  let id = event.transaction.from.toHex()
  let bounty = Bounty.load(id)
  if (bounty == null) {
    bounty = new Bounty(id)
  }
  bounty.creator = event.params._creator
  bounty.data = event.params._data
  bounty.deadline = event.params._deadline
  bounty.token = event.params._token
  bounty.tokenVersion = event.params._tokenVersion
  bounty.save()
}

export function handleBountyIssuersUpdated(event: BountyIssuersUpdated): void {}

export function handleContributionAdded(event: ContributionAdded): void {}

export function handleContributionRefunded(event: ContributionRefunded): void {}

export function handleContributionsRefunded(
  event: ContributionsRefunded
): void {}

export function handleFulfillmentAccepted(event: FulfillmentAccepted): void {}

export function handleFulfillmentUpdated(event: FulfillmentUpdated): void {}
