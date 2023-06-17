import { Type } from 'class-transformer'
import { AgentBoxBaseArrayResponse } from './agent-box-base-response.dto'
import { AgentBoxListing } from './agent-box-listing.dto'

export class GetListingsResponse extends AgentBoxBaseArrayResponse {
  @Type(() => AgentBoxListing)
  listings?: Array<AgentBoxListing>
}

export class AgentBoxGetListings {
  @Type(() => GetListingsResponse)
  response?: GetListingsResponse
}
