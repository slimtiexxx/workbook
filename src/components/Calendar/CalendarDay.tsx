import React, { FC } from 'react'
import classNames from 'classnames'
import { getHourIntensityColour } from '@utils/getHourIntensityColour'
import { DayProps } from '@hooks/useMonthDays'
import { useDispatch } from 'react-redux'
import { setHours } from '@app/reducers/calendarSlice'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

export const CalendarDay: FC<DayProps> = ({
  dayNumber,
  isToday,
  inMonth,
  inFuture,
  hours,
  initialHours,
  date,
  paid = false,
  isModified,
  loading,
  id,
}) => {
  const dispatch = useDispatch()

  const handlePlusIconClick = () => {
    dispatch(setHours({ id, date, loggedHours: hours + 0.5, initialHours }))
  }
  const handleMinusIconClick = () => {
    if (hours > 0) {
      dispatch(setHours({ id, date, loggedHours: hours - 0.5, initialHours }))
    }
  }

  return (
    <div className='group border-t border-r border-neutral-600 px-4 py-3'>
      <div
        className={classNames('rounded bg-stone-500', {
          'opacity-25 pointer-events-none user-select-none': !inMonth,
        })}
      >
        <div className='flex items-center justify-between'>
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
            {dayNumber}
          </div>

          {loading ? (
            <div role='status' className='mr-2'>
              <svg
                aria-hidden='true'
                className='h-4 w-4 animate-spin fill-stone-600 text-neutral-300 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <div className='flex h-12'>
              {inMonth && !inFuture && !paid && (
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
                    getHourIntensityColour(hours),
                  )}
                >
                  {isModified && (
                    <div className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-600'></div>
                  )}
                  <div>{hours}h</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
