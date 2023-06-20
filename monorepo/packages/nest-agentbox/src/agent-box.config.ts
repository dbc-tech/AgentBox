import { AgentBoxConfig as ClientConfig } from '@dbc-tech/agentbox-client'

export interface AgentBoxConfig extends ClientConfig {
  global?: boolean
}
