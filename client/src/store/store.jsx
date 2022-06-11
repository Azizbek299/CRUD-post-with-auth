import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice'
import goalSlice from './reducers/goalSlice'

const rootReducer = combineReducers({
    auth:authSlice,
    goals:goalSlice
})


export const store = configureStore({
        reducer:rootReducer
    })
