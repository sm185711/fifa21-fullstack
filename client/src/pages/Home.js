import {
    Button,
    MenuItem,
    Select,
    TextField,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import apis from '../api'
import PlayerForm from '../components/PlayerForm'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Player from '../components/PlayerCard'

const Home = () => {
    // States
    const [homeState, setHomeState] = useState({
        data: [],
        loading: false,
        metric: 'overall',
        order: 'DESC',
        searchTerm: '--',
        toggleCreate: false,
        id: 20801,
    })
    const [formOpen, setFormOpen] = useState(false)

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

    const handleSelectCard = (id) => {
        console.log(id)
        setHomeState({...homeState, id: id})
    }

    const fetchPlayers = async () => {
        setHomeState({...homeState, loading: true})
        apis.getPlayers(
            homeState.metric,
            homeState.order,
            homeState.searchTerm
        ).then((response) => {
            setHomeState({...homeState, data: response.data, loading: false})
        })
    }

    // LifeCycle
    useEffect(() => {
        fetchPlayers()
    }, [
        homeState.metric,
        homeState.order,
        homeState.searchTerm,
        homeState.toggleCreate,
    ])

    // Render
    return (
        <div id="main">
            <nav>
                <a className="topbar-a" href="/">
                    <img className="logo" alt="FIFA 21 Logo" src="logo.png" />
                    <Typography className="brand" variant="h5">
                        DATABASE
                    </Typography>
                </a>
                <TextField
                    type="text"
                    id="search"
                    className="abcd"
                    onChange={handleSearch}
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '50px',
                        },
                    }}
                />
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
            </nav>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Player
                    id={homeState.id}
                    homeState={homeState}
                    setHomeState={setHomeState}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    margin: '0px 100px',
                }}
            >
                {homeState.data.length > 0 ? (
                    homeState.data.map((player, idx) => (
                        <div key={player.player_id}>
                            <Card
                                id="card-list-item"
                                onClick={() =>
                                    handleSelectCard(player.player_id)
                                }
                            >
                                <CardActionArea sx={{padding: '10px'}}>
                                    <CardContent>
                                        <Typography
                                            variant="h4"
                                            sx={{marginBottom: '5px'}}
                                        >
                                            {player.name}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {player.team}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
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
                    />
                </div>
            ) : null}
        </div>
    )
}

export default Home
