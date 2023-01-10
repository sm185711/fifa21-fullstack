import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080/',
})

export const getPlayers = (
	metric: string,
	order: string,
	searchTerm: string,
	payload: object
) => {
	if (searchTerm === '') {
		return api.get(`/getplayers/${metric}/${order}/--`, payload)
	}
	return api.get(`/getplayers/${metric}/${order}/${searchTerm}`, payload)
}
export const insertPlayer = (payload: object) =>
	api.post(`/createplayer`, payload)
export const updatePlayerById = (id: number, payload: object) =>
	api.put(`/updateplayer/${id}`, payload)
export const deletePlayerById = (id: number) => api.delete(`/playerid/${id}`)
export const getPlayerById = (id: number) => api.get(`/playerid/${id}`)

const apis = {
	getPlayers,
	insertPlayer,
	updatePlayerById,
	deletePlayerById,
	getPlayerById,
}

export default apis
