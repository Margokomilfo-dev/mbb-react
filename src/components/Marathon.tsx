import { useDispatch, useSelector } from 'react-redux'
import { AllStateType } from '../redux/store'
import { getRecipesForDay, RecipeReducerType } from '../redux/recipeReducer'
import React, { useEffect } from 'react'
import { RecipeSmall } from './RecipeSmall'
import styled from 'styled-components'
import {
    getWorkoutsByCategoryAndByDay,
    WorkoutReducerType,
} from '../redux/workoutReducer'
import { Button, Select } from 'antd'
import { MenuCategory, WorkoutCategory } from '../settings/types'
import {
    MarathonReducerType,
    setCurrentMenuType,
    setCurrentWorkoutType,
} from '../redux/marathonReducer'

const { Option } = Select

export const Marathon = () => {
    const { recipesForDay } = useSelector<AllStateType, RecipeReducerType>(
        (state) => state.recipes
    )
    const { workoutsForDay } = useSelector<AllStateType, WorkoutReducerType>(
        (state) => state.workouts
    )
    const { currentWorkoutType, currentMenuType, currentDay } = useSelector<
        AllStateType,
        MarathonReducerType
    >((state) => state.marathon)

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentDay && currentDay !== 0) {
            dispatch(
                getRecipesForDay({ menu: currentMenuType, day: currentDay })
            )
            dispatch(
                getWorkoutsByCategoryAndByDay({
                    category: currentWorkoutType,
                    day: currentDay,
                })
            )
        }
    }, [currentWorkoutType, currentMenuType])

    const handleWorkoutTypeChange = (val) => {
        dispatch(setCurrentWorkoutType({ type: val }))
        localStorage.setItem('workoutType', val)
    }

    const handleMenuTypeChange = (val) => {
        dispatch(setCurrentMenuType({ type: val }))
        localStorage.setItem('menuType', val)
    }
    const startClick = () => {
        localStorage.setItem('started', new Date().toISOString())
    }
    if (!recipesForDay) return <div>loading...</div>
    return (
        <div>
            {currentDay === null && <Button onClick={startClick}>START</Button>}
            <span>
                {currentDay !== null && currentDay !== 0
                    ? currentDay
                    : currentDay === 0
                    ? 'From tomorrow'
                    : 'Not started'}
            </span>
            <div>
                <Select
                    defaultValue={
                        WorkoutCategory.find(
                            (tr) => tr.id === currentWorkoutType
                        ).name
                    }
                    style={{ minWidth: 300 }}
                    onChange={handleWorkoutTypeChange}
                >
                    {WorkoutCategory.map((c) => (
                        <Option value={c.id} key={c.id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    defaultValue={
                        MenuCategory.find((tr) => tr.id === currentMenuType)
                            .name
                    }
                    style={{ minWidth: 300 }}
                    onChange={handleMenuTypeChange}
                >
                    {MenuCategory.map((c) => (
                        <Option value={c.id} key={c.id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>задачи на сегодня - todo</div>

            <div>
                Питание - общее число калорий{' '}
                {currentDay && currentDay > 0 ? (
                    <>
                        {Math.ceil(recipesForDay.calories)}
                        <RecipesWrapper>
                            <RecipeSmall recipe={recipesForDay.breakfast} />
                            <RecipeSmall recipe={recipesForDay.snack1} />
                            <RecipeSmall recipe={recipesForDay.lunch} />
                            <RecipeSmall recipe={recipesForDay.snack2} />
                            <RecipeSmall recipe={recipesForDay.dinner} />
                        </RecipesWrapper>
                    </>
                ) : (
                    <div>marathon is not started</div>
                )}
            </div>
            <div>
                Тренировки
                {currentDay && currentDay > 0 ? (
                    <>
                        {typeof workoutsForDay === 'string' ? (
                            <WorkoutBlocks bg>
                                <span>На сегодня нет тренировок</span>
                            </WorkoutBlocks>
                        ) : (
                            <WorkoutBlocks>
                                {workoutsForDay.warmUp && (
                                    <IMG>
                                        <img
                                            src="https://lerchek.fit/img/workout-1.707949b6.png"
                                            alt=""
                                        />
                                        <Text>Разминка</Text>
                                    </IMG>
                                )}
                                {workoutsForDay.mainPart && (
                                    <IMG>
                                        <img
                                            src="https://lerchek.fit/img/workout-2.da2af078.png"
                                            alt=""
                                        />
                                        <Text>Основная часть</Text>
                                    </IMG>
                                )}
                                {workoutsForDay.stretching && (
                                    <IMG>
                                        <a
                                            href={
                                                'workout/' + workoutsForDay._id
                                            }
                                        >
                                            <img
                                                src="https://lerchek.fit/img/workout-3.df64bc43.png"
                                                alt=""
                                            />
                                        </a>

                                        <Text>Растяжка</Text>
                                    </IMG>
                                )}
                            </WorkoutBlocks>
                        )}
                    </>
                ) : (
                    <div>marathon is not started</div>
                )}
            </div>
            <div>Трекеры - вода, шаги, сон</div>
        </div>
    )
}

const RecipesWrapper = styled.div`
    display: flex;
`
const IMG = styled.div`
    width: 280px;
    height: 400px;
    overflow: hidden;
    border-radius: 40px; //30
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    img {
        width: 110%;
        position: relative;
        bottom: -10px;
    }
`
const Text = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 22px;
    font-weight: 600;
`

const WorkoutBlocks = styled.div<{ bg?: boolean }>`
    display: flex;
    width: 100%;
    min-height: 400px;
    background: ${(props) => props.bg && 'white'};
    border-radius: ${(props) => props.bg && '40px'};
    align-items: ${(props) => props.bg && 'center'};
    justify-content: ${(props) => props.bg && 'center'};
`
