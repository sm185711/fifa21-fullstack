import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PlayerForm from './form'
import apis from '../api'

const Player = () => {
    const {id} = useParams()
    let [playerState, setPlayerState] = useState({
        playerData: {},
        togglEdit: false,
    })

    useEffect(() => {
        apis.getPlayerById(id).then((response) => {
            setPlayerState({
                ...playerState,
                playerData: response.data[0],
            })
        })
    }, [])

    const handleEdit = () => {
        setPlayerState({...playerState, toggleEdit: !playerState.toggleEdit})
    }

    const handleDelete = () => {
        apis.deletePlayerById(id).then((response) => {})
    }

    return (
        <div className="player-data">
            <div className="card-2">
                <h3>{playerState.playerData.name}</h3>
                <ul>
                    <li>
                        <span>
                            Overall:{' '}
                            <strong>{playerState.playerData.overall}</strong>
                        </span>
                    </li>

                    <li>
                        <span>
                            Potential:{' '}
                            <strong>{playerState.playerData.potential}</strong>
                        </span>
                    </li>

                    <li>
                        <span>Age: </span>
                        <span>{playerState.playerData.age}</span>
                    </li>

                    <li>
                        <span>Nationality: </span>
                        <span>{playerState.playerData.nationality}</span>
                    </li>

                    <li>
                        <span>Club: </span>
                        <span>{playerState.playerData.team}</span>
                    </li>

                    <li>
                        <span>Positions: </span>
                        <span>{playerState.playerData.position}</span>
                    </li>
                    <li>
                        <span>Hits: </span>
                        <span>{playerState.playerData.hits}</span>
                    </li>
                </ul>
                <button className="button" onClick={handleEdit}>
                    Edit Player
                </button>
                {playerState.toggleEdit ? (
                    <PlayerForm
                        playerData={playerState.playerData}
                        exist={true}
                    />
                ) : null}
                <a href={`/`}>
                    <button className="button" onClick={handleDelete}>
                        Delete Player
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Player
