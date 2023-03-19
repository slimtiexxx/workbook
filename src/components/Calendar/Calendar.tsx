import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useMonthDays } from '@hooks/useMonthDays'
import { CalendarDay } from '@components/Calendar/CalendarDay'
import { CalendarHeader } from '@components/Calendar/CalendarHeader'
import { CalendarBody } from '@components/Calendar/CalendarBody'
import { selectMonth, selectYear } from '@app/reducers/calendarSlice'

export const Calendar: FC = () => {
  const month = useSelector(selectMonth)
  const year = useSelector(selectYear)
  const days = useMonthDays({ year, month })

  return (
    <div className='container mx-auto space-y-6 py-10'>
      <CalendarHeader />
      <CalendarBody>
        {days.map(({ month, year, ...entry }) => (
          <CalendarDay {...entry} key={`${year}-${month}-${entry.date}`} />
        ))}
      </CalendarBody>
    </div>
  )
}
