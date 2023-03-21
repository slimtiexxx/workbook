import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useMonthDays } from '@hooks/useMonthDays'
import { CalendarDay } from '@components/Calendar/CalendarDay'
import { CalendarHeader } from '@components/Calendar/CalendarHeader'
import { CalendarBody } from '@components/Calendar/CalendarBody'
import {
  selectMonthHourSummary,
  selectTotalHourSummary,
  selectYearHourSummary,
} from '@app/reducers/calendarSlice'

export const Calendar: FC = () => {
  const monthHourSummary = useSelector(selectMonthHourSummary)
  const yearHourSummary = useSelector(selectYearHourSummary)
  const totalHourSummary = useSelector(selectTotalHourSummary)
  const days = useMonthDays()

  return (
    <div className='container mx-auto space-y-6 py-10'>
      <CalendarHeader />
      <CalendarBody>
        {days.map(({ month, year, ...entry }) => (
          <CalendarDay {...entry} key={`${year}-${month}-${entry.date}`} />
        ))}
      </CalendarBody>
      <div className='text-stone-300'>
        <div>Worked in month: {monthHourSummary}h</div>
        <div>Worked in year: {yearHourSummary}h</div>
        <div>Worked in total: {totalHourSummary}h</div>
      </div>
    </div>
  )
}
