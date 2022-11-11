import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {createTheme, ThemeProvider} from '@mui/material'

import './styles/styles.css'

const theme = createTheme({
    typography: {
        fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont'].join(','),
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
