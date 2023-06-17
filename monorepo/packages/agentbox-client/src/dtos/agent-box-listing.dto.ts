import { Expose, Type } from 'class-transformer'
import { AgentBoxContact } from './agent-box-contact.dto'
import { AgentBoxLinks } from './agent-box-links.dto'
import { AgentBoxProperty } from './agent-box-property.dto'
import { AgentBoxStaffMember } from './agent-box-staff-member.dto'

export class AgentBoxListingRelatedStaffMember {
  webDisplay?: boolean
  displayOrder?: string
  role?: string

  @Type(() => AgentBoxStaffMember)
  staffMember?: AgentBoxStaffMember
}

export class AgentBoxThumbnail {
  url?: string
  size?: string
  width?: string
  height?: string
}

export class AgentBoxListingMainImage {
  id: string
  title?: string
  url?: string

  @Type(() => AgentBoxThumbnail)
  thumbnails?: Array<AgentBoxThumbnail>

  order?: string

  @Type(() => Date)
  lastModified?: Date
}

export class AgentBoxListingDocument {
  id: string
  url?: string
  title?: string
  customTitle?: string
  type?: string
  private?: boolean
  urlExpiry?: string
  webDisplay?: boolean
  order?: string
}

export class AgentBoxInternalInformation {
  accessDetails?: string
  keyNo?: string
  quotePrice?: string
}

export class AgentBoxPermissions {
  canEdit?: boolean
  canDelete?: boolean
  canView?: boolean
}

export class AgentBoxListingOutgoing {
  value?: string
  period?: string
}

export class AgentBoxListingOutgoings {
  @Type(() => AgentBoxListingOutgoing)
  landTax?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  councilRates?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  waterRates?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  strataAdmin?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  strataSinking?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  strataTotal?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  otherOutgoings?: AgentBoxListingOutgoing

  @Type(() => AgentBoxListingOutgoing)
  totalOutgoings?: AgentBoxListingOutgoing
}

export class AgentBoxListing {
  id: string
  officeId?: string
  officeName?: string
  type?: string
  status?: string
  marketingStatus?: string
  hiddenListing?: boolean
  offMarketListing?: boolean
  method?: string
  webLink?: string

  @Expose()
  @Type(() => Date)
  listedDate?: Date

  @Type(() => Date)
  expiryDate?: Date

  @Type(() => Date)
  auctionDate?: Date

  timezone?: string
  auctionVenue?: string

  @Type(() => Date)
  eoiClosingDate?: Date

  @Type(() => Date)
  onMarketDate?: Date

  @Type(() => Date)
  expectedOnMarketDate?: Date

  displayPrice?: string

  @Type(() => Date)
  soldDate?: Date

  @Type(() => Date)
  inspectionDates?: Array<Date>

  @Type(() => AgentBoxProperty)
  property?: AgentBoxProperty

  mainHeadline?: string
  mainDescription?: string

  @Type(() => AgentBoxListingMainImage)
  mainImage?: AgentBoxListingMainImage

  @Type(() => AgentBoxListingDocument)
  documents?: Array<AgentBoxListingDocument>

  @Type(() => AgentBoxListingRelatedStaffMember)
  relatedStaffMembers?: Array<AgentBoxListingRelatedStaffMember>

  @Type(() => Date)
  firstCreated?: Date

  @Type(() => Date)
  lastModified?: Date

  @Type(() => AgentBoxLinks)
  links?: AgentBoxLinks

  // TODO: make sure the type is correct
  @Type(() => AgentBoxContact)
  relatedContacts?: Array<AgentBoxContact>

  @Type(() => AgentBoxInternalInformation)
  internalInformation?: AgentBoxInternalInformation

  @Type(() => AgentBoxPermissions)
  permissions?: AgentBoxPermissions

  inspectionType?: string

  // TODO: figure our what's inside and make a dto
  externalAgents?: Array<any>

  @Type(() => AgentBoxListingOutgoings)
  outgoings?: AgentBoxListingOutgoings
}
