import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dateUtil } from '@utils/date'
import { RootState } from '@app/store'

const today = dateUtil()

export type DayEntry = {
  id?: string | null
  loggedHours: number
  date: string
}

export interface CalendarState {
  month: number
  year: number
  days: DayEntry[]
}

const initialState: CalendarState = {
  month: today.month(),
  year: today.year(),
  days: [],
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
    setHours: (state, { payload }: PayloadAction<DayEntry & { initialHours: number }>) => {
      const index = state.days.findIndex((day) => day.date === payload.date)

      if (payload.initialHours === payload.loggedHours) {
        state.days.splice(index, 1)
        return
      }

      if (index !== -1) {
        state.days[index] = payload
      } else {
        state.days.push(payload)
      }
    },
  },
})

const selectSelf = (state: RootState) => state.calendar

export const selectMonth = createSelector(selectSelf, (state) => state.month)
export const selectYear = createSelector(selectSelf, (state) => state.year)
export const selectAllDays = createSelector(selectSelf, (calendar) => calendar.days)
export const selectHours = (date: DayEntry['date']): ((state: RootState) => number | undefined) =>
  createSelector(
    (state: RootState) => state.calendar.days,
    (days) => days.find((day) => day.date === date)?.loggedHours,
  )

export const { nextMonth, prevMonth, stepToday, setMonth, setYear, setHours } =
  calendarSlice.actions

export default calendarSlice.reducer
