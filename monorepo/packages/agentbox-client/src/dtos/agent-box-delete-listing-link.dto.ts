import { Type } from 'class-transformer'
import { AgentBoxBaseResponse } from './agent-box-base-response.dto'

export class DeleteListingLinkResponse extends AgentBoxBaseResponse {
  id?: string
}

export class AgentBoxDeleteListingLinkResponse {
  @Type(() => DeleteListingLinkResponse)
  response: DeleteListingLinkResponse
}
