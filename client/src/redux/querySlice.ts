import { createSlice } from '@reduxjs/toolkit'

export const querySlice = createSlice({
	name: 'query',
	initialState: {
		search: '',
		metric: 'overall',
		order: 'DESC',
	},
	reducers: {
		changeSearch: (state, action) => {
			state.search = action.payload
		},
		changeOrder: (state, action) => {
			state.order = action.payload
		},
		changeMetric: (state, action) => {
			state.metric = action.payload
		},
	},
})

export const { changeMetric, changeOrder, changeSearch } = querySlice.actions

export default querySlice.reducer
