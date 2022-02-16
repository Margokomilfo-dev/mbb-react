import { appSettings } from './settings/app-settings'
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
    async createProduct(model: ModelType) {
        const res = await instance.post<Array<ProductType>>(`/product`, model)
        return res.data
    },
}

export type ProductType = {
    _id: string
    image: string
    carbs: number
    fats: number
    proteins: number
    calories: number
    name: string
    createdAt: string
    updatedAt: string
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
