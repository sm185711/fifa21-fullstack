import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'
import App from './App'
import './index.css'

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
