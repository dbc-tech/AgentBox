import { Type } from 'class-transformer'
import { AgentBoxLinks } from './agent-box-links.dto'

export class AgentBoxContact {
  id: string
  type?: string
  status?: string
  title?: string
  firstName?: string
  lastName?: string
  salutation?: string
  companyName?: string
  email?: string
  mobile?: string
  homePhone?: string
  workPhone?: string
  @Type(() => Date)
  firstCreated?: Date

  @Type(() => Date)
  lastModified?: Date

  @Type(() => AgentBoxLinks)
  links?: AgentBoxLinks
}
