import React, { useState, useEffect } from 'react'
import PlayerForm from './PlayerForm'
import apis from '../api'
import {
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	IconButton,
	Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ConfirmationDialog from './ConfirmationDialog'
import { formFields } from '../constants/formFields'

const PlayerCard = () => {
	const [loading, setLoading] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [confirmationOpen, setConfirmationOpen] = useState(false)

	// Render
	return (
		<>
			<Card
				variant='sm'
				id='card-main'
				raised
			>
				<CardContent>
					{loading ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								height: '412px',
								alignItems: 'center',
							}}
						>
							<CircularProgress />
						</div>
					) : (
						<>
							<Typography
								variant='h4'
								sx={{ margin: '20px' }}
							>
								Cristiano Ronaldo
							</Typography>
							<ul>
								{formFields.map((field) => {
									if (field.id !== 'name') {
										return (
											<li>
												<Typography variant='body1'>
													{`${field.label}: `}
													<strong>07</strong>
												</Typography>
											</li>
										)
									}
								})}
							</ul>
							<CardActions
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
								id='card-actions'
							>
								<IconButton>
									<EditIcon
										variant='outlined'
										className='button'
									/>
								</IconButton>

								{editMode ? <PlayerForm /> : null}
								<IconButton>
									<DeleteIcon
										variant='outlined'
										className='button'
									/>
								</IconButton>
							</CardActions>
						</>
					)}
				</CardContent>
			</Card>
			{confirmationOpen ? <ConfirmationDialog /> : null}
		</>
	)
}

export default PlayerCard
