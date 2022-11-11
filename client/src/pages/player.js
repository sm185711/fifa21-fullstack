import React, {useState, useEffect} from 'react'
import PlayerForm from '../components/form'
import apis from '../api'
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const Player = ({id}) => {
    let [playerState, setPlayerState] = useState({
        playerData: {},
        togglEdit: false,
    })
    const [formOpen, setFormOpen] = useState(false)

    const updatePlayerData = async (id) => {
        apis.getPlayerById(id).then((response) => {
            setPlayerState({
                ...playerState,
                playerData: response.data[0],
            })
        })
    }

    useEffect(() => {
        if (!formOpen) {
            updatePlayerData(id)
        }
    }, [formOpen])

    useEffect(() => {
        updatePlayerData(id)
    }, [id])

    const handleEdit = () => {
        setFormOpen(true)
        setPlayerState({...playerState, toggleEdit: !playerState.toggleEdit})
    }

    const handleDelete = () => {
        apis.deletePlayerById(id).then((response) => {})
    }

    return (
        <Card
            variant="sm"
            sx={{
                boxShadow:
                    '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                background: 'rgba(220, 220, 220, 0.5)',
                backdropFilter: 'blur(5px)',
                width: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
            raised
        >
            <CardContent>
                <Typography variant="h4" sx={{margin: '20px'}}>
                    {playerState.playerData.name}
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1">
                            Overall:{' '}
                            <strong>{playerState.playerData.overall}</strong>
                        </Typography>
                    </li>

                    <li>
                        <Typography variant="body1">
                            Potential:{' '}
                            <strong>{playerState.playerData.potential}</strong>
                        </Typography>
                    </li>

                    <li>
                        <Typography variant="body1">
                            Age: <strong>{playerState.playerData.age}</strong>
                        </Typography>
                    </li>

                    <li>
                        <Typography variant="body1">
                            Nationality:{' '}
                            <strong>
                                {playerState.playerData.nationality}
                            </strong>
                        </Typography>
                    </li>

                    <li>
                        <Typography variant="body1">
                            Club: <strong>{playerState.playerData.team}</strong>
                        </Typography>
                    </li>

                    <li>
                        <Typography variant="body1">
                            Positions:{' '}
                            <strong>{playerState.playerData.position}</strong>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Hits: <strong>{playerState.playerData.hits}</strong>
                        </Typography>
                    </li>
                </ul>
                <CardActions
                    sx={{display: 'flex', justifyContent: 'space-between'}}
                >
                    <IconButton onClick={handleEdit}>
                        <EditIcon variant="outlined" className="button" />
                    </IconButton>

                    {playerState.toggleEdit ? (
                        <PlayerForm
                            playerData={playerState.playerData}
                            exist={true}
                            open={formOpen}
                            setOpen={setFormOpen}
                        />
                    ) : null}
                    <a href={`/`}>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon variant="outlined" className="button" />
                        </IconButton>
                    </a>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Player
