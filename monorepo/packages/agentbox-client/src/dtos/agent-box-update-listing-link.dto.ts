import { Type } from 'class-transformer'
import { AgentBoxBaseResponse } from './agent-box-base-response.dto'
import { ListingLinkInResponse } from './agent-box-create-listing-link.dto'

export class UpdateListingLink {
  type?: string
  title?: string
  url?: string
}

export class AgentBoxUpdateListingLink {
  @Type(() => UpdateListingLink)
  listingLink: UpdateListingLink
}

export class UpdateListingLinkResponse extends AgentBoxBaseResponse {
  @Type(() => ListingLinkInResponse)
  listingLink?: ListingLinkInResponse
}

export class AgentBoxUpdateListingLinkResponse {
  @Type(() => UpdateListingLinkResponse)
  response: UpdateListingLinkResponse
}
