import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AllStateType } from '../redux/store'
import styled from 'styled-components'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { getWorkoutsById, WorkoutReducerType } from '../redux/workoutReducer'

export const WorkoutBig = () => {
    let { id } = useParams<'id'>()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { workout } = useSelector<AllStateType, WorkoutReducerType>(
        (state) => state.workouts
    )
    useEffect(() => {
        dispatch(getWorkoutsById(id))
    }, [])
    if (!workout) return <div>loading...</div>
    return (
        <Wrapper>
            <Button onClick={() => navigate(-1)}>
                <LeftOutlined /> Назад{' '}
            </Button>
            <Blocks>
                {workout.entry && (
                    <Block>
                        <iframe
                            src={workout.entry.link}
                            frameBorder="0"
                            allowFullScreen
                        />
                        <div>
                            <div className={'title'}>Вступление</div>
                            <p
                                className={'danger'}
                                dangerouslySetInnerHTML={{
                                    __html: workout.entry.description,
                                }}
                            />
                        </div>
                    </Block>
                )}
                {workout.warmUp && (
                    <Block>
                        <iframe
                            src={workout.warmUp.link}
                            frameBorder="0"
                            allowFullScreen
                        />
                        <div>
                            <div className={'title'}>Разминка</div>
                            <p
                                className={'danger'}
                                dangerouslySetInnerHTML={{
                                    __html: workout.warmUp.description,
                                }}
                            />
                        </div>
                    </Block>
                )}
                <Block>
                    <div>
                        <iframe
                            width="500"
                            height="300"
                            src={workout.mainPart.link}
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                    <div>
                        <div className={'title'}>
                            {workout.warmUp
                                ? 'Основная часть'
                                : 'Разминка и основная часть'}
                        </div>
                        <p
                            className={'danger'}
                            dangerouslySetInnerHTML={{
                                __html: workout.mainPart.description,
                            }}
                        />
                    </div>
                </Block>
                {workout.stretching && (
                    <Block>
                        <iframe
                            width="300"
                            height="200"
                            src={workout.stretching.link}
                            frameBorder="0"
                            allowFullScreen
                        />
                        <div>
                            <div className={'title'}>Растяжка</div>
                            <p
                                className={'danger'}
                                dangerouslySetInnerHTML={{
                                    __html: workout.stretching.description,
                                }}
                            />
                        </div>
                    </Block>
                )}
            </Blocks>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 900px;
    margin: 0 auto;
`
const Blocks = styled.div`
    display: flex;
    flex-direction: column;
`
const Block = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 12px 36px rgb(0 0 0 / 6%);
    box-sizing: border-box;
    margin-top: 20px;
    iframe {
        width: 250px;
        height: 190px;
        margin-right: 20px;
    }
    .danger {
        padding-top: 20px;
    }
    .title {
        font-weight: 700;
        font-size: 22px;
        text-decoration: underline;
    }
`
