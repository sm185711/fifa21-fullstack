import { Grid, TextField } from '@mui/material'
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
} from 'formik'

const FormikComponent = () => {
	return (
		<form
			className='form'
			onSubmit={formik.handleSubmit}
		>
			{props.edit ? null : (
				<>
					<TextField
						className='input-box'
						id='player_id'
						type='number'
						label='Player ID'
						{...formik.getFieldProps('player_id')}
					/>
					<p className='error'>
						{formik.errors.player_id && formik.touched.player_id ? (
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
								type={field.type}
								label={field.label}
								{...formik.getFieldProps(field.id)}
							/>
							<p className='error'>
								{formik.errors[field.id] &&
								formik.touched[field.id] ? (
									<span>{formik.errors[field.id]}</span>
								) : null}
							</p>
						</Grid>
					)
				})}
			</Grid>
		</form>
	)
}
