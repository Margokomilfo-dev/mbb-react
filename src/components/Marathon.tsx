import { useDispatch, useSelector } from 'react-redux'
import { AllStateType } from '../redux/store'
import { getRecipesForDay, RecipeReducerType } from '../redux/recipeReducer'
import { useEffect } from 'react'
import { RecipeSmall } from './RecipeSmall'
import styled from 'styled-components'
import {
    getWorkoutsByCategoryAndByDay,
    WorkoutReducerType,
} from '../redux/workoutReducer'

export const Marathon = () => {
    const { recipesForDay } = useSelector<AllStateType, RecipeReducerType>(
        (state) => state.recipes
    )
    const { workoutsForDay } = useSelector<AllStateType, WorkoutReducerType>(
        (state) => state.workouts
    )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRecipesForDay({ menu: 2, day: 2 }))
        dispatch(getWorkoutsByCategoryAndByDay({ category: 5, day: 2 }))
    }, [])

    if (!recipesForDay) return <div>loading...</div>
    return (
        <div>
            <div>задачи на сегодня - todo</div>

            <div>
                Питание - общее число калорий{' '}
                {Math.ceil(recipesForDay.calories)}
                <RecipesWrapper>
                    <RecipeSmall recipe={recipesForDay.breakfast} />
                    <RecipeSmall recipe={recipesForDay.snack1} />
                    <RecipeSmall recipe={recipesForDay.lunch} />
                    <RecipeSmall recipe={recipesForDay.snack2} />
                    <RecipeSmall recipe={recipesForDay.dinner} />
                </RecipesWrapper>
            </div>
            <div>
                Тренировки
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
                                <a href={'workout/' + workoutsForDay._id}>
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
