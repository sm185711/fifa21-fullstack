import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:8080/',
})

export const getPlayers = (metric, order, searchTerm, payload) => {
	if (searchTerm === '') {
		return api.get(`/getplayers/${metric}/${order}/--`, payload)
	}
	return api.get(`/getplayers/${metric}/${order}/${searchTerm}`, payload)
}
export const insertPlayer = (payload) => api.post(`/createplayer`, payload)
export const updatePlayerById = (id, payload) =>
	api.put(`/updateplayer/${id}`, payload)
export const deletePlayerById = (id) => api.delete(`/playerid/${id}`)
export const getPlayerById = (id) => api.get(`/playerid/${id}`)

const apis = {
	getPlayers,
	insertPlayer,
	updatePlayerById,
	deletePlayerById,
	getPlayerById,
}

export default apis
