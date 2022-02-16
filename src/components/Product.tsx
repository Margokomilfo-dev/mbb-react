import React from 'react'
import { ProductType } from '../api'
import styled from 'styled-components'

type PropsType = {
    product: ProductType
}

export const Product = (props: PropsType) => {
    return (
        <Wrapper>
            <IMG>
                <img src={props.product.image} alt="" />
            </IMG>
            {/*<div>id: {props.product._id}</div>*/}
            <div>{props.product.calories} ккал</div>
            <Name>{props.product.name}</Name>
            <Info>
                <Element>
                    <span className={'name'}>Б</span>
                    <span>{props.product.proteins}г.</span>
                </Element>
                <Element>
                    <span className={'name'}>Ж</span>
                    <span>{props.product.fats}г.</span>
                </Element>
                <Element>
                    <span className={'name'}>У</span>
                    <span>{props.product.carbs}г.</span>
                </Element>
            </Info>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px; //150
    margin: 20px 10px 30px;
`

const IMG = styled.div`
    overflow: hidden;
    border-radius: 40px; //30
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
    height: 190px; //160
    margin-bottom: 10px;
    img {
        width: 100%;
        display: block;
    }
`
const Name = styled.div`
    font-weight: 700;
    font-size: 18px;
    margin: 6px 0;
`

const Info = styled.div`
    display: flex;
    margin-top: 5px;
    justify-content: flex-start;
    align-items: center;
`
const Element = styled.div`
    margin-right: 20px;
    .name {
        font-weight: 500;
        line-height: 1;
        color: #000;
        width: 25px;
        height: 25px;
        border-radius: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3px;
    }
`
