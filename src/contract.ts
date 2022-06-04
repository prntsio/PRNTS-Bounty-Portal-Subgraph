import { BigInt } from "@graphprotocol/graph-ts"
import * as graphTs from "@graphprotocol/graph-ts";
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
import { Bounty, PerformedAction, Fulfillment, Contribution } from "../generated/schema"
import { json } from "@graphprotocol/graph-ts";

export function handleActionPerformed(event: ActionPerformed): void {
  let id = event.transaction.from.toHex()
  let action = PerformedAction.load(id)
  if (action == null) {
    action = new PerformedAction(id)
  }
  action.bountyId = event.params._bountyId
  action.fulfiller = event.params._fulfiller
  action.data = event.params._data
  action.save()
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

export function handleBountyFulfilled(event: BountyFulfilled): void {
  let id = event.transaction.from.toHex()
  let bounty = Bounty.load(id)
  if (bounty == null) {
    bounty = new Bounty(id)
  }
  bounty.sender = event.address
  bounty.bountyId = event.params._bountyId
  bounty.fulfillmentId = event.params._fulfillmentId
  bounty.fulfillers = (event.params._fulfillers.map<string>((v) => v.toString())).toString();
  bounty.finalFulfiller = event.params._fulfillers[event.params._fulfillers.length - 1]
  bounty.save()
}

export function handleBountyIssued(event: BountyIssued): void {
  let id = event.transaction.from.toHex()
  let bounty = Bounty.load(id)
  if (bounty == null) {
    bounty = new Bounty(id)
  }
  bounty.sender = event.address
  bounty.bountyId = event.params._bountyId
  let checkData = json.try_fromString(event.params._data);
  if (checkData.isOk) {
    let data = checkData.value.toObject();
    bounty.title = getString(data.get("title"));
    bounty.type = getString(data.get("type"));
    bounty.nftHash = getString(data.get("nftHash"));
    bounty.contributersType = getString(data.get("contributersType"));
    bounty.spotifyPlays = getString(data.get("spotifyPlays"));
    bounty.instagramFollowers = getString(data.get("instagramFollowers"));
    bounty.email = getString(data.get("email"));
    bounty.description = getString(data.get("description"));
    bounty.estimatedTime = getString(data.get("estimatedTime"));
    bounty.featureBountyType = getString(data.get("featureBountyType"));
    bounty.bountyPrice = getString(data.get("bountyPrice"));
    bounty.paymentDue = getString(data.get("paymentDue"));
  }

  bounty.deadline = event.params._deadline
  bounty.token = event.params._token
  bounty.save()
}

export function handleBountyIssuersUpdated(event: BountyIssuersUpdated): void {}

export function handleContributionAdded(event: ContributionAdded): void {
  let id = event.transaction.from.toHex()
  let contribution = Contribution.load(id)
  if (contribution == null) {
    contribution = new Contribution(id)
  }
  contribution.bountyId = event.params._bountyId
  contribution.contributionId = event.params._contributionId
  contribution.contributor = event.params._contributor
  contribution.amount = event.params._amount
  contribution.save()
}

export function handleContributionRefunded(event: ContributionRefunded): void {}

export function handleContributionsRefunded(
  event: ContributionsRefunded
): void {}

export function handleFulfillmentAccepted(event: FulfillmentAccepted): void {
  let id = event.transaction.from.toHex()
  let fulfillment = Fulfillment.load(id)
  if (fulfillment == null) {
    fulfillment = new Fulfillment(id)
  }
  fulfillment.bountyId = event.params._bountyId
  fulfillment.fulfillmentId = event.params._fulfillmentId
  fulfillment.approver = event.params._approver
  fulfillment.tokenAmounts = ""
  fulfillment.save()
}

export function handleFulfillmentUpdated(event: FulfillmentUpdated): void {}

export function getString(value: graphTs.JSONValue | null): string {
  if (!value) return "";
  if (value.kind == graphTs.JSONValueKind.STRING) return value.toString();
  return value.data.toString();
}
