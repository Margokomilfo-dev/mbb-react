import React from 'react'
import './App.css'
import { ProductType } from './api'

function App() {
    return <div className="App">hello world</div>
}

export default App

type PropsType = {
    product: ProductType
}

const Product = (props: PropsType) => {
    return (
        <div>
            <div>id: {props.product._id}</div>
            <div>name: {props.product.name}</div>
            <div>
                <img src={props.product.image} alt="" />
            </div>
            <span>calories: {props.product.calories}</span>
            <span>carbs: {props.product.carbs}</span>
            <span>proteins: {props.product.proteins}</span>
            <span>fats: {props.product.fats}</span>
        </div>
    )
}
