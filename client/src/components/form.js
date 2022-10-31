import React, {useState} from 'react'
import {useFormik} from 'formik'
import apis from '../api'
import * as Yup from 'yup'

const PlayerForm = (props) => {
    let [formState, setFormState] = useState({available: false})

    const formik = useFormik({
        initialValues: {
            player_id: props.exist ? props.playerData.player_id : '',
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
                            value == props.playerData.player_id
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
        },
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form-component">
                <label htmlFor="player_id">Player ID</label>
                <input
                    className="input-box"
                    id="player_id"
                    name="player_id"
                    type="text"
                    {...formik.getFieldProps('player_id')}
                />
                <p className="error">
                    {formik.errors.player_id && formik.touched.player_id ? (
                        <span>{formik.errors.player_id}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="name">Player Name</label>
                <input
                    className="input-box"
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                <p className="error">
                    {formik.errors.name && formik.touched.name ? (
                        <span>{formik.errors.name}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="nationality">Country</label>
                <input
                    className="input-box"
                    id="nationality"
                    name="nationality"
                    type="text"
                    {...formik.getFieldProps('nationality')}
                />
                <p className="error">
                    {formik.errors.nationality && formik.touched.nationality ? (
                        <span>{formik.errors.nationality}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="position">Positions</label>
                <input
                    className="input-box"
                    id="position"
                    name="position"
                    type="text"
                    {...formik.getFieldProps('position')}
                />
                <p className="error">
                    {formik.errors.position && formik.touched.position ? (
                        <span>{formik.errors.position}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="overall">Overall</label>
                <input
                    className="input-box"
                    id="overall"
                    name="overall"
                    type="text"
                    {...formik.getFieldProps('overall')}
                />
                <p className="error">
                    {formik.errors.overall && formik.touched.overall ? (
                        <span>{formik.errors.overall}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="age">Age</label>
                <input
                    className="input-box"
                    id="age"
                    name="age"
                    type="text"
                    {...formik.getFieldProps('age')}
                />
                <p className="error">
                    {formik.errors.age && formik.touched.age ? (
                        <span>{formik.errors.age}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="hits">Hits</label>
                <input
                    className="input-box"
                    id="hits"
                    name="hits"
                    type="text"
                    {...formik.getFieldProps('hits')}
                />
                <p className="error">
                    {formik.errors.hits && formik.touched.hits ? (
                        <span>{formik.errors.hits}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="potential">Potential</label>
                <input
                    className="input-box"
                    id="potential"
                    name="potential"
                    type="text"
                    {...formik.getFieldProps('potential')}
                />
                <p className="error">
                    {formik.errors.potential && formik.touched.potential ? (
                        <span>{formik.errors.potential}</span>
                    ) : null}
                </p>
            </div>

            <div className="form-component">
                <label htmlFor="team">Team</label>
                <input
                    className="input-box"
                    id="team"
                    name="team"
                    type="text"
                    {...formik.getFieldProps('team')}
                />
                <p className="error">
                    {formik.errors.team && formik.touched.team ? (
                        <span>{formik.errors.team}</span>
                    ) : null}
                </p>
            </div>

            <button className="button" type="submit">
                Submit
            </button>
        </form>
    )
}

export default PlayerForm
