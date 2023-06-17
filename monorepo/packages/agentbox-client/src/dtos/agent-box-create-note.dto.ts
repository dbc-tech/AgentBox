import { Type } from 'class-transformer'
import { AgentBoxAttachedListing } from './agent-box-attached-listing.dto'
import { AgentBoxBaseResponse } from './agent-box-base-response.dto'

export class CreateNote {
  isPublic?: boolean
  description?: string
  category?: string
  subCategory?: string
  headline?: string
  date?: string

  @Type(() => AgentBoxAttachedListing)
  attachedListings?: Array<AgentBoxAttachedListing>
}

export class AgentBoxCreateNote {
  @Type(() => CreateNote)
  note: CreateNote
}

export class CreateNoteResponse extends AgentBoxBaseResponse {}

export class AgentBoxCreateNoteResponse {
  @Type(() => CreateNoteResponse)
  response: CreateNoteResponse
}
