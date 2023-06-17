import { Type } from 'class-transformer'
import { AgentBoxAgentCrmStatusType } from '../types/agentbox-crm-status.type'
import { AgentBoxLinks } from './agent-box-links.dto'

export class AgentBoxStaffMember {
  id: string
  status?: AgentBoxAgentCrmStatusType
  officeId?: string
  officeName?: string
  externalMemberId?: string
  firstName?: string
  lastName?: string
  role?: string
  jobTitle?: string
  email?: string
  mobile?: string
  phone?: string
  hideMobileOnWeb?: boolean

  // it comes in as an empty array calling '/staff' ?!
  webDisplay?: Array<any>

  @Type(() => Date)
  firstCreated?: Date

  @Type(() => Date)
  lastModified?: Date

  links?: AgentBoxLinks
}
