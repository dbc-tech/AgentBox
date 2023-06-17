# nest-agentbox

`nest-agentbox` is a node package used to provide client connectivity to AgentBox CRM for Nest Js applications.

To use, resolve the `AgentBoxService` provider which registered through `AgentBoxModule` Nest module.

## Get started

In your Nest application update `package.json` and add the `nest-agentbox` package:

```json
{
  "dependencies": {
    "@dbc-tech/nest-agentbox": "*"
}
```

## Register the module

You'll need to specify AgentBox base url. The easiest way is to provide it directly during regisration in your `app.module`:

```typescript
@Module({
  imports: [
    AgentBoxModule.register({
      baseUrl: 'https://api.agentboxcrm.com.au/',
    })]
})
```

However, it's more likely the base url is provided via `.env` file:

```
AGENTBOX_BASE_URL=https://api.agentboxcrm.com.au/
```

In which case this can be passed via `ConfigService` using module's `registerAsync` method:

```typescript
@Module({
  imports: [
    AgentBoxModule.registerAsync({
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
    AgentBoxModule.register({
      global: true
    })]
})
```

## Using AgentBoxService provider

Once the `AgentBoxModule` is registered, the `AgentBoxService` provider should be available to inject into your services:

```typescript
export default class MyService {
  constructor(private readonly api: AgentBoxService) {}

  async getAllStaff() {
    return await this.api.getStaffs("apiKey", "clientId");
  }
}
```