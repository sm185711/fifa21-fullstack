import Header from '../components/Header'
import Toaster from '../components/Toaster'
import Cards from '../components/Cards'

const Home = () => {
	// Render
	return (
		<div id='main'>
			<Header />
			<div className='player-cards'>
				<Cards />
			</div>
			<Toaster />
		</div>
	)
}

export default Home
