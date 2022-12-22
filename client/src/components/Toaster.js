import React from 'react'

import {Snackbar, Alert} from '@mui/material'

const Toaster = ({toasterOpen, handleToasterClose}) => {
    return (
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
    )
}

export default Toaster
