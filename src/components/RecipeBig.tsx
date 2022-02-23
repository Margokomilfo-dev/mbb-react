import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeById, RecipeReducerType } from '../redux/recipeReducer'
import { AllStateType } from '../redux/store'
import styled from 'styled-components'
import { Button } from 'antd'
import { HeartFilled, HeartOutlined, LeftOutlined } from '@ant-design/icons'
import { MenuCategory } from '../settings/types'

export const RecipeBig = () => {
    let { id } = useParams<'id'>()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { recipe } = useSelector<AllStateType, RecipeReducerType>(
        (state) => state.recipes
    )
    useEffect(() => {
        dispatch(getRecipeById(id))
    }, [])
    if (!recipe) return <div>loading...</div>
    return (
        <Wrapper>
            <Menu>
                <Button onClick={() => navigate(-1)}>
                    <LeftOutlined /> Назад{' '}
                </Button>
                <Loved onClick={() => alert('сохраннено в любимые')}>
                    {!recipe.isFavorite ? <HeartOutlined /> : <HeartFilled />}
                </Loved>
            </Menu>
            <Title>{recipe.name}</Title>
            <div>{MenuCategory.find((m) => m.id === recipe.menu).name}</div>
            <MainBlock>
                <Left>
                    <div>
                        <IMG>
                            {' '}
                            <img src={recipe.image} alt="" />
                        </IMG>

                        <Info>
                            <Block>
                                <span className={'num'}>
                                    {Math.ceil(recipe.calories)}
                                </span>
                                <span>ккал</span>
                            </Block>
                            <Block>
                                <span className={'num'}>
                                    {Math.ceil(recipe.proteins)}
                                </span>
                                <span>белки</span>
                            </Block>
                            <Block>
                                <span className={'num'}>
                                    {Math.ceil(recipe.fats)}
                                </span>
                                <span>жиры</span>
                            </Block>
                            <Block>
                                <span className={'num'}>
                                    {Math.ceil(recipe.carbs)}
                                </span>
                                <span>углеводы</span>
                            </Block>
                        </Info>
                    </div>
                </Left>
                <Right>
                    <div>
                        <h2>Ингредиенты</h2>
                        <ul>
                            {recipe.ingredients.map((i) => (
                                <li key={i._id}>
                                    {i.name} ({i.count ? i.count : '??'} гр.)
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Инструкция</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: recipe.description,
                            }}
                        ></p>
                    </div>
                </Right>
            </MainBlock>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 1100px;
    margin: 0 auto;
`
const Menu = styled.div`
    display: flex;
`
const Title = styled.div`
    font-size: 35px;
    font-weight: 700;
    padding: 20px 0;
`
const Left = styled.div`
    max-width: 550px;
`

const Right = styled.div`
    max-width: 550px;
`

const IMG = styled.div`
    overflow: hidden;
    border-radius: 40px; //30
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 20px;
    img {
        width: 100%;
        display: block;
    }
`
const Info = styled.div`
    display: flex;
    padding: 30px 50px;
    background: #fff;
    justify-content: space-between;
    border-radius: 30px;
`

const Block = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    .num {
        font-size: 30px;
        font-weight: 700;
    }
`
const MainBlock = styled.div`
    display: flex;
    justify-content: space-between;
`
const Loved = styled.div`
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
`
