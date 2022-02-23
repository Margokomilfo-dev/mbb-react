import { appSettings } from '../settings/app-settings'
import axios from 'axios'

export let instance = axios.create({
    baseURL: appSettings.api.REACT_APP_API_BASE_URL,
})

export const api = {
    async getProducts(type: number = 0) {
        const res = await instance.get<Array<ProductType>>(
            `/product/type/${type}`
        )
        return res.data
    },
    async getProductByName(name: string) {
        const res = await instance.post<Array<ProductType>>(`/product/byName`, {
            name,
        })
        return res.data
    },
    async getRecipesByMealType(type: number = 0) {
        const res = await instance.get<Array<RecipeType>>(`/recipe/${type}`)
        return res.data
    },
    async getRecipesByMenuByMeal(menu: number = 0, type: number = 0) {
        const res = await instance.get<Array<RecipeType>>(
            `/recipe/${menu}/${type}`
        )
        return res.data
    },
    async getRecipeById(id: string) {
        const res = await instance.get<RecipeType>(`/recipe/get/id/${id}`)
        return res.data
    },
    async getWorkoutById(id: string) {
        const res = await instance.get<WorkoutType>(`/workout/${id}`)
        return res.data
    },
    async getWorkoutsByCategory(category: number) {
        const res = await instance.get<Array<WorkoutType>>(
            `/workout/category/${category}`
        )
        return res.data
    },

    async getWorkoutsByCategoryAndDay(category: number, day: number) {
        const res = await instance.get<string | WorkoutType>(
            `/marathon/workout/${category}/${day}`
        )
        return res.data
    },

    async getRecipesForDay(menuCategory: number, day: number) {
        const res = await instance.get<RandomRecipesForDay>(
            `/marathon/${menuCategory}/${day}`
        )
        return res.data
    },
}

export type ProductType = {
    _id: string
    image: string
    carbs: number
    fats: number
    category: number
    proteins: number
    calories: number
    name: string
    count?: number
    createdAt: string
    updatedAt: string
}
export type RecipeType = {
    calories: number
    carbs: number
    description: string
    fats: number
    image: string
    ingredients: Array<ProductType>
    isFavorite: boolean
    menu: number
    name: string
    proteins: number
    type: number
    _id: string
    oven: boolean
}
export type WorkoutType = {
    day: number
    entry: null | {
        link: string
        description: string
    }
    stretching: null | {
        link: string
        description: string
    }
    mainPart: null | {
        link: string
        description: string
    }
    warmUp: null | {
        link: string
        description: string
    }
    category: number
    _id: string
}

export type ModelType = {
    name: string
    category: number
    calories: number
    carbs: number
    fats: number
    proteins: number
    image: string
}
export type RandomRecipesForDay = {
    breakfast: RecipeType
    snack1: RecipeType
    lunch: RecipeType
    snack2: RecipeType
    dinner: RecipeType
    calories: number
}
