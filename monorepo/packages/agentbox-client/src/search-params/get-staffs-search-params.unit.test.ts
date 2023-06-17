import { getStaffsSearchParams } from './get-staffs-search-params'

describe('getInspectionSearchParams()', () => {
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
    const searchParams = getStaffsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: true,
    })

    expect(searchParams).toEqual({
      limit: 0,
      'filter[status]': 'all',
    })
  })

  it('should make the correct search params for the given fetch period', () => {
    const searchParams = getStaffsSearchParams({
      fetchPeriod: { minutes: 20 },
      fetchAll: false,
    })

    expect(searchParams).toEqual({
      limit: 0,
      'filter[status]': 'all',
      'filter[modifiedAfter]': '2022-03-27T22:50:57.508Z',
    })
  })
})
