import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dateUtil } from '@utils/date'
import hours from '@mocks/logged-hours.json'
import { RootState } from '@app/store'

const today = dateUtil()

export type HourEntry = {
  date: string
  value: number
}

export interface CalendarState {
  month: number
  year: number
  hours: Record<HourEntry['date'], HourEntry['value']>
}

const initialState: CalendarState = {
  month: today.month(),
  year: today.year(),
  hours,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setYear: (state, { payload }: PayloadAction<HTMLSelectElement['value']>) => {
      state.month = parseInt(payload, 10)
    },
    setMonth: (state, { payload }: PayloadAction<HTMLSelectElement['value']>) => {
      state.month = parseInt(payload, 10)
    },
    nextMonth: (state) => {
      if (state.month === 11) {
        state.month = 0
        state.year += 1
      } else {
        state.month += 1
      }
    },
    prevMonth: (state) => {
      if (state.month === 0) {
        state.month = 11
        state.year -= 1
      } else {
        state.month -= 1
      }
    },
    stepToday: (state) => {
      state.year = initialState.year
      state.month = initialState.month
    },
    logHour: (state, { payload }: PayloadAction<HourEntry>) => {
      state.hours = {
        ...state.hours,
        [payload.date]: payload.value,
      }
    },
  },
})

const selectSelf = (state: RootState) => state.calendar

export const selectMonth = createSelector(selectSelf, (state) => state.month)
export const selectYear = createSelector(selectSelf, (state) => state.year)
export const selectHour = (date: string): ((state: RootState) => number) =>
  createSelector(selectSelf, (state) => state.hours[date] || 0)

export const { nextMonth, prevMonth, stepToday, setMonth, setYear, logHour } = calendarSlice.actions

export default calendarSlice.reducer
