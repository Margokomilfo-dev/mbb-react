import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createProduct,
    getProducts,
    getProductsByName,
    ProductReducerType,
} from '../redux/productReducer'
import { AllStateType } from '../redux/store'
import { Product } from './Product'
import styled from 'styled-components'
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { ProductCategory } from '../settings/types'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}
const { Option } = Select
const validateMessages = {
    required: '${label} is required!',
}

type PropsType = {}
export const Products = () => {
    const dispatch = useDispatch()
    const { products } = useSelector<AllStateType, ProductReducerType>(
        (state) => state.products
    )
    const [form] = Form.useForm()
    const [textareaValue, setTextareaValue] = useState<string>('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    console.log('form', form)
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
    //popup for Select
    function handleChangePopup(value) {
        console.log(value)
    }

    //fotInput
    function onChangeName(e: any) {
        setTextareaValue(e.target.value)
    }

    const onFinish = (values: any) => {
        console.log(values)
        dispatch(createProduct(values.product))
        setIsModalVisible(false)
        form.resetFields()
    }

    if (!products) {
        return <div>Loading...</div>
    }

    function confirm() {
        Modal.confirm({
            title: 'Добавление продукта',
            icon: <ExclamationCircleOutlined />,
            content: (
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['product', 'name']}
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['product', 'image']}
                        label="Image"
                        rules={[{ type: 'string', required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['product', 'calories']}
                        label="Calories"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['product', 'carbs']}
                        label="Carbs"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['product', 'fats']}
                        label="Fats"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['product', 'proteins']}
                        label="Proteins"
                        rules={[{ type: 'number', min: 0, required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['product', 'category']} label="Category">
                        <Select
                            defaultValue="Все"
                            style={{ minWidth: 220 }}
                            onChange={handleChangePopup}
                        >
                            {ProductCategory.map((p) => (
                                <Option value={p.id}>{p.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            ),
            okText: 'ok',
            cancelText: 'cancel',
        })
    }

    return (
        <Wrapper>
            <Header>
                <Select
                    defaultValue="Все"
                    style={{ minWidth: 220 }}
                    onChange={handleChange}
                >
                    {ProductCategory.map((p) => (
                        <Option value={p.id}>{p.name}</Option>
                    ))}
                </Select>

                <Input showCount maxLength={20} onChange={onChangeName} />
                <Button onClick={confirm}>add product</Button>
            </Header>

            <Blocks>
                {products.map((p) => (
                    <Product product={p} key={p._id} />
                ))}
            </Blocks>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    padding-top: 20px;
`
const Blocks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Header = styled.div`
    display: flex;
`
