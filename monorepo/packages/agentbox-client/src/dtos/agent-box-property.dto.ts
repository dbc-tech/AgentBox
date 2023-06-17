import { Type } from 'class-transformer'
import { AgentBoxAddress } from './agent-box-address.dto'
import { AgentBoxLandArea } from './agent-box-land-area.dto'
import { AgentBoxLocation } from './agent-box-location.dto'

export class AgentBoxProperty {
  id: string
  type?: string
  category?: string
  name?: string
  newConstruction?: string

  @Type(() => AgentBoxAddress)
  address?: AgentBoxAddress

  @Type(() => AgentBoxLocation)
  location?: AgentBoxLocation

  bedrooms?: string
  bathrooms?: string
  totalParking?: string

  @Type(() => AgentBoxLandArea)
  landArea?: AgentBoxLandArea

  @Type(() => AgentBoxLandArea)
  buildingArea?: AgentBoxLandArea

  landSizeText?: string
}
