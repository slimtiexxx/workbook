import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useMonthDays } from '@hooks/useMonthDays'
import { CalendarDay } from '@components/Calendar/CalendarDay'
import { CalendarHeader } from '@components/Calendar/CalendarHeader'
import { CalendarBody } from '@components/Calendar/CalendarBody'
import { selectMonth, selectYear } from '@app/reducers/calendarSlice'
import { dateUtil } from '@utils/date'
import { useDayEntriesQuery, useUnpaidHoursQuery } from '@generated/graphql'

export const Calendar: FC = () => {
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)
  const days = useMonthDays()

  const dateRange = useMemo(
    () => ({
      from: dateUtil({ year, month }).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
      to: dateUtil({ year, month }).add(1, 'month').endOf('month').format('YYYY-MM-DD'),
    }),
    [month, year],
  )

  const { data } = useDayEntriesQuery({
    variables: dateRange,
  })

  const { data: unpaidHoursData } = useUnpaidHoursQuery()

  const unpaidHours = useMemo(
    () =>
      unpaidHoursData?.dayEntries?.data.reduce((acc, curr) => {
        acc += curr.attributes?.hours || 0

        return acc
      }, 0),
    [unpaidHoursData],
  )

  const monthHours = useMemo(() => {
    return data?.dayEntries?.data.reduce((acc, curr) => {
      const date = dateUtil(curr?.attributes?.day)

      if (date.month() === month) {
        acc += curr.attributes?.hours || 0
      }

      return acc
    }, 0)
  }, [data])

  return (
    <div className='container mx-auto space-y-6 py-10'>
      <CalendarHeader />
      <CalendarBody>
        {days.map((entry) => {
          const savedEntry = data?.dayEntries?.data.find(
            (day) => day.attributes?.day === entry.fullDate,
          )
          const savedHours = savedEntry?.attributes?.hours
          return (
            <CalendarDay
              {...entry}
              paid={!!savedEntry?.attributes?.paid}
              savedHours={savedHours}
              key={entry.fullDate}
            />
          )
        })}
      </CalendarBody>
      <div className='text-stone-300'>
        <div>Worked in month: {monthHours}h</div>
        <div>Unpaid hours: {unpaidHours}h</div>
      </div>
    </div>
  )
}
