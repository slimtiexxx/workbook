import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import updateLocale from 'dayjs/plugin/updateLocale'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(localeData)
dayjs.extend(objectSupport)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekdays: 'Monday_Tuesday_Wednesday_Thursday_Friday_Saturday_Sunday'.split('_'),
  weekStart: 1,
})

export const DATE_FORMAT = 'YYYY-MM-DD'

export { dayjs as dateUtil }
