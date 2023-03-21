import { combineReducers, configureStore } from '@reduxjs/toolkit'
import calendarReducer from '@app/reducers/calendarSlice'

const rootReducer = combineReducers({
  calendar: calendarReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>
