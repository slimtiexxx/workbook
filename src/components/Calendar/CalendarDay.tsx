import React, { FC } from 'react'
import classNames from 'classnames'
import { getHourIntensityColour } from '@utils/getHourIntensityColour'
import { DayEntry } from '@hooks/useMonthDays'
import { useDispatch, useSelector } from 'react-redux'
import { logHour, selectHour } from '@app/reducers/calendarSlice'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

export const CalendarDay: FC<Omit<DayEntry, 'month' | 'year'>> = ({
  date,
  isToday,
  active,
  inFuture,
  fullDate,
  savedHours = 0,
  paid = false,
}) => {
  const hour = useSelector(selectHour(fullDate)) + savedHours
  const dispatch = useDispatch()

  const handlePlusIconClick = () => {
    dispatch(logHour({ date: fullDate, hours: hour + 0.5 }))
  }
  const handleMinusIconClick = () => {
    if (hour !== 0) {
      dispatch(logHour({ date: fullDate, hours: hour - 0.5 }))
    }
  }

  return (
    <div className='group border-t border-r border-neutral-600 px-4 py-3'>
      <div
        className={classNames('rounded bg-stone-500', {
          'opacity-25 pointer-events-none user-select-none': !active,
        })}
      >
        <div className='flex justify-between'>
          <div
            className={classNames(
              'w-12 h-12 font-black text-sm rounded flex justify-center items-center text-white relative',
              {
                'bg-red-500': isToday,
                'bg-neutral-700': !isToday,
              },
            )}
          >
            {paid && <CheckBadgeIcon className='absolute -top-2 -left-2 h-6 w-6 text-green-600' />}
            {date}
          </div>

          <div className='flex'>
            {active && !inFuture && !paid && (
              <div
                className={classNames(
                  'flex w-6 flex-col transition-all border-r group-hover:opacity-100 border-stone-500 group-hover:translate-x-0 transition',
                  {
                    'opacity-0 translate-x-6': !isToday,
                    'opacity-1 translate-x-0': isToday,
                  },
                )}
              >
                <button
                  onClick={handlePlusIconClick}
                  className='relative flex h-full items-center justify-center border-b border-stone-500 bg-stone-600 font-light text-neutral-200'
                >
                  <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    +
                  </span>
                </button>
                <button
                  onClick={handleMinusIconClick}
                  className='relative flex h-full items-center justify-center bg-stone-600 font-light text-neutral-200'
                >
                  <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    -
                  </span>
                </button>
              </div>
            )}
            {!inFuture && (
              <div
                className={classNames(
                  'relative z-10 w-10 h-full text-white transition-colors rounded-tr rounded-br text-xs flex justify-center items-center',
                  getHourIntensityColour(hour),
                )}
              >
                {hour}h
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
