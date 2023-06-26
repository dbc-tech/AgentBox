export const AgentBoxPropertyType = {
  Residential: 'Residential',
} as const

export const AgentBoxPropertyCategory = {
  Acreage: 'Acreage',
  Apartment: 'Apartment',
  BlocksOfUnit: 'Blocks of Unit',
  House: 'House',
  Land: 'Land',
  SemiDuplex: 'Semi/Duplex',
  Studio: 'Studio',
  Terrace: 'Terrace',
  Townhouse: 'Townhouse',
  Unit: 'Unit',
  Villa: 'Villa',
} as const

export const AgentBoxSaleMethod = {
  PrivateTreaty: 'Private Treaty',
  ExpressionsOfInterest: 'Expressions of Interest',
  Tender: 'Tender',
  OffersToPurchase: 'Offers to Purchase',
  SaleBySetDate: 'Sale by Set Date',
  SaleByNegotiation: 'Sale by Negotiation',
  Auction: 'Auction',
} as const

export const AgentBoxSaleStatus = {
  Available: 'Available',
  Withdrawn: 'Withdrawn',
  SoldLeasedOtherAgent: 'Sold/Leased - Other Agent',
  Archived: 'Archived',
  Pending: 'Pending',
  Appraisal: 'Appraisal',
  Presentation: 'Presentation',
  Conditional: 'Conditional',
  Unconditional: 'Unconditional',
  Settled: 'Settled',
  Leased: 'Leased',
} as const

export const AgentBoxMarketingStatus = {
  NotListed: 'Not Listed',
  Available: 'Available',
} as const

export const AgentBoxStaffRole = {
  ListingAgent: 'Listing Agent',
  PropertyManager: 'Property Manager',
  AssociateAgent: 'Associate Agent',
  SellingAgent: 'Selling Agent',
  PropertyAssistant: 'Property Assistant',
  ReferralAgent: 'Referral Agent',
  AppraisalAgent: 'Appraisal Agent',
  ManagingAgent: 'Managing Agent',
} as const

export const AgentBoxListingLinkType = {
  GeneralExternalLink: 'General External Link',
  GeneralVideoLink: 'General Video Link',
  PropertyWebLink: 'Property Web Link',
  VirtualTourLink: 'Virtual Tour Link',
  YoutubeVideoLink: 'Youtube Video Link',
} as const

export const AgentBoxAgentCrmStatus = {
  Active: 'Active',
  Archived: 'Archived',
} as const

export const AgentBoxListingType = {
  Sale: 'Sale',
  Lease: 'Lease',
} as const

export const AGENTBOX_MODULE_OPTIONS = 'AGENTBOX_MODULE_OPTIONS'

export const DefaultMaskProperties = [
  'X-Client-ID',
  'X-API-Key',
  'email',
  'mobile',
  'homePhone',
  'workPhone',
]
