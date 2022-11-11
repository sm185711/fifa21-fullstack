import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material'
import React from 'react'

const ConfirmationDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth>
            <DialogTitle>{props.exist ? 'Edit' : 'Create'} Player</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to {props.exist ? 'edit' : 'create'}{' '}
                    the player?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    className="button"
                    autoFocus
                    variant="outlined"
                    onClick={props.handleSubmit}
                    sx={{margin: '20px'}}
                >
                    Yes
                </Button>
                <Button
                    className="button"
                    type="submit"
                    variant="outlined"
                    onClick={props.handleClose}
                    sx={{margin: '20px'}}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
