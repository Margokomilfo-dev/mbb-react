import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getWorkoutsByCategory,
    WorkoutReducerType,
} from '../redux/workoutReducer'
import { AllStateType } from '../redux/store'
import { Workout } from './Workout'
import { Select } from 'antd'
import { WorkoutCategory } from '../settings/types'
import styled from 'styled-components'

const { Option } = Select
export const Workouts = () => {
    const dispatch = useDispatch()
    const { workouts } = useSelector<AllStateType, WorkoutReducerType>(
        (state) => state.workouts
    )
    useEffect(() => {
        dispatch(getWorkoutsByCategory(0))
    }, [])

    const handleChange = (val) => {
        dispatch(getWorkoutsByCategory(val))
    }
    return (
        <div>
            <Select
                defaultValue="Все"
                style={{ minWidth: 300 }}
                onChange={handleChange}
            >
                {WorkoutCategory.map((c) => (
                    <Option value={c.id} key={c.id}>
                        {c.name}
                    </Option>
                ))}
            </Select>
            <Blocks>
                {workouts.map((w) => (
                    <Workout workout={w} key={w._id} />
                ))}
            </Blocks>
        </div>
    )
}
const Blocks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`
