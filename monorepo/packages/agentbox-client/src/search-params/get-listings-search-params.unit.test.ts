import { getListingsSearchParams } from './get-listings-search-params'

describe('getListingsSearchParams()', () => {
  const RealDate = Date.now

  beforeAll(() => {
    global.Date.now = jest.fn(() =>
      new Date('2022-03-27T23:10:57.508Z').getTime(),
    )
  })

  afterAll(() => {
    global.Date.now = RealDate
  })

  it('should make the correct search params when the fetchAll is true', () => {
    const searchParams = getListingsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: true,
    })

    expect(searchParams).toEqual({
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
      'filter[state]': 'QLD',
      'filter[modifiedAfter]': '2021-09-28T23:10:57.508Z',
      'filter[status]': 'Available,Pending',
    })
  })

  it('should make the correct search params for the given fetch period', () => {
    const searchParams = getListingsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
    })

    expect(searchParams).toEqual({
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
      'filter[state]': 'QLD',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })

  it('should set office location when not consolidating', () => {
    const searchParams = getListingsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
      crmOfficeId: '123',
    })

    expect(searchParams).toEqual({
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
      'filter[state]': 'QLD',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
      'filter[officeId]': '123',
    })
  })

  it('should ignore office location when consolidating', () => {
    const searchParams = getListingsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
      crmOfficeId: '123',
      consolidateLocations: true,
    })

    expect(searchParams).toEqual({
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
      'filter[state]': 'QLD',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })
})
