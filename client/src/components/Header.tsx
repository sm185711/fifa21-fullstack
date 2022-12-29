import React, { useState } from 'react'
import {
	Button,
	MenuItem,
	Select,
	TextField,
	Typography,
	CircularProgress,
	InputAdornment,
} from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector, useDispatch } from 'react-redux'
import { changeMetric, changeOrder, changeSearch } from '../redux/querySlice'

const Header = () => {
	const [searchLoading, setSearchLoading] = useState(false)

	const searchTerm = useSelector((state) => state.query.search)
	const metric = useSelector((state) => state.query.metric)
	const order = useSelector((state) => state.query.order)
	const dispatch = useDispatch()

	return (
		<nav>
			<a
				className='home-button'
				href='/'
			>
				<img
					className='logo'
					alt='FIFA 21 Logo'
					src='./../src/assets/logo.png'
				/>
				<Typography
					className='brand'
					variant='h5'
				>
					DATABASE
				</Typography>
			</a>
			<TextField
				type='text'
				id='search'
				variant='outlined'
				placeholder='Search'
				value={searchTerm}
				onChange={(e) => {
					dispatch(changeSearch(e.target.value))
				}}
				size='small'
				sx={{
					'& .MuiInputBase-root': {
						background: 'rgba(220, 220, 220, 0.5)',
						backdropFilter: 'blur(5px)',
						borderRadius: '50px',
						margin: '0px 20px',
						// width: '1000px',
						boxShadow:
							'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
					},
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position='end'>
							{searchLoading ? (
								<CircularProgress
									size={20}
									style={{
										position: 'relative',
										zIndex: '-1',
										color: 'black',
									}}
								/>
							) : (
								<span style={{ width: '20px' }} />
							)}
						</InputAdornment>
					),
				}}
			/>

			<div className='filter-buttons'>
				<Select
					id='metric'
					labelId='metric'
					placeholder='Metric'
					value={metric}
					onChange={(e) => {
						dispatch(changeMetric(e.target.value))
					}}
					className='select-dropdown'
				>
					<MenuItem value='overall'>Overall</MenuItem>
					<MenuItem value='name'>Name</MenuItem>
					<MenuItem value='age'>Age</MenuItem>
				</Select>

				<Select
					id='order'
					labelId='order'
					placeholder='Order'
					value={order}
					onChange={(e) => {
						dispatch(changeOrder(e.target.value))
					}}
					className='select-dropdown'
				>
					<MenuItem value='DESC'>Descending</MenuItem>
					<MenuItem value='ASC'>Ascending</MenuItem>
				</Select>

				<Button id='create-button'>
					<AddCircleOutlineRoundedIcon
						sx={{ color: 'black' }}
						fontSize='medium'
					/>
					Player
				</Button>
			</div>
		</nav>
	)
}

export default Header
