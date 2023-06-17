import { Type } from 'class-transformer'
import { AgentBoxBaseArrayResponse } from './agent-box-base-response.dto'
import { AgentBoxNote } from './agent-box-note.dto'

export class GetNotesResponse extends AgentBoxBaseArrayResponse {
  @Type(() => AgentBoxNote)
  notes?: Array<AgentBoxNote>
}

export class AgentBoxGetNotes {
  @Type(() => GetNotesResponse)
  response?: GetNotesResponse
}
