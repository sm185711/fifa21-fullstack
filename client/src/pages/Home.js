import {
    Alert,
    Button,
    MenuItem,
    Select,
    TextField,
    Snackbar,
    Typography,
    CircularProgress,
    InputAdornment,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import apis from '../api'
import PlayerForm from '../components/PlayerForm'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import SearchIcon from '@mui/icons-material/Search'
import Player from '../components/PlayerCard'

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
        setFormOpen(true)
        setHomeState({...homeState, toggleCreate: !homeState.toggleCreate})
    }

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
            <nav>
                <a className="home-button" href="/">
                    <img className="logo" alt="FIFA 21 Logo" src="logo.png" />
                    <Typography className="brand" variant="h5">
                        DATABASE
                    </Typography>
                </a>
                <TextField
                    type="text"
                    id="search"
                    onChange={handleSearch}
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    sx={{
                        '& .MuiInputBase-root': {
                            background: 'rgba(220, 220, 220, 0.5)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '50px',
                            margin: '0px 20px',
                            // width: '1000px',
                            boxShadow:
                                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {homeState.searchLoading ? (
                                    <CircularProgress
                                        size={20}
                                        style={{
                                            position: 'relative',
                                            zIndex: '-1',
                                            color: 'black',
                                        }}
                                    />
                                ) : (
                                    <span style={{width: '20px'}} />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

                <div className="filter-buttons">
                    <Select
                        id="metric"
                        onChange={handleSort}
                        labelId="metric"
                        value={homeState.metric}
                        placeholder="Metric"
                        className="select-dropdown"
                    >
                        <MenuItem value="overall" defaultValue={true}>
                            Overall
                        </MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="age">Age</MenuItem>
                    </Select>

                    <Select
                        id="order"
                        onChange={handleOrder}
                        labelId="order"
                        value={homeState.order}
                        placeholder="Order"
                        className="select-dropdown"
                    >
                        <MenuItem value="DESC" defaultValue={true}>
                            Descending
                        </MenuItem>
                        <MenuItem value="ASC">Ascending</MenuItem>
                    </Select>

                    <Button id="create-button" onClick={handleCreate}>
                        <AddCircleOutlineRoundedIcon
                            sx={{color: 'black'}}
                            fontSize="medium"
                        />
                        Player
                    </Button>
                </div>
            </nav>
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
            <div>
                <Snackbar
                    open={toasterOpen.success}
                    autoHideDuration={6000}
                    onClose={handleToasterClose}
                    message="Form submitted successfully!"
                >
                    <Alert
                        onClose={handleToasterClose}
                        severity="success"
                        sx={{width: '100%'}}
                    >
                        Player added/updated successfully!
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={toasterOpen.error}
                    autoHideDuration={6000}
                    onClose={handleToasterClose}
                    message="Form could not be submitted."
                >
                    <Alert
                        onClose={handleToasterClose}
                        severity="error"
                        sx={{width: '100%'}}
                    >
                        There was an error!
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={toasterOpen.delete}
                    autoHideDuration={6000}
                    onClose={handleToasterClose}
                    message="Form could not be submitted."
                >
                    <Alert
                        onClose={handleToasterClose}
                        severity="success"
                        sx={{width: '100%'}}
                    >
                        Player deleted successfully!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Home
