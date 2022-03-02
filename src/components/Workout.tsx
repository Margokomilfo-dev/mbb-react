import React from 'react'
import { WorkoutType } from '../api/api'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { IMG, Type } from './common-styles/styles'
import wrapper0 from '../images/workouts/wrapper0.png'
import wrapper1 from '../images/workouts/wrapper1.png'
import wrapper2 from '../images/workouts/wrapper2.png'
import wrapper3 from '../images/workouts/wrapper3.png'
import wrapper4 from '../images/workouts/wrapper4.png'
import wrapper5 from '../images/workouts/wrapper5.png'
import { WorkoutCategory } from '../settings/types'

type PropsType = {
    workout: WorkoutType
}
export const Workout = (props: PropsType) => {
    const id = WorkoutCategory.find((w) => w.id === props.workout.category).id
    return (
        <Wrapper>
            <NavLink to={`/workout/${props.workout._id}`}>
                <IMG>
                    <img
                        src={
                            id === 0
                                ? wrapper0
                                : id === 1
                                ? wrapper1
                                : id === 2
                                ? wrapper2
                                : id === 3
                                ? wrapper3
                                : id === 4
                                ? wrapper4
                                : id === 5
                                ? wrapper5
                                : id === 6
                                ? wrapper0
                                : id === 7
                                ? wrapper1
                                : wrapper2
                        }
                        alt=""
                    />
                    <Type>{props.workout.day}</Type>
                </IMG>
            </NavLink>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 200px;
    margin: 5px;
`
