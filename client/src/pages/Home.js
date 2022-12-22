import React, {useEffect, useState} from 'react'
import apis from '../api'
import PlayerForm from '../components/PlayerForm'
import Player from '../components/PlayerCard'
import Header from '../components/Header'
import Toaster from '../components/Toaster'

const Home = () => {
    // States
    const [homeState, setHomeState] = useState({
        data: [],
        searchLoading: false,
        metric: 'overall',
        order: 'DESC',
        searchTerm: '--',
        toggleCreate: false,
        cardLoading: true,
    })

    const [formOpen, setFormOpen] = useState(false)
    const [toasterOpen, setToasterOpen] = useState({
        success: false,
        error: false,
        delete: false,
    })

    // Helper Functions
    const handleToasterClose = () => {
        setToasterOpen({success: false, error: false, delete: false})
    }

    const fetchPlayers = async () => {
        setHomeState({...homeState, searchLoading: true})
        apis.getPlayers(
            homeState.metric,
            homeState.order,
            homeState.searchTerm
        ).then((response) => {
            // setTimeout(
            //     () =>
            //         setHomeState({
            //             ...homeState,
            //             data: response.data,
            //             searchLoading: false,
            //         }),
            //     1000
            // )
            setHomeState({
                ...homeState,
                data: response.data,
                searchLoading: false,
            })
        })
    }

    // LifeCycle
    useEffect(() => {
        fetchPlayers()
    }, [homeState.metric, homeState.order, homeState.toggleCreate])

    useEffect(() => {
        if (homeState.searchTerm.length >= 3) {
            fetchPlayers()
        }
    }, [homeState.searchTerm])

    // Render
    return (
        <div id="main">
            <Header
                homeState={homeState}
                setHomeState={setHomeState}
                setFormOpen={setFormOpen}
            />
            <div className="player-cards">
                {homeState.data.length > 0 ? (
                    homeState.data.map((player, idx) => (
                        <Player
                            id={player.player_id}
                            playerData={player}
                            setToasterOpen={setToasterOpen}
                            toasterOpen={toasterOpen}
                            key={idx}
                        />
                    ))
                ) : (
                    <div>No players found.</div>
                )}
            </div>
            {homeState.toggleCreate ? (
                <div className="form-home">
                    <PlayerForm
                        exist={false}
                        open={formOpen}
                        setOpen={setFormOpen}
                        setToasterOpen={setToasterOpen}
                        toasterOpen={toasterOpen}
                    />
                </div>
            ) : null}
            <Toaster
                toasterOpen={toasterOpen}
                handleToasterClose={handleToasterClose}
            />
        </div>
    )
}

export default Home
