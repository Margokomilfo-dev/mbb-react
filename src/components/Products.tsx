import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProducts,
    getProductsByName,
    ProductReducerType,
} from '../redux/productReducer'
import { AllStateType } from '../redux/store'
import { Product } from './Product'
import styled from 'styled-components'
import { Input, Select } from 'antd'
import { ProductCategory } from '../settings/types'

const { Option } = Select

export const Products = () => {
    const dispatch = useDispatch()
    const { products } = useSelector<AllStateType, ProductReducerType>(
        (state) => state.products
    )
    const [textareaValue, setTextareaValue] = useState<string>('')

    useEffect(() => {
        dispatch(getProducts(0))
    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(getProductsByName({ name: textareaValue }))
        }, 1000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [textareaValue])

    //get product by Name
    function handleChange(value) {
        console.log(value)
        dispatch(getProducts(+value))
    }
    //fotInput
    function onChangeName(e: any) {
        setTextareaValue(e.target.value)
    }

    if (!products) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Header>
                <Select
                    defaultValue="Все"
                    style={{ minWidth: 220 }}
                    onChange={handleChange}
                >
                    {ProductCategory.map((p) => (
                        <Option value={p.id} key={p.id}>
                            {p.name}
                        </Option>
                    ))}
                </Select>

                <Input showCount maxLength={20} onChange={onChangeName} />
            </Header>

            <Blocks>
                {products.map((p) => (
                    <Product product={p} key={p._id} />
                ))}
            </Blocks>
        </>
    )
}

const Blocks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Header = styled.div`
    display: flex;
`
