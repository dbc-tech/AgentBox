import { AgentBoxClient } from '@dbc-tech/agentbox-client'
import { Inject, Injectable } from '@nestjs/common'
import { Logger } from 'winston'
import { AgentBoxFactoryConfig } from './agent-box-factory.config'
import { AGENTBOX_FACTORY_CONFIG } from './constants'

@Injectable()
export class AgentBoxFactory {
  constructor(
    @Inject(AGENTBOX_FACTORY_CONFIG)
    private readonly config: AgentBoxFactoryConfig,
  ) {}

  create(clientId: string, apiKey: string, logger?: Logger) {
    return new AgentBoxClient({
      baseUrl: this.config.baseUrl,
      logger: logger ?? this.config.logger,
      clientId,
      apiKey,
    })
  }
}
