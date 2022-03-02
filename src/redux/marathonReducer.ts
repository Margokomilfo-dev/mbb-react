import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'workout',
    initialState: {
        currentWorkoutType: 0,
        currentMenuType: 0,
        currentDay: null,
    } as MarathonReducerType,
    reducers: {
        setCurrentWorkoutType(state, action: PayloadAction<{ type: number }>) {
            state.currentWorkoutType = action.payload.type
        },
        setCurrentMenuType(state, action: PayloadAction<{ type: number }>) {
            state.currentMenuType = action.payload.type
        },
        setCurrentDate(state, action: PayloadAction<{ day: number }>) {
            state.currentDay = action.payload.day
        },
    },
    extraReducers: (builder) => {},
})

export const { setCurrentWorkoutType, setCurrentMenuType, setCurrentDate } =
    slice.actions
export const marathonReducer = slice.reducer

export type MarathonReducerType = {
    currentWorkoutType: number
    currentMenuType: number
    currentDay: number | null
}
