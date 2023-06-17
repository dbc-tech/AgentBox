import {
  FetchPeriod,
  FetchStaffsConfig,
  GetSearchParamsFn,
} from '../types/search'
import { getModifiedAfterDate } from './get-modified-after-date'

const DEFAULT_FETCH_PERIOD: FetchPeriod = {
  minutes: 10,
}

const defaultSearchParams = {
  limit: 0,
  'filter[status]': 'all',
}

export const getStaffsSearchParams: GetSearchParamsFn<FetchStaffsConfig> = ({
  fetchPeriod = DEFAULT_FETCH_PERIOD,
  fetchAll = false,
  extraSearchParams = {},
} = {}) => {
  const calculatedSearchParams = {}

  if (!fetchAll) {
    calculatedSearchParams['filter[modifiedAfter]'] =
      getModifiedAfterDate(fetchPeriod).toISO()
  }

  return {
    ...defaultSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
