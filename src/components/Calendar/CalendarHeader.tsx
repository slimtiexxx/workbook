import React, { ChangeEvent, FC } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import {
  nextMonth,
  prevMonth,
  selectMonth,
  selectYear,
  setMonth,
  setYear,
  stepToday,
} from '@app/reducers/calendarSlice'
import { dateUtil } from '@utils/date'

const months = dateUtil.months()
const years = [2021, 2022, 2023]

export const CalendarHeader: FC = () => {
  const year = useSelector(selectYear)
  const month = useSelector(selectMonth)
  const dispatch = useDispatch()

  const handleMonthSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setMonth(event.target.value))
  const handleYearSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setYear(event.target.value))
  const handleMonthStepForward = () => dispatch(nextMonth())
  const handleMonthStepBackward = () => dispatch(prevMonth())
  const handleTodayButtonClick = () => dispatch(stepToday())

  return (
    <header className='flex justify-between'>
      <div className='flex space-x-2.5'>
        <select
          onChange={handleYearSelectChange}
          value={year}
          className='appearance-none rounded border border-neutral-500 bg-transparent px-4 py-2 text-neutral-300 outline-emerald-500'
        >
          {years.map((year) => (
            <option key={`year-${year}`}>{year}</option>
          ))}
        </select>
        <div className='flex'>
          <button
            role='button'
            onClick={handleMonthStepBackward}
            className='cursor-pointer rounded-l border border-neutral-500 p-2 outline-emerald-500'
          >
            <ChevronLeftIcon className='h-6 text-neutral-300' />
          </button>
          <select
            onChange={handleMonthSelectChange}
            value={month}
            className='relative appearance-none border border-x-0 border-neutral-500 bg-transparent px-4 py-2 text-center text-neutral-300 outline-emerald-500'
          >
            {months.map((monthName, monthNumber) => (
              <option key={monthName} value={monthNumber}>
                {monthName}
              </option>
            ))}
          </select>
          <button
            role='button'
            onClick={handleMonthStepForward}
            className='cursor-pointer rounded-r border border-neutral-500 p-2 outline-emerald-500'
          >
            <ChevronRightIcon className='h-6 text-neutral-300' />
          </button>
        </div>
      </div>
      <div>
        <button
          role='button'
          onClick={handleTodayButtonClick}
          className='cursor-pointer rounded border border-neutral-500 py-2 px-4 text-neutral-300 outline-emerald-500'
        >
          Today
        </button>
      </div>
    </header>
  )
}
