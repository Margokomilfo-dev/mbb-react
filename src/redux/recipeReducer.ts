import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, RandomRecipesForDay, RecipeType } from '../api/api'

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
        recipeMealType: 0,
        recipeMenuType: 0,
    } as RecipeReducerType,
    reducers: {
        setRecipeMealType(state, action: PayloadAction<{ type: number }>) {
            state.recipeMealType = action.payload.type
        },
        setRecipeMenuType(state, action: PayloadAction<{ type: number }>) {
            state.recipeMenuType = action.payload.type
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

export const { setRecipeMealType, setRecipeMenuType } = slice.actions
export const recipeReducer = slice.reducer

export type RecipeReducerType = {
    recipes: null | Array<RecipeType>
    recipe: null | RecipeType
    recipesForDay: null | RandomRecipesForDay
    recipeMealType: number
    recipeMenuType: number
}

export type IngredientType = {
    name: string
    count: number
}
