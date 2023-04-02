import React, { FC } from 'react'
import { useMonthDays } from '@hooks/useMonthDays'
import { CalendarDay } from '@components/Calendar/CalendarDay'
import { CalendarHeader } from '@components/Calendar/CalendarHeader'
import { CalendarBody } from '@components/Calendar/CalendarBody'
import { CalendarFooter } from '@components/Calendar/CalendarFooter'

export const Calendar: FC = () => {
  const days = useMonthDays()

  return (
    <div className='container mx-auto space-y-6 py-10'>
      <CalendarHeader />
      <CalendarBody>
        {days.map((entry) => (
          <CalendarDay {...entry} key={entry.date} />
        ))}
      </CalendarBody>
      <CalendarFooter />
    </div>
  )
}
