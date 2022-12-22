import React from 'react'

import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    CircularProgress,
    InputAdornment,
} from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import SearchIcon from '@mui/icons-material/Search'

const Header = ({homeState, setHomeState, setFormOpen}) => {
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

    return (
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
    )
}

export default Header
