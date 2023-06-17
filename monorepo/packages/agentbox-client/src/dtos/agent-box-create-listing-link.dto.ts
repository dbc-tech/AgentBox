import { Type } from 'class-transformer'
import { AgentBoxAttachedListing } from './agent-box-attached-listing.dto'
import { AgentBoxBaseResponse } from './agent-box-base-response.dto'
import { AgentBoxLinks } from './agent-box-links.dto'

export class CreateListingLink {
  type: string
  title: string
  url: string
  order?: number

  @Type(() => AgentBoxAttachedListing)
  attachedListing: AgentBoxAttachedListing
}

export class AgentBoxCreateListingLink {
  @Type(() => CreateListingLink)
  listingLink: CreateListingLink
}

export class ListingLinkInResponse {
  id: string

  @Type(() => AgentBoxLinks)
  links?: AgentBoxLinks
}

export class CreateListingLinkResponse extends AgentBoxBaseResponse {
  @Type(() => ListingLinkInResponse)
  listingLink?: ListingLinkInResponse
}

export class AgentBoxCreateListingLinkResponse {
  @Type(() => CreateListingLinkResponse)
  response: CreateListingLinkResponse
}
