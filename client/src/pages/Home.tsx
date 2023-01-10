import Header from '../components/layout/Header'
import Toaster from '../components/ui/Toaster'
import Cards from '../components/elements/Cards'

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
