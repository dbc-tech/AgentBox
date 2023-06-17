import { Type } from 'class-transformer'
import { AgentBoxBaseArrayResponse } from './agent-box-base-response.dto'
import { AgentBoxListingLink } from './agent-box-listing-link.dto'

export class GetListingLinksResponse extends AgentBoxBaseArrayResponse {
  @Type(() => AgentBoxListingLink)
  listingLinks?: Array<AgentBoxListingLink>
}

export class AgentBoxGetListingLinks {
  @Type(() => GetListingLinksResponse)
  response?: GetListingLinksResponse
}
