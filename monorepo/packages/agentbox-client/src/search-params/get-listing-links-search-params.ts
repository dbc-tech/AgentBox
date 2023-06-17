import { FetchListingLinksConfig, GetSearchParamsFn } from '../types/search'

export const defaultLinksSearchParams = {
  limit: 0,
}

export const getListingLinksSearchParams: GetSearchParamsFn<
  FetchListingLinksConfig
> = ({ listingId, extraSearchParams = {} } = {}) => {
  const calculatedSearchParams = {}

  if (listingId) {
    calculatedSearchParams['filter[listingId]'] = listingId
  }

  return {
    ...defaultLinksSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
