import React from 'react'
import { RecipeType } from '../api/api'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MealsCategory } from '../settings/types'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { IMG, Type, Type2 } from './common-styles/styles'

type PropsType = {
    recipe: RecipeType
}

export const RecipeSmall = (props: PropsType) => {
    return (
        <Wrapper>
            <NavLink to={`/recipe/${props.recipe._id}`}>
                <IMG>
                    <img src={props.recipe.image} alt="" />
                    <Type>
                        {
                            MealsCategory.find(
                                (m) => m.id === props.recipe.type
                            ).name
                        }
                    </Type>
                    {props.recipe.oven && <Type2>Д</Type2>}
                </IMG>
            </NavLink>
            <Block>
                <div>{Math.ceil(props.recipe.calories)} ккал</div>
                <Loved onClick={() => alert('сохраннено в любимые')}>
                    {!props.recipe.isFavorite ? (
                        <HeartOutlined />
                    ) : (
                        <HeartFilled />
                    )}
                </Loved>
            </Block>

            <Name>{props.recipe.name}</Name>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px; //150
    margin: 20px 10px 30px;
    line-height: 16px;
`

const Name = styled.div`
    font-weight: 700;
    font-size: 18px;
    margin: 6px 0;
`
const Block = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    align-items: center;
`

const Loved = styled.div`
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
`
