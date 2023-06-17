import { Type } from 'class-transformer'
import { AgentBoxBaseArrayResponse } from './agent-box-base-response.dto'
import { AgentBoxInspection } from './agent-box-inspection.dto'

export class GetInspectionsResponse extends AgentBoxBaseArrayResponse {
  @Type(() => AgentBoxInspection)
  inspections?: Array<AgentBoxInspection>
}

export class AgentBoxGetInspections {
  @Type(() => GetInspectionsResponse)
  response?: GetInspectionsResponse
}
