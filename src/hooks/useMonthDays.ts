import { dateUtil } from '@utils/date'
export const DAYS_TO_DISPLAY = 42

type DayEntry = {
  date: number
  month: number
  year: number
  isToday: boolean
  active: boolean
  inFuture: boolean
  fullDate: string
}
type UseCurrentMonthHookOptions = { year: number; month: number }
type UseCurrentMonthHook = (options: UseCurrentMonthHookOptions) => DayEntry[]

const cache: Record<string, DayEntry[]> = {}

export const useMonthDays: UseCurrentMonthHook = ({ year, month }) => {
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
    }
  })

  cache[`${year}-${month}`] = dayEntries

  return dayEntries
}
