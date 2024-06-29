import { combineReducers, configureStore } from "@reduxjs/toolkit"; 
import trainsReducer from './trainsReducer';

const rootReducer = combineReducers(
  {
    trains: trainsReducer
  }
)

export const store = configureStore({
  reducer: rootReducer,
})