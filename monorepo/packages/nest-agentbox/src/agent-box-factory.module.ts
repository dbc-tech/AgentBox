// Concepts borrowed from https://github.com/nestjs/jwt/blob/master/lib/jwt.module.ts
import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common'
import { AgentBoxFactory } from './agent-box-factory'
import { AgentBoxFactoryConfig } from './agent-box-factory.config'
import { AGENTBOX_FACTORY_CONFIG } from './constants'

export function createOptionsProvider(options: AgentBoxFactoryConfig): any[] {
  return [{ provide: AGENTBOX_FACTORY_CONFIG, useValue: options || {} }]
}

export interface AgentBoxFactoryOptionsFactory {
  create(): Promise<AgentBoxFactoryConfig> | AgentBoxFactoryConfig
}

export interface AgentBoxFactoryModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  useExisting?: Type<AgentBoxFactoryOptionsFactory>
  useClass?: Type<AgentBoxFactoryOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<AgentBoxFactoryConfig> | AgentBoxFactoryConfig
  inject?: any[]
}

@Module({
  providers: [AgentBoxFactory],
  exports: [AgentBoxFactory],
})
export class AgentBoxFactoryModule {
  static register(options: AgentBoxFactoryConfig): DynamicModule {
    return {
      module: AgentBoxFactoryModule,
      global: options.global,
      providers: createOptionsProvider(options),
    }
  }

  static registerAsync(
    options: AgentBoxFactoryModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: AgentBoxFactoryModule,
      global: options.global,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    }
  }

  private static createAsyncProviders(
    options: AgentBoxFactoryModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
  }

  private static createAsyncOptionsProvider(
    options: AgentBoxFactoryModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AGENTBOX_FACTORY_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    return {
      provide: AGENTBOX_FACTORY_CONFIG,
      useFactory: async (optionsFactory: AgentBoxFactoryOptionsFactory) =>
        await optionsFactory.create(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
