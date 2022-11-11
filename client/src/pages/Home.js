import {
    AppBar,
    IconButton,
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
import PlayerForm from '../components/form'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Player from './player'

const Home = () => {
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
            <nav
                style={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(10px)',
                    padding: '0px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <a className="topbar-a" href="/">
                    <img className="logo" src="logo.png" />
                    <Typography
                        className="brand"
                        variant="h5"
                        sx={{
                            color: 'white',
                        }}
                    >
                        DATABASE
                    </Typography>
                </a>
                <TextField
                    type="text"
                    onChange={handleSearch}
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        background: 'rgba(220, 220, 220, 0.5)',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '50px',
                        width: '1000px',
                        boxShadow:
                            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Select
                        id="metric"
                        onChange={handleSort}
                        labelId="metric"
                        value={homeState.metric}
                        placeholder="Metric"
                        className="select-dropdown"
                        sx={{
                            backdropFilter: 'blur(5px)',
                            background: 'rgba(220, 220, 220, 0.5)',

                            boxShadow:
                                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                        }}
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
                        sx={{
                            backdropFilter: 'blur(5px)',
                            background: 'rgba(220, 220, 220, 0.5)',
                            boxShadow:
                                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
                        }}
                    >
                        <MenuItem value="DESC" defaultValue={true}>
                            Descending
                        </MenuItem>
                        <MenuItem value="ASC">Ascending</MenuItem>
                    </Select>

                    <IconButton onClick={handleCreate}>
                        <AddCircleOutlineRoundedIcon
                            sx={{color: 'white'}}
                            fontSize="large"
                        />
                    </IconButton>
                </div>
            </nav>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    styles={{
                        width: '500px',
                        height: '500px',
                        backgroundColor: 'red',
                    }}
                >
                    {' '}
                </div>
                <Player id={homeState.id} />

                <div className="card-list">
                    {homeState.data.length > 0 ? (
                        homeState.data.map((player, idx) => (
                            <div key={player.player_id}>
                                <Card
                                    sx={{
                                        margin: '20px',
                                        color: 'black',
                                        background: 'rgba(220, 220, 220, 0.5)',
                                        backdropFilter: 'blur(5px)',
                                    }}
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
                                                {`${idx + 1}. ` + player.name}
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
        </>
    )
}

export default Home
