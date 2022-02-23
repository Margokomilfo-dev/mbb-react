import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, ProductType, RandomRecipesForDay, RecipeType } from '../api/api'

export const getRecipesByType = createAsyncThunk(
    'recipe/createRecipe',
    async (type: number, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getRecipesByMealType(type)
            return res
            // dispatch(setRecipesProducts)
        } catch (e) {
            return rejectWithValue('getRecipeByType - error')
        }
    }
)

export const getRecipesByMenuByType = createAsyncThunk(
    'recipe/getRecipesByMenuByMeal',
    async (
        param: { menu: number; type: number },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const res = await api.getRecipesByMenuByMeal(param.menu, param.type)
            return res
            // dispatch(setRecipesProducts)
        } catch (e) {
            return rejectWithValue('getRecipesByMenuByMeal - error')
        }
    }
)

export const getRecipeById = createAsyncThunk(
    'recipe/getRecipeById',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getRecipeById(id)
            return res
        } catch (e) {
            return rejectWithValue('getRecipeByType - error')
        }
    }
)
export const getRecipesForDay = createAsyncThunk(
    'recipe/getRandomRecipesForDay',
    async (
        param: { menu: number; day: number },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const res = await api.getRecipesForDay(param.menu, param.day)
            return res
        } catch (e) {
            return rejectWithValue('getRecipeByType - error')
        }
    }
)

const slice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: [],
        recipe: null,
        recipesForDay: null,
    } as RecipeReducerType,
    reducers: {
        setProduct_(state, action: PayloadAction<{ product: ProductType }>) {
            // state.recipesProducts.unshift(action.payload.product)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRecipesByType.fulfilled, (state, action) => {
            state.recipes = action.payload
        })
        builder.addCase(getRecipeById.fulfilled, (state, action) => {
            state.recipe = action.payload
        })
        builder.addCase(getRecipesByMenuByType.fulfilled, (state, action) => {
            state.recipes = action.payload
        })
        builder.addCase(getRecipesForDay.fulfilled, (state, action) => {
            state.recipesForDay = action.payload
        })
    },
})

export const { setProduct_ } = slice.actions
export const recipeReducer = slice.reducer

export type RecipeReducerType = {
    recipes: null | Array<RecipeType>
    recipe: null | RecipeType
    recipesForDay: null | RandomRecipesForDay
}

export type IngredientType = {
    name: string
    count: number
}
