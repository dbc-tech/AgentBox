import { AgentBoxAgentCrmStatus } from '../constants'
import { ObjectToUnion } from '../utils'

export type AgentBoxAgentCrmStatusType = ObjectToUnion<
  typeof AgentBoxAgentCrmStatus
>
