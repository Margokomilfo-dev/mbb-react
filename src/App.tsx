import React, { useEffect, useState } from 'react'
import { Products } from './components/Products'
import 'antd/dist/antd.css'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Recipes } from './components/Recipes'
import { RecipeBig } from './components/RecipeBig'
import { Workouts } from './components/Workouts'
import { WorkoutBig } from './components/WorkoutBig'
import { Marathon } from './components/Marathon'
import { useDispatch } from 'react-redux'
import {
    setCurrentDate,
    setCurrentMenuType,
    setCurrentWorkoutType,
} from './redux/marathonReducer'

function App() {
    const [current, setCurrent] = useState<string>('products')
    const dispatch = useDispatch()
    const handleClick = (e: any) => {
        // @ts-ignore
        setCurrent({ current: e.key })
    }
    useEffect(() => {
        const menuType = localStorage.getItem('menuType')
        const workoutType = localStorage.getItem('workoutType')
        const started = localStorage.getItem('started')
        if (menuType && workoutType) {
            dispatch(setCurrentMenuType({ type: +menuType }))
            dispatch(setCurrentWorkoutType({ type: +workoutType }))
        }
        if (started) {
            const date = new Date(started)
            const dayCount = new Date().getDay() - date.getDay()
            if (dayCount <= 28) {
                dispatch(setCurrentDate({ day: dayCount + 2 }))
            } else dispatch(setCurrentDate({ day: null }))
        }
    }, [])
    return (
        <div style={{ backgroundColor: '#f7f5f5' }}>
            <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
            >
                <Menu.Item key="products" icon={<MailOutlined />}>
                    <NavLink to={'products'}>Products</NavLink>
                </Menu.Item>
                <Menu.Item key="sport" icon={<AppstoreOutlined />}>
                    <NavLink to={'workouts'}>Sport</NavLink>
                </Menu.Item>

                <Menu.Item key="recipe" icon={<AppstoreOutlined />}>
                    <NavLink to={'recipe'}>Recipe</NavLink>
                </Menu.Item>
                <Menu.Item key="go" icon={<AppstoreOutlined />}>
                    <NavLink to={'go'}>Marathon</NavLink>
                </Menu.Item>
            </Menu>
            <R>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/recipe" element={<Recipes />} />
                    <Route path="/recipe/:id" element={<RecipeBig />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/workout/:id" element={<WorkoutBig />} />
                    <Route path="/go" element={<Marathon />} />
                </Routes>
            </R>
        </div>
    )
}

export default App

const R = styled.div`
    min-height: calc(100vh - 50px);
    width: 1100px;
    margin: 20px auto;
`
