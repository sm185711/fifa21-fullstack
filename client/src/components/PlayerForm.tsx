import React, { useState } from 'react'
import { useFormik } from 'formik'
import apis from '../api'
import * as Yup from 'yup'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	Button,
	Grid,
} from '@mui/material'
import { formFields } from '../constants/formFields'

const PlayerForm = (props) => {
	// State
	const [formState, setFormState] = useState({ available: false })

	// Form Setup
	const formik = useFormik({
		initialValues: {
			player_id: props.exist ? 0 : '',
			name: props.exist ? props.playerData.name : '',
			nationality: props.exist ? props.playerData.nationality : '',
			overall: props.exist ? props.playerData.overall : '',
			age: props.exist ? props.playerData.age : '',
			hits: props.exist ? props.playerData.hits : '',
			potential: props.exist ? props.playerData.potential : '',
			team: props.exist ? props.playerData.team : '',
			position: props.exist ? props.playerData.position : '',
		},

		validationSchema: Yup.object({
			player_id: Yup.number()
				.required('Sorry, this is required.')
				.typeError('Has to be an integer.')
				.min(0, 'Cannot be negative.')
				.test('player_id-exists', 'The ID is unavailable', (value) => {
					if (value === undefined) {
						return false
					}

					apis.getPlayerById(value).then((response) => {
						if (response.data.length > 0) {
							setFormState({ available: false })
						} else {
							setFormState({ available: true })
						}
					})
					if (props.exist) {
						return (
							formState.available ||
							value === props.playerData.player_id
						)
					} else {
						return formState.available
					}
				}),

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
		}),

		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2))
			props.exist
				? apis
						.updatePlayerById(props.playerData.player_id, values)
						.then((response) => {
							console.log(response.data)
							props.setToasterOpen({
								...props['toasterOpen'],
								success: true,
							})
						})
						.catch((error) => {
							props.setToasterOpen({
								...props['toasterOpen'],
								error: true,
							})
						})
				: apis
						.insertPlayer(values)
						.then((response) => {
							console.log(response.data)
							props.setToasterOpen({
								...props['toasterOpen'],
								success: true,
							})
						})
						.catch((error) => {
							props.setToasterOpen({
								...props['toasterOpen'],
								error: true,
							})
						})
			handleClose()
		},
	})

	// Helper Functions
	const handleClose = () => {
		props.setOpen(false)
	}

	// Render
	return (
		<>
			<Dialog
				open={props.open}
				onClose={handleClose}
				fullWidth
			>
				<DialogTitle>
					{props.exist ? 'Edit' : 'Create'} Player
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill all the fields below.
					</DialogContentText>
					<form
						className='form'
						onSubmit={formik.handleSubmit}
					>
						{props.exist ? null : (
							<>
								<TextField
									className='input-box'
									id='player_id'
									name='player_id'
									type='number'
									label='Player ID'
									{...formik.getFieldProps('player_id')}
								/>
								<p className='error'>
									{formik.errors.player_id &&
									formik.touched.player_id ? (
										<span>{formik.errors.player_id}</span>
									) : null}
								</p>
							</>
						)}
						<Grid
							container
							spacing={2}
						>
							{formFields.map((field, idx) => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										key={idx}
									>
										<TextField
											className='input-box'
											id={field.id}
											name={field.id}
											type={field.type}
											label={field.label}
											{...formik.getFieldProps(field.id)}
										/>
										<p className='error'>
											{formik.errors[field.id] &&
											formik.touched[field.id] ? (
												<span>
													{formik.errors[field.id]}
												</span>
											) : null}
										</p>
									</Grid>
								)
							})}
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						className='button'
						type='submit'
						variant='outlined'
						onClick={handleClose}
						sx={{ margin: '20px' }}
					>
						Cancel
					</Button>
					<Button
						className='button'
						type='submit'
						variant='outlined'
						onClick={formik.handleSubmit}
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
