import { dateUtil, DATE_FORMAT } from '@utils/date'
import { useSelector } from 'react-redux'
import { selectHours, selectMonth, selectYear } from '@app/reducers/calendarSlice'
import { useMemo } from 'react'
import { useDayEntriesQuery, useLatestBillQuery } from '@generated/graphql'
export const DAYS_TO_DISPLAY = 42

export type DayProps = {
  dayNumber: number
  isToday: boolean
  inMonth: boolean
  inFuture: boolean
  hours: number
  initialHours: number
  isModified: boolean
  paid: boolean
  date: string
  loading: boolean
  id?: string | null
}
type UseCurrentMonthHook = () => DayProps[]

export const useMonthDays: UseCurrentMonthHook = () => {
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)
  const dateRange = useMemo(() => {
    const startOfWeek = dateUtil({ year, month }).startOf('week')
    return {
      from: startOfWeek.format(DATE_FORMAT),
      to: startOfWeek.add(DAYS_TO_DISPLAY - 1, 'day').format(DATE_FORMAT),
    }
  }, [month, year])

  const { data: dayEntriesData, loading: dayEntriesLoading } = useDayEntriesQuery({
    variables: dateRange,
  })
  const { data: latestBillData, loading: latestBillLoading } = useLatestBillQuery()

  const latestBillDate = useMemo(
    () => dateUtil(latestBillData?.bills?.data[0].attributes?.date),
    [latestBillData],
  )

  const loading = dayEntriesLoading || latestBillLoading

  const dayEntries: DayProps[] = Array.from(Array(DAYS_TO_DISPLAY).keys()).map((dayIndex) => {
    const currentDate = dateUtil({ year, month }).startOf('week').add(dayIndex, 'days')
    const fullDate = currentDate.format(DATE_FORMAT)
    const today = dateUtil()
    const initialEntry =
      dayEntriesData?.dayEntries?.data.find((day) => day.attributes?.date === fullDate) || null
    const savedHours = useSelector(selectHours(fullDate))
    const initialHours = initialEntry?.attributes?.hours || 0
    const id = initialEntry?.id

    const dayProp: DayProps = {
      date: fullDate,
      dayNumber: currentDate.date(),
      isToday: fullDate === today.format(DATE_FORMAT),
      inMonth: currentDate.month() === month,
      inFuture: currentDate.unix() > today.unix(),
      hours: savedHours ?? initialHours,
      isModified: savedHours ? savedHours !== initialHours : false,
      initialHours,
      paid: loading ? false : latestBillDate.unix() >= currentDate.unix(),
      id,
      loading,
    }

    return dayProp
  })

  return dayEntries
}
