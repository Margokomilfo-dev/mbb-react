import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import { MealsCategory, MenuCategory, MenuFor } from '../settings/types'
import {
    getRecipesByMenuByType,
    RecipeReducerType,
    setRecipeMealType,
    setRecipeMenuType,
} from '../redux/recipeReducer'
import { AllStateType } from '../redux/store'
import { RecipeSmall } from './RecipeSmall'

type PropsType = {
    // product: ProductType
}
const { Option } = Select
export const Recipes = (props: PropsType) => {
    const dispatch = useDispatch()
    const { recipes, recipeMealType, recipeMenuType } = useSelector<
        AllStateType,
        RecipeReducerType
    >((state) => state.recipes)

    useEffect(() => {
        dispatch(
            getRecipesByMenuByType({
                menu: recipeMenuType,
                type: recipeMealType,
            })
        )
    }, [recipeMealType, recipeMenuType])

    const handleChangeMeals = (type) => {
        dispatch(setRecipeMealType({ type }))
    }
    const handleChangeFor = (type) => {
        console.log(type)
    }
    const handleChangeMenu = (type) => {
        dispatch(setRecipeMenuType({ type }))
    }

    return (
        <Wrapper>
            <Selects>
                <Select
                    style={{ width: 300 }}
                    onChange={handleChangeMenu}
                    defaultValue={
                        MenuCategory.find((menu) => menu.id === recipeMenuType)
                            .name
                    }
                >
                    {MenuCategory.map((p) => (
                        <Option value={p.id} key={p.id}>
                            {p.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 300 }}
                    onChange={handleChangeMeals}
                    defaultValue={
                        MealsCategory.find((t) => t.id === recipeMealType).name
                    }
                >
                    {MealsCategory.map((p) => (
                        <Option value={p.id} key={p.id}>
                            {p.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 300 }}
                    onChange={handleChangeFor}
                    defaultValue={MenuFor[0].name}
                >
                    {MenuFor.map((p) => (
                        <Option value={p.id} key={p.id}>
                            {p.name}
                        </Option>
                    ))}
                </Select>
            </Selects>

            <R>
                {recipes.map((r) => (
                    <RecipeSmall key={r._id} recipe={r} />
                ))}
            </R>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //width: 190px; //150
    margin: 20px 10px 30px;
`
const R = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`

const Selects = styled.div`
    display: flex;
    width: 100%;
`
