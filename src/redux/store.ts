import { combineReducers } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './productReducer'

let reducers = combineReducers({
    products: productReducer,
})
export type AllStateType = ReturnType<typeof reducers>

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleWare),
})
