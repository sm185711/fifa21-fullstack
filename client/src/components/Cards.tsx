import { useEffect, useState } from 'react'
import apis from '../api'
import PlayerCard from './PlayerCard'
import { useSelector } from 'react-redux'

const Cards = () => {
	const [records, setRecords] = useState([])

	const searchTerm = useSelector((state) => state.query.search)
	const metric = useSelector((state) => state.query.metric)
	const order = useSelector((state) => state.query.order)

	const fetchPlayers = () => {
		apis.getPlayers(metric, order, searchTerm).then((response) => {
			setRecords(response.data)
		})
	}

	useEffect(() => {
		fetchPlayers()
	}, [])

	return (
		<>
			{records.map((player, idx) => {
				return (
					<PlayerCard
						data={player}
						key={idx}
					/>
				)
			})}
		</>
	)
}

export default Cards
