import { DefaultLoggerOptions } from '@dbc-tech/http-kit'
import { Logger } from 'winston'

export interface AgentBoxConfig {
  baseUrl: string
  clientId: string
  apiKey: string
  logger?: Logger
  defaultLoggerOptions?: DefaultLoggerOptions
}
