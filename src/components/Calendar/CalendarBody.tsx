import React, { FC } from 'react'
import { dateUtil } from '@utils/date'

const weekDays = dateUtil.weekdays()

export const CalendarBody: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return (
    <div className={`grid grid-cols-7 [&>*:nth-child(7n)]:border-r-transparent`}>
      {weekDays.map((dayName) => (
        <div
          role='columnheader'
          className='border-r border-neutral-600 px-4 py-3 text-neutral-300'
          key={dayName}
        >
          {dayName}
        </div>
      ))}
      {children}
    </div>
  )
}
