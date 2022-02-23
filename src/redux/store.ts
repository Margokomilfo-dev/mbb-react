import { combineReducers } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './productReducer'
import { recipeReducer } from './recipeReducer'
import { workoutReducer } from './workoutReducer'

let reducers = combineReducers({
    products: productReducer,
    recipes: recipeReducer,
    workouts: workoutReducer,
})
export type AllStateType = ReturnType<typeof reducers>

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleWare),
})
