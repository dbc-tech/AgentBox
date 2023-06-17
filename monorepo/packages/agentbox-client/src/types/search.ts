export type SearchParams = Record<string, any>

export type FetchPeriod = {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export type FetchConfig = {
  fetchPeriod?: FetchPeriod
  fetchAll?: boolean
  extraSearchParams?: SearchParams
}

export type FetchStaffsConfig = FetchConfig

export type FetchInspectionsConfig = FetchConfig

export type FetchListingsConfig = FetchConfig & {
  queryFilter?: string
  crmOfficeId?: string
  consolidateLocations?: boolean
  operationalStates?: string[]
}

export type FetchListingLinksConfig = FetchConfig & {
  listingId?: string
}

export type FetchNotesConfig = FetchConfig & {
  listingId?: string
}

export type GetSearchParamsFn<T extends FetchConfig> = (
  fetchConfig?: T,
) => SearchParams
