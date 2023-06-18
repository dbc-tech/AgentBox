# nest-agentbox

`nest-agentbox` provides Nest integration module for AgentBox client.

## Get started

In your Nest application update `package.json` and add the `nest-agentbox` package:

```json
{
  "dependencies": {
    "@dbc-tech/nest-agentbox": "^1.0.0"
}
```

## Register the module

You'll need to specify base url, client id & API key. The easiest way is to provide it directly during regisration in your `app.module`:

```typescript
@Module({
  imports: [
    AgentBoxModule.register({
      baseUrl: 'https://api.agentboxcrm.com.au',
      clientId: '<your client id>',
      apiKey: '<your api key>',
    })]
})
```

However, it's more likely the base url is provided via `.env` file:

```
AGENTBOX_BASE_URL: https://api.offertoown.com.au/
AGENTBOX_CLIENT_ID: <your client id>
AGENTBOX_API_KEY: <your api key>
```

In which case this can be passed via `ConfigService` using module's `registerAsync` method:

```typescript
@Module({
  imports: [
    AgentBoxModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseUrl: configService.get('AGENTBOX_BASE_URL'),
        clientId: configService.get('AGENTBOX_CLIENT_ID'),
        apiKey: configService.get('AGENTBOX_API_KEY'),
      }),
      inject: [ConfigService],
    })]
})
```

You may wish to register the module globally:

```typescript
@Module({
  imports: [
    AgentBoxModule.register({
      global: true
    })]
})
```

## Using AgentBoxClient service

Once the `AgentBoxModule` is registered, the `AgentBoxClient` service should be available to inject into your services:

```typescript
export default class MyService {
  constructor(private readonly api: AgentBoxClient) {}

  async getAllStaff() {
    return await this.api.getStaffs(..);
  }
}
```

## AgentBox Factory module

An additional factory module `AgentBoxFactoryModule` is available for use in multi-tenancy applications. The factory module registers a factory service `AgentBoxFactory` which is used to create new `AgentBoxClient` instances by supplying the client id & api key.

## Register the module

You'll need to specify base url. The easiest way is to provide it directly during regisration in your `app.module`:

```typescript
@Module({
  imports: [
    AgentBoxFactoryModule.register({
      baseUrl: 'https://api.agentboxcrm.com.au',
    })]
})
```

However, it's more likely the base url is provided via `.env` file:

```
AGENTBOX_BASE_URL: https://api.offertoown.com.au/
```

In which case this can be passed via `ConfigService` using module's `registerAsync` method:

```typescript
@Module({
  imports: [
    AgentBoxFactoryModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseUrl: configService.get('AGENTBOX_BASE_URL'),
      }),
      inject: [ConfigService],
    })]
})
```

You may wish to register the module globally:

```typescript
@Module({
  imports: [
    AgentBoxFactoryModule.register({
      global: true
    })]
})
```

## Using AgentBoxFactory service

Once the `AgentBoxFactoryModule` is registered, the `AgentBoxFactory` service should be available to inject into your services:

```typescript
export default class MyService {
  constructor(private readonly factory: AgentBoxFactory) {}

  async getAllStaff() {
    const api = factory.create('<my client id>', '<my api key')
    return await this.api.getStaffs(..);
  }
}
```
