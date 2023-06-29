import {
  FetchInspectionsConfig,
  FetchPeriod,
  GetSearchParamsFn,
} from '../types/search'
import { getModifiedAfterDate } from './get-modified-after-date'

const DEFAULT_FETCH_PERIOD: FetchPeriod = {
  minutes: 10,
}

const SYNC_ALL_FETCH_PERIOD: FetchPeriod = {
  days: 1,
}

export const defaultSearchParams = {
  limit: 0,
  include: 'contact,listing',
}

export const getInspectionsSearchParams: GetSearchParamsFn<
  FetchInspectionsConfig
> = ({
  fetchPeriod = DEFAULT_FETCH_PERIOD,
  fetchAll = false,
  crmOfficeId,
  consolidateLocations = false,
  extraSearchParams = {},
} = {}) => {
  const calculatedSearchParams = {}

  const fp = fetchAll ? SYNC_ALL_FETCH_PERIOD : fetchPeriod

  calculatedSearchParams['filter[modifiedAfter]'] =
    getModifiedAfterDate(fp).toISO()

  if (!consolidateLocations && crmOfficeId) {
    calculatedSearchParams['filter[listingOfficeId]'] = crmOfficeId
  }

  return {
    ...defaultSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
