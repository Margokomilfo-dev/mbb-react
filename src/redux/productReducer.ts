import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api, ProductType } from '../api/api'

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (type: number, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getProducts(type)
            return { products: res }
        } catch (e) {
            return rejectWithValue('authMe - error')
        }
    }
)

export const getProductsByName = createAsyncThunk(
    'product/getProductsByName',
    async ({ name }: { name: string }, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.getProductByName(name)
            return { products: res }
        } catch (e) {
            return rejectWithValue('getProductsByType - error')
        }
    }
)

const slice = createSlice({
    name: 'app',
    initialState: {
        products: [],
        product: null,
    } as ProductReducerType,
    reducers: {
        setMessage(state, action: PayloadAction<{ text: string }>) {
            // state.message = action.payload.text
        },
        setAppStatus(
            state,
            action: PayloadAction<{ status: 'open' | 'close' }>
        ) {
            // state.appStatus = action.payload.status
        },
        setLoading(state, action: PayloadAction<{ loading: boolean }>) {
            // state.appLoading = action.payload.loading
        },
        setAppError(
            state,
            action: PayloadAction<{ errorText: null | string }>
        ) {
            // state.appError = action.payload.errorText
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.products
        })
        builder.addCase(getProductsByName.fulfilled, (state, action) => {
            state.products = action.payload.products
        })
    },
})

export const { setLoading } = slice.actions
export const productReducer = slice.reducer

export type ProductReducerType = {
    products: Array<ProductType>
    product: null | ProductType
}
