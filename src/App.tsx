import React from 'react'
import { Products } from './components/Products'
import 'antd/dist/antd.css'
import styled from 'styled-components'

function App() {
    return (
        <div style={{ backgroundColor: '#f7f5f5' }}>
            <Wrapper>
                <Products />
            </Wrapper>
        </div>
    )
}

export default App

const Wrapper = styled.div`
    max-width: 1100px;
    margin: 0 auto;
`
