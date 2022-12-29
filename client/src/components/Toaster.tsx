import React from 'react'

import { Snackbar, Alert } from '@mui/material'

const Toaster = () => {
	return (
		<div>
			<Snackbar
				autoHideDuration={6000}
				message='Form submitted successfully!'
			>
				<Alert
					severity='success'
					sx={{ width: '100%' }}
				>
					Player added/updated successfully!
				</Alert>
			</Snackbar>
			<Snackbar
				autoHideDuration={6000}
				message='Form could not be submitted.'
			>
				<Alert
					severity='error'
					sx={{ width: '100%' }}
				>
					There was an error!
				</Alert>
			</Snackbar>
			<Snackbar
				autoHideDuration={6000}
				message='Form could not be submitted.'
			>
				<Alert
					severity='success'
					sx={{ width: '100%' }}
				>
					Player deleted successfully!
				</Alert>
			</Snackbar>
		</div>
	)
}

export default Toaster
