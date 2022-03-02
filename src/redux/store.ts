import { combineReducers } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './productReducer'
import { recipeReducer } from './recipeReducer'
import { workoutReducer } from './workoutReducer'
import { marathonReducer } from './marathonReducer'

let reducers = combineReducers({
    products: productReducer,
    recipes: recipeReducer,
    workouts: workoutReducer,
    marathon: marathonReducer,
})
export type AllStateType = ReturnType<typeof reducers>

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleWare),
})
