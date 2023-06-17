import { FetchNotesConfig, GetSearchParamsFn } from '../types/search'

const defaultSearchParams = {
  limit: 0,
  fields: 'description',
  include: 'attachedListings',
}

export const getNotesSearchParams: GetSearchParamsFn<FetchNotesConfig> = ({
  listingId,
  extraSearchParams = {},
} = {}) => {
  const calculatedSearchParams = {}

  if (listingId) {
    calculatedSearchParams['filter[listingId]'] = listingId
  }

  return {
    ...defaultSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
