import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Home from './components/home'
import Player from './components/player'
import Layout from './components/layout'

const RoutesComponent = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/player/:id" element={<Player />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Layout>
    </BrowserRouter>
)

export default RoutesComponent
