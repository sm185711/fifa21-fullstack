import React, { useEffect, useState } from 'react'
import apis from '../api'
import Header from '../components/Header'
import PlayerForm from '../components/PlayerForm'
import PlayerCard from '../components/PlayerCard'
import Toaster from '../components/Toaster'

const Home = () => {
	// Render
	return (
		<div id='main'>
			<Header />
			<div className='player-cards'>
				<PlayerCard />
			</div>
			<div className='form-home'>
				<PlayerForm />
			</div>
			<Toaster />
		</div>
	)
}

export default Home
