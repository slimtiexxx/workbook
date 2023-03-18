import React, { ChangeEvent, useState } from 'react'
import { dateUtil } from '@utils/date'
import classNames from 'classnames'
import { useMonthDays } from '@hooks/useMonthDays'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import _loggedHours from '@mocks/logged-hours.json'

import { getHourIntensityColour } from '@utils/getHourIntensityColour'

const months = dateUtil.months()
const weekDays = dateUtil.weekdays()
const years = [2021, 2022, 2023]
const today = dateUtil()

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(today.month())

  const [selectedYear, setSelectedYear] = useState<number>(today.year())
  const [loggedHours, setLoggedHours] = useState<Record<string, number>>(_loggedHours)
  const days = useMonthDays({ year: selectedYear, month: selectedMonth })

  const handleMonthSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value, 10))
  }
  const handleYearSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10))
  }
  const handleMonthStepForward = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }
  const handleMonthStepBackward = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }
  const handlePlusIconClick = (entry: string) => {
    setLoggedHours({
      ...loggedHours,
      [entry]: (loggedHours[entry] || 0) + 0.5,
    })
  }
  const handleMinusIconClick = (entry: string) => {
    if (loggedHours[entry] === 0) return
    setLoggedHours({
      ...loggedHours,
      [entry]: (loggedHours[entry] || 0) - 0.5,
    })
  }
  const handleTodayButtonClick = () => {
    setSelectedMonth(today.month())
  }

  return (
    <div className='container mx-auto py-10 space-y-6'>
      <header className='flex justify-between'>
        <div className='flex space-x-2.5'>
          <select
            onChange={handleYearSelectChange}
            value={selectedYear}
            className='px-4 bg-transparent text-neutral-300 outline-emerald-500 py-2 border border-neutral-500 appearance-none rounded'
          >
            {years.map((year) => (
              <option key={`year-${year}`}>{year}</option>
            ))}
          </select>
          <div className='flex'>
            <button
              role='button'
              onClick={handleMonthStepBackward}
              className='cursor-pointer outline-emerald-500 p-2 border border-neutral-500 rounded-tl rounded-bl'
            >
              <ChevronLeftIcon className='h-6 text-neutral-300' />
            </button>
            <select
              onChange={handleMonthSelectChange}
              value={selectedMonth}
              className='px-4 bg-transparent text-neutral-300 outline-emerald-500 py-2 border border-neutral-500 appearance-none border-l-0 border-r-0 relative text-center'
            >
              {months.map((month, monthNumber) => {
                return (
                  <option key={month} value={monthNumber}>
                    {month}
                  </option>
                )
              })}
            </select>
            <button
              role='button'
              onClick={handleMonthStepForward}
              className='cursor-pointer outline-emerald-500 p-2 border border-neutral-500 rounded-tr rounded-br'
            >
              <ChevronRightIcon className='h-6 text-neutral-300' />
            </button>
          </div>
        </div>
        <div>
          <button
            role='button'
            onClick={handleTodayButtonClick}
            className='cursor-pointer outline-emerald-500 py-2 px-4 border border-neutral-500 rounded text-neutral-300'
          >
            Today
          </button>
        </div>
      </header>
      <div className={`grid grid-cols-7 [&>*:nth-child(7n)]:border-r-transparent`}>
        {weekDays.map((dayName) => (
          <div className='px-4 py-3 border-r border-neutral-600 text-neutral-300' key={dayName}>
            {dayName}
          </div>
        ))}
        {days.map(({ date, month, year, isToday, active, inFuture, fullDate }) => {
          const hour = loggedHours[fullDate] || 0
          return (
            <div
              key={`${year}-${month}-${date}`}
              className='px-4 py-3 border-t border-r border-neutral-600 group'
            >
              <div
                className={classNames('rounded bg-stone-500', {
                  'opacity-25 pointer-events-none user-select-none': !active,
                })}
              >
                <div className='flex justify-between'>
                  <div
                    className={classNames(
                      'w-12 h-12 font-black text-sm rounded flex justify-center items-center text-white',
                      {
                        'bg-red-500': isToday,
                        'bg-neutral-700': !isToday,
                      },
                    )}
                  >
                    {date}
                  </div>

                  <div className='flex'>
                    {active && !inFuture && (
                      <div
                        className={classNames(
                          'flex w-6 flex-col transition-all group-hover:opacity-100 group-hover:translate-x-0 transition',
                          {
                            'opacity-0 translate-x-full': !isToday,
                            'opacity-1 translate-x-0': isToday,
                          },
                        )}
                      >
                        <button
                          onClick={() => handlePlusIconClick(fullDate)}
                          className='relative flex px-2 font-light border-b justify-center h-full items-center text-neutral-200 border-neutral-200 bg-stone-600'
                        >
                          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            +
                          </span>
                        </button>
                        <button
                          onClick={() => handleMinusIconClick(fullDate)}
                          className='flex relative justify-center font-light h-full items-center bg-stone-600 text-neutral-200'
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
                          'relative z-10 w-10 h-full text-white rounded-tr rounded-br text-xs flex justify-center items-center',
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
        })}
      </div>
    </div>
  )
}

export default App
