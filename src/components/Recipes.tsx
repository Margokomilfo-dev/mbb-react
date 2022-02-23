import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import {
    MealsCategory,
    MenuCategory,
    MenuFor,
    ProductCategory,
} from '../settings/types'
import {
    getRecipesByMenuByType,
    getRecipesByType,
    RecipeReducerType,
} from '../redux/recipeReducer'
import { AllStateType } from '../redux/store'
import { RecipeSmall } from './RecipeSmall'

type PropsType = {
    // product: ProductType
}
const { Option } = Select
export const Recipes = (props: PropsType) => {
    const dispatch = useDispatch()
    const [menu, setMenu] = useState<number>(0)
    const [meal, setMeal] = useState<number>(0)
    const { recipes } = useSelector<AllStateType, RecipeReducerType>(
        (state) => state.recipes
    )
    useEffect(() => {
        if (!menu && !meal) {
            dispatch(getRecipesByType(0))
        } else dispatch(getRecipesByMenuByType({ menu, type: meal }))
    }, [menu, meal])

    const handleChangeMeals = (type) => {
        setMeal(type)
    }
    const handleChangeFor = (type) => {
        console.log(type)
    }
    const handleChangeMenu = (type) => {
        setMenu(type)
    }

    return (
        <Wrapper>
            <Selects>
                <Select
                    style={{ width: 300 }}
                    onChange={handleChangeMenu}
                    defaultValue={MenuCategory[0].name}
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
                    defaultValue={ProductCategory[0].name}
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
