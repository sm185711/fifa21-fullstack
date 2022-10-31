import React, {useEffect, useState} from 'react'
import apis from '../api'
import PlayerForm from './form'

const Home = () => {
    const [homeState, setHomeState] = useState({
        data: [],
        loading: false,
        metric: 'overall',
        order: 'DESC',
        searchTerm: '--',
        toggleCreate: false,
    })

    const handleSort = (value) => {
        setHomeState({...homeState, metric: value.target.value})
    }

    const handleOrder = (value) => {
        setHomeState({...homeState, order: value.target.value})
    }

    const handleSearch = (value) => {
        if (value.target.value !== '') {
            setHomeState({...homeState, searchTerm: value.target.value})
        } else {
            setHomeState({...homeState, searchTerm: '--'})
        }
    }

    const handleCreate = () => {
        setHomeState({...homeState, toggleCreate: !homeState.toggleCreate})
    }

    useEffect(() => {
        setHomeState({...homeState, loading: true})
        apis.getPlayers(
            homeState.metric,
            homeState.order,
            homeState.searchTerm
        ).then((response) => {
            setHomeState({...homeState, data: response.data, loading: false})
        })
    }, [])

    useEffect(() => {
        setHomeState({...homeState, loading: true})
        apis.getPlayers(
            homeState.metric,
            homeState.order,
            homeState.searchTerm
        ).then((response) => {
            setHomeState({...homeState, data: response.data, loading: false})
        })
    }, [
        homeState.metric,
        homeState.order,
        homeState.searchTerm,
        homeState.toggleCreate,
    ])

    return (
        <>
            <select className='select' id="metric" onChange={handleSort}>
                <option value="overall" defaultValue={true}>
                    Overall
                </option>
                <option value="name">Name</option>
                <option value="age">Age</option>
            </select>

            <select className='select' id="order" onChange={handleOrder}>
                <option value="DESC" defaultValue={true}>
                    Descending
                </option>
                <option value="ASC">Ascending</option>
            </select>

            <input className='search-bar' type="text" placeholder="Search" onChange={handleSearch} />

            <div className="card-list">
                {homeState.data.length > 0
                    ? homeState.data.map((player) => (
                          <div key={player.player_id}>
                              <a href={`/player/${player.player_id}`}>
                                  <div className="card">
                                      <div className="card-header">
                                          <div className='card-name'>{player.name}</div>
                                          <div className='card-desc'>{player.team}</div>
                                      </div>
                                  </div>
                              </a>
                          </div>
                      ))
                    : 
                    <div>No players found.</div>
                    }
            </div>

            <button className='button' onClick={handleCreate}>Create New Player</button>

            {homeState.toggleCreate ? <div className='form-home'><PlayerForm exist={false} /></div> : null}
        </>
    )
}

export default Home
