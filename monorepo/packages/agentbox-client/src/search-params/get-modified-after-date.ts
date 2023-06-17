import { DateTime } from 'luxon'
import { FetchPeriod } from '../types/search'

export const getModifiedAfterDate = ({
  days,
  hours,
  minutes,
  seconds,
}: FetchPeriod) => DateTime.utc().minus({ days, hours, minutes, seconds })
