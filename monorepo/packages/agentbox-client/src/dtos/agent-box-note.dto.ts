import { Type } from 'class-transformer'
import { AgentBoxAttachedListing } from './agent-box-attached-listing.dto'
import { AgentBoxLinks } from './agent-box-links.dto'

export class AgentBoxNote {
  id: string
  isPublic?: boolean
  description?: string
  category?: string
  subCategory?: string
  headline?: string
  date?: string
  firstCreated?: string
  lastModified?: string

  @Type(() => AgentBoxLinks)
  links?: AgentBoxLinks

  @Type(() => AgentBoxAttachedListing)
  attachedListings: Array<AgentBoxAttachedListing>
}
