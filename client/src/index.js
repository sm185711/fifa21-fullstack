import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {createTheme, ThemeProvider} from '@mui/material'

import './styles/styles.css'

const theme = createTheme({
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
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
