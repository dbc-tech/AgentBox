import {
  FetchListingsConfig,
  FetchPeriod,
  GetSearchParamsFn,
} from '../types/search'
import { getModifiedAfterDate } from './get-modified-after-date'

const DEFAULT_FETCH_PERIOD: FetchPeriod = {
  minutes: 10,
}

const SYNC_ALL_FETCH_PERIOD: FetchPeriod = {
  days: 180,
}

const defaultSearchParams = {
  limit: 0,
  'filter[type]': 'Sale',
  'filter[propertyType]': 'Residential',
  'filter[propertyCategory]':
    'Apartment, House, Semi/Duplex, Studio, Terrace, Townhouse, Unit, Villa, Flat, SelfContainedCottage, ServicedApartment',
  'filter[incSurroundSuburbs]': false,
  'filter[matchAllFeature]': false,
  include:
    'relatedContacts,relatedStaffMembers,internalInformation,inspectionDates,mainImage,documents,mainDescription,contractDetails,permissions,externalAgents',
  orderBy: 'listedDate',
  order: 'DESC',
}

export const getListingsSearchParams: GetSearchParamsFn<
  FetchListingsConfig
> = ({
  fetchAll = false,
  fetchPeriod = DEFAULT_FETCH_PERIOD,
  queryFilter,
  crmOfficeId,
  consolidateLocations = false,
  operationalStates = ['QLD'],
  extraSearchParams = {},
} = {}) => {
  const calculatedSearchParams = {}

  calculatedSearchParams['filter[state]'] = operationalStates?.join(',')

  const fp = fetchAll ? SYNC_ALL_FETCH_PERIOD : fetchPeriod

  calculatedSearchParams['filter[modifiedAfter]'] =
    getModifiedAfterDate(fp).toISO()

  if (fetchAll) {
    calculatedSearchParams['filter[status]'] = 'Available,Pending'
  }

  if (queryFilter) {
    calculatedSearchParams['filter[query]'] = queryFilter
  }

  if (!consolidateLocations && crmOfficeId) {
    calculatedSearchParams['filter[officeId]'] = crmOfficeId
  }

  return {
    ...defaultSearchParams,
    ...calculatedSearchParams,
    ...extraSearchParams,
  }
}
