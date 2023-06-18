import { AgentBoxClient } from '@dbc-tech/agentbox-client'
import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common'
import { AgentBoxConfig } from './agent-box.config'

export interface AgentBoxModuleFactory {
  create(): Promise<AgentBoxClient> | AgentBoxClient
}

export interface AgentBoxModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  useExisting?: Type<AgentBoxModuleFactory>
  useClass?: Type<AgentBoxModuleFactory>
  useFactory?: (...args: any[]) => Promise<AgentBoxClient> | AgentBoxClient
  inject?: any[]
}

@Module({
  exports: [AgentBoxClient],
})
export class AgentBoxModule {
  static register(options: AgentBoxConfig): DynamicModule {
    return {
      module: AgentBoxModule,
      global: options.global,
      providers: [
        {
          provide: AgentBoxClient,
          useValue: new AgentBoxClient(options),
        },
      ],
    }
  }

  static registerAsync(options: AgentBoxModuleAsyncOptions): DynamicModule {
    return {
      module: AgentBoxModule,
      global: options.global,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    }
  }

  private static createAsyncProviders(
    options: AgentBoxModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncProvider(options)]
    }
    return [
      this.createAsyncProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
  }

  private static createAsyncProvider(
    options: AgentBoxModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AgentBoxClient,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    return {
      provide: AgentBoxClient,
      useFactory: async (optionsFactory: AgentBoxModuleFactory) =>
        await optionsFactory.create(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
