import { Type } from 'class-transformer'

export class AgentBoxError {
  code?: string
  title?: string
  detail?: string
  validVersions?: Array<number>
}

export class AgentBoxBaseArrayResponse {
  items?: string
  current?: string
  last?: string

  @Type(() => AgentBoxError)
  errors?: Array<AgentBoxError>
}

export class AgentBoxBaseResponse {
  status?: string

  @Type(() => AgentBoxError)
  errors?: Array<AgentBoxError>
}
