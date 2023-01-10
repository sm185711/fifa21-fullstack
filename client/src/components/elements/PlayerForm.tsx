import React, { useState } from 'react'
import apis from '../../api'
import * as Yup from 'yup'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Button,
} from '@mui/material'

interface FormValues {
	player_id: number
	name: string
	nationality: string
	overall: number
	age: number
	hits: number
	potential: number
	team: string
	position: string
}

const validationSchema = Yup.object({
	player_id: Yup.number()
		.required('Sorry, this is required.')
		.typeError('Has to be an integer.')
		.min(0, 'Cannot be negative.'),
	// TODO: Check if ID is available

	name: Yup.string().required('Sorry, this is required.'),

	nationality: Yup.string().required('Sorry, this is required.'),

	position: Yup.string().required('Sorry, this is required.'),

	overall: Yup.number()
		.required('Sorry, this is required.')
		.typeError('Has to be an integer.')
		.max(100, 'Cannot excede 100.')
		.min(0, 'Cannot precede 0.'),

	age: Yup.number()
		.required('Sorry, this is required.')
		.typeError('Has to be an integer.')
		.min(0, 'Cannot be negative.'),

	hits: Yup.number()
		.required('Sorry, this is required.')
		.typeError('Has to be an integer.')
		.min(0, 'Cannot be negative.'),

	potential: Yup.number()
		.required('Sorry, this is required.')
		.typeError('Has to be an integer.')
		.max(100, 'Cannot excede 100.')
		.min(0, 'Cannot precede 0.'),

	team: Yup.string().required('Sorry, this is required.'),

	email: Yup.string()
		.email('Enter a valid email')
		.required('Email is required'),

	password: Yup.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
})

const initialValues = {
	player_id: -1,
	name: '',
	nationality: '',
	overall: '',
	age: '',
	hits: '',
	potential: '',
	team: '',
	position: '',
}

const formOnSubmit = (values: FormValues) => {
	apis.insertPlayer(values)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {})
}

const PlayerForm = (props: any) => {
	const [showForm, setShowForm] = useState(false)

	// Render
	return (
		<>
			<Dialog
				open={showForm}
				fullWidth
			>
				<DialogTitle>Create Player</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill all the fields below.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						className='button'
						type='submit'
						variant='outlined'
						sx={{ margin: '20px' }}
					>
						Cancel
					</Button>
					<Button
						className='button'
						type='submit'
						variant='outlined'
						sx={{ margin: '20px' }}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default PlayerForm
