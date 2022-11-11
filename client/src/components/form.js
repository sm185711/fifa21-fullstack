import React, {useState} from 'react'
import {useFormik} from 'formik'
import apis from '../api'
import * as Yup from 'yup'
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
} from '@mui/material'
import ConfirmationDialog from './ConfirmationDialog'

const PlayerForm = (props) => {
    let [formState, setFormState] = useState({available: false})
    let [confirmationStatus, setConfirmationStatus] = useState(false)

    const handleClose = () => {
        confirmationHandleClose()
        props.setOpen(false)
    }

    const confirmationHandleClose = () => {
        setConfirmationStatus(false)
    }

    const confirmationHandleOpen = () => {
        setConfirmationStatus(true)
    }

    const formik = useFormik({
        initialValues: {
            player_id: props.exist ? 0 : '',
            name: props.exist ? props.playerData.name : '',
            nationality: props.exist ? props.playerData.nationality : '',
            overall: props.exist ? props.playerData.overall : '',
            age: props.exist ? props.playerData.age : '',
            hits: props.exist ? props.playerData.hits : '',
            potential: props.exist ? props.playerData.potential : '',
            team: props.exist ? props.playerData.team : '',
            position: props.exist ? props.playerData.position : '',
        },

        validationSchema: Yup.object({
            player_id: Yup.number()
                .required('Sorry, this is required.')
                .typeError('Has to be an integer.')
                .min(0, 'Cannot be negative.')
                .test('player_id-exists', 'The ID is unavailable', (value) => {
                    if (value === undefined) {
                        return false
                    }

                    apis.getPlayerById(value).then((response) => {
                        if (response.data.length > 0) {
                            setFormState({available: false})
                        } else {
                            setFormState({available: true})
                        }
                    })
                    if (props.exist) {
                        return (
                            formState.available ||
                            value === props.playerData.player_id
                        )
                    } else {
                        return formState.available
                    }
                }),

            name: Yup.string().required('Sorry, this is required.'),

            nationality: Yup.string().required('Sorry, this is required.'),

            position: Yup.string().required('Sorry, this is required.'),

            overall: Yup.number()
                .required('Sorry, this is required.')
                .typeError('Has to be an integer.')
                .max(100, 'Cannot excede 100.')
                .min(0, 'Cannot precede 0.'),

            age: Yup.number()
                .required('Sorry, this is required.')
                .typeError('Has to be an integer.')
                .min(0, 'Cannot be negative.'),

            hits: Yup.number()
                .required('Sorry, this is required.')
                .typeError('Has to be an integer.')
                .min(0, 'Cannot be negative.'),

            potential: Yup.number()
                .required('Sorry, this is required.')
                .typeError('Has to be an integer.')
                .max(100, 'Cannot excede 100.')
                .min(0, 'Cannot precede 0.'),

            team: Yup.string().required('Sorry, this is required.'),
        }),

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
            props.exist
                ? apis
                      .updatePlayerById(props.playerData.player_id, values)
                      .then((response) => {
                          console.log(response.data)
                      })
                : apis.insertPlayer(values).then((response) => {
                      console.log(response.data)
                  })
            handleClose()
        },
    })

    return (
        <>
            {confirmationStatus === false ? (
                <Dialog open={props.open} onClose={handleClose} fullWidth>
                    <DialogTitle>
                        {props.exist ? 'Edit' : 'Create'} Player
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill all the fields below.
                        </DialogContentText>
                        <form className="form" onSubmit={formik.handleSubmit}>
                            {props.exist ? null : (
                                <>
                                    <TextField
                                        className="input-box"
                                        id="player_id"
                                        name="player_id"
                                        type="number"
                                        label="Player ID"
                                        {...formik.getFieldProps('player_id')}
                                    />
                                    <p className="error">
                                        {formik.errors.player_id &&
                                        formik.touched.player_id ? (
                                            <span>
                                                {formik.errors.player_id}
                                            </span>
                                        ) : null}
                                    </p>
                                </>
                            )}

                            <TextField
                                className="input-box"
                                id="name"
                                name="name"
                                type="text"
                                label="Player Name"
                                {...formik.getFieldProps('name')}
                            />
                            <p className="error">
                                {formik.errors.name && formik.touched.name ? (
                                    <span>{formik.errors.name}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="nationality"
                                name="nationality"
                                type="text"
                                label="Country"
                                {...formik.getFieldProps('nationality')}
                            />
                            <p className="error">
                                {formik.errors.nationality &&
                                formik.touched.nationality ? (
                                    <span>{formik.errors.nationality}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="position"
                                name="position"
                                type="text"
                                label="Positions"
                                {...formik.getFieldProps('position')}
                            />
                            <p className="error">
                                {formik.errors.position &&
                                formik.touched.position ? (
                                    <span>{formik.errors.position}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="overall"
                                name="overall"
                                type="number"
                                label="Overall"
                                {...formik.getFieldProps('overall')}
                            />
                            <p className="error">
                                {formik.errors.overall &&
                                formik.touched.overall ? (
                                    <span>{formik.errors.overall}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="age"
                                name="age"
                                type="number"
                                label="Age"
                                {...formik.getFieldProps('age')}
                            />
                            <p className="error">
                                {formik.errors.age && formik.touched.age ? (
                                    <span>{formik.errors.age}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="hits"
                                name="hits"
                                type="number"
                                label="Hits"
                                {...formik.getFieldProps('hits')}
                            />
                            <p className="error">
                                {formik.errors.hits && formik.touched.hits ? (
                                    <span>{formik.errors.hits}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="potential"
                                name="potential"
                                type="number"
                                label="Potential"
                                {...formik.getFieldProps('potential')}
                            />
                            <p className="error">
                                {formik.errors.potential &&
                                formik.touched.potential ? (
                                    <span>{formik.errors.potential}</span>
                                ) : null}
                            </p>

                            <TextField
                                className="input-box"
                                id="team"
                                name="team"
                                type="text"
                                label="Team"
                                {...formik.getFieldProps('team')}
                            />
                            <p className="error">
                                {formik.errors.team && formik.touched.team ? (
                                    <span>{formik.errors.team}</span>
                                ) : null}
                            </p>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="button"
                            type="submit"
                            variant="outlined"
                            onClick={confirmationHandleOpen}
                            // onClick={formik.handleSubmit}
                            sx={{margin: '20px'}}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <ConfirmationDialog
                    open={confirmationStatus}
                    handleClose={confirmationHandleClose}
                    exist={props.exist}
                    handleSubmit={formik.handleSubmit}
                />
            )}
        </>
    )
}

export default PlayerForm
