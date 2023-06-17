import { Type } from 'class-transformer'
import { AgentBoxContact } from './agent-box-contact.dto'
import { AgentBoxLinks } from './agent-box-links.dto'
import { AgentBoxListing } from './agent-box-listing.dto'

export class AgentBoxInspection {
  id: string
  comment?: string
  isAppointment?: boolean

  @Type(() => Date)
  startDate?: Date

  @Type(() => Date)
  endDate?: Date

  @Type(() => AgentBoxContact)
  contact?: AgentBoxContact

  @Type(() => AgentBoxListing)
  listing?: AgentBoxListing

  @Type(() => Date)
  firstCreated?: Date

  @Type(() => Date)
  lastModified?: Date

  @Type(() => AgentBoxLinks)
  links?: AgentBoxLinks
}
