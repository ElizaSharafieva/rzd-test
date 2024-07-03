import { configureStore } from "@reduxjs/toolkit"
import trainsReducer from './trainsReducer'

export const store = configureStore({
  reducer: {
    trains: trainsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch