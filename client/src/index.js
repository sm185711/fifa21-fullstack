import React from 'react'
import ReactDOM from 'react-dom'
import {createTheme, ThemeProvider} from '@mui/material'

import './styles/styles.css'
import Home from './pages/Home'

export const theme = createTheme({
    typography: {
        fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont'].join(','),
        color: 'white',
    },
    palette: {
        type: 'light',
        primary: {
            main: '#209E2F',
        },
        secondary: {
            main: '#f50057',
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
