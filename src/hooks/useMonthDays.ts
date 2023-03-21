import { dateUtil } from '@utils/date'
import { useSelector } from 'react-redux'
import { selectMonth, selectYear } from '@app/reducers/calendarSlice'
export const DAYS_TO_DISPLAY = 42

export type DayEntry = {
  date: number
  month: number
  year: number
  isToday: boolean
  active: boolean
  inFuture: boolean
  fullDate: string
  savedHours?: number
  paid: boolean
}
type UseCurrentMonthHook = () => DayEntry[]

const cache: Record<string, DayEntry[]> = {}

export const useMonthDays: UseCurrentMonthHook = () => {
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)

  if (cache[`${year}-${month}`]) {
    return cache[`${year}-${month}`]
  }

  const dayEntries: DayEntry[] = Array.from(Array(DAYS_TO_DISPLAY).keys()).map((dayIndex) => {
    const currentDate = dateUtil({ year, month }).startOf('week').add(dayIndex, 'days')
    const fullDate = currentDate.format('YYYY-MM-DD')

    return {
      year: currentDate.year(),
      fullDate,
      month: currentDate.month(),
      date: currentDate.date(),
      isToday: fullDate === dateUtil().format('YYYY-MM-DD'),
      active: currentDate.month() === month,
      inFuture: currentDate.unix() > dateUtil().unix(),
      paid: false,
    }
  })

  cache[`${year}-${month}`] = dayEntries

  return dayEntries
}
