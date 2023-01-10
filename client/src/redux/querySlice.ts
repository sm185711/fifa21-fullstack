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

export type queryType = {
	search: string
	metric: string
	order: string
}

export default querySlice.reducer
