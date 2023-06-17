import { Type } from 'class-transformer'
import { AgentBoxBaseArrayResponse } from './agent-box-base-response.dto'
import { AgentBoxStaffMember } from './agent-box-staff-member.dto'

export class GetStaffsResponse extends AgentBoxBaseArrayResponse {
  @Type(() => AgentBoxStaffMember)
  staffMembers?: Array<AgentBoxStaffMember>
}

export class AgentBoxGetStaffs {
  @Type(() => GetStaffsResponse)
  response?: GetStaffsResponse
}
