import { Type } from 'class-transformer'
import { AgentBoxBaseResponse } from './agent-box-base-response.dto'

export class DeleteNoteResponse extends AgentBoxBaseResponse {
  id?: string
}

export class AgentBoxDeleteNoteResponse {
  @Type(() => DeleteNoteResponse)
  response: DeleteNoteResponse
}
