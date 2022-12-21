import React, {useState, useEffect} from 'react'
import PlayerForm from './PlayerForm'
import apis from '../api'
import {
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ConfirmationDialog from './ConfirmationDialog'
import {formFields} from '../constants/formFields'

const PlayerCard = ({id, playerData, toasterOpen, setToasterOpen}) => {
    // States
    let [playerState, setPlayerState] = useState({
        playerData: playerData,
        togglEdit: false,
    })
    const [formOpen, setFormOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const updatePlayerData = async (id) => {
        setLoading(true)
        apis.getPlayerById(id)
            .then((response) => {
                setPlayerState({
                    ...playerState,
                    playerData: response.data[0],
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // Helper Functions
    const handleDelete = () => {
        apis.deletePlayerById(id)
            .then((response) => {
                console.log('Player Deleted!')
                setToasterOpen({...toasterOpen, delete: true})
            })
            .catch((error) => {
                setToasterOpen({...toasterOpen, error: true})
            })
        handleConfirmationClose()
    }

    const handleConfirmationOpen = () => {
        setConfirmationOpen(true)
    }

    const handleConfirmationClose = () => {
        setConfirmationOpen(false)
    }

    const handleEdit = () => {
        setFormOpen(true)
        setPlayerState({...playerState, toggleEdit: !playerState.toggleEdit})
    }

    // Lifecycle
    useEffect(() => {
        if (!formOpen) {
            updatePlayerData(id)
        }
    }, [formOpen])

    // Render
    return (
        <>
            <Card variant="sm" id="card-main" raised>
                <CardContent>
                    {loading ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '412px',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress />
                        </div>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{margin: '20px'}}>
                                {playerState.playerData.name}
                            </Typography>
                            <ul>
                                {formFields.map((field) => {
                                    if (field.id !== 'name') {
                                        return (
                                            <li>
                                                <Typography variant="body1">
                                                    {`${field.label}: `}
                                                    <strong>
                                                        {
                                                            playerState
                                                                .playerData[
                                                                field.id
                                                            ]
                                                        }
                                                    </strong>
                                                </Typography>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                id="card-actions"
                            >
                                <IconButton onClick={handleEdit}>
                                    <EditIcon
                                        variant="outlined"
                                        className="button"
                                    />
                                </IconButton>

                                {playerState.toggleEdit ? (
                                    <PlayerForm
                                        playerData={playerState.playerData}
                                        exist={true}
                                        open={formOpen}
                                        setOpen={setFormOpen}
                                        setToasterOpen={setToasterOpen}
                                        toasterOpen={toasterOpen}
                                    />
                                ) : null}
                                <IconButton onClick={handleConfirmationOpen}>
                                    <DeleteIcon
                                        variant="outlined"
                                        className="button"
                                    />
                                </IconButton>
                            </CardActions>
                        </>
                    )}
                </CardContent>
            </Card>
            {confirmationOpen ? (
                <ConfirmationDialog
                    open={confirmationOpen}
                    handleClose={handleConfirmationClose}
                    handleSubmit={handleDelete}
                />
            ) : null}
        </>
    )
}

export default PlayerCard
