import styled from 'styled-components'

export const IMG = styled.div`
    overflow: hidden;
    border-radius: 40px; //30
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 190px; //160
    margin-bottom: 10px;
    position: relative;
    img {
        width: 100%;
        display: block;
        object-fit: cover;
        height: 200px;
    }
`
export const Type = styled.div`
    position: absolute;
    background-color: #fff;
    border-radius: 15px;
    padding: 4px 8px;
    top: 10px;
    right: 20px;
    z-index: 1;
`

export const Type2 = styled.div`
    position: absolute;
    background-color: #fff;
    border-radius: 15px;
    padding: 4px 8px;
    top: 10px;
    left: 10px;
    z-index: 1;
`
