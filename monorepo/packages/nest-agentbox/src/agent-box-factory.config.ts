import { Logger } from 'winston'

export interface AgentBoxFactoryConfig {
  global?: boolean
  baseUrl: string
  logger?: Logger
}
