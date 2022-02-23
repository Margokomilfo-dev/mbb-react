import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, ProductType, WorkoutType } from '../api/api'

export const getWorkoutsByCategory = createAsyncThunk(
    'workout/getWorkouts',
    async (type: number, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getWorkoutsByCategory(type)
            return res
            // dispatch(setRecipesProducts)
        } catch (e) {
            return rejectWithValue('getWorkoutsByType - error')
        }
    }
)

export const getWorkoutsById = createAsyncThunk(
    'workout/getWorkoutsById',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getWorkoutById(id)
            return res
        } catch (e) {
            return rejectWithValue('getWorkoutsById - error')
        }
    }
)
export const getWorkoutsByCategoryAndByDay = createAsyncThunk(
    'workout/getWorkoutsByCategoryAndByDay',
    async (
        param: { category: number; day: number },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const res = await api.getWorkoutsByCategoryAndDay(
                param.category,
                param.day
            )
            return res
        } catch (e) {
            return rejectWithValue('getWorkoutsByCategoryAndByDay - error')
        }
    }
)

const slice = createSlice({
    name: 'workout',
    initialState: {
        workouts: [],
        workout: null,
        workoutsForDay: null,
    } as WorkoutReducerType,
    reducers: {
        setProduct_(state, action: PayloadAction<{ product: ProductType }>) {
            // state.recipesProducts.unshift(action.payload.product)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWorkoutsById.fulfilled, (state, action) => {
            state.workout = action.payload
        })
        builder.addCase(getWorkoutsByCategory.fulfilled, (state, action) => {
            state.workouts = action.payload
        })
        builder.addCase(
            getWorkoutsByCategoryAndByDay.fulfilled,
            (state, action) => {
                state.workoutsForDay = action.payload
            }
        )
    },
})

export const { setProduct_ } = slice.actions
export const workoutReducer = slice.reducer

export type WorkoutReducerType = {
    workouts: null | Array<WorkoutType>
    workout: null | WorkoutType
    workoutsForDay: null | WorkoutType | string
}
