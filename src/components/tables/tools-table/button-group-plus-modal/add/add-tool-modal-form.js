import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import {axiosEditTool, axiosGetTools} from "../../../../../redux/async-thunks/tools-async-thunks";


/**
 * Material-UI styles:
 */

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    formDiv: {
        display: 'flex',
        justifyContent: "center",
    },

    inputFormAlert: {
        padding: '0 25px',
    },

    input: {
        marginTop: '10px',
        width: '100%'
    },

    label: {
        color: 'red'
    },

    form: {
        width: '100%',
        '& > *': {
            margin: theme.spacing(1),
            width: '98%',
        },
    },

    button: {
        marginTop: '10px',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
}));


/**
 * YUP validator for forms:  https://github.com/jquense/yup
 */


const validationSchema = yup.object({
    name: yup
        .string()
        .required(),

    description: yup
        .string(),


});


const AddToolModalForm = ({closeModal}) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()


    /**
     * Formik for Material UI - https://formik.org/docs/examples/with-material-ui
     */

    const formik = useFormik({
            initialValues: {
                name: '',
                description: ''
            },

            validationSchema: validationSchema,
            onSubmit: values => {

                const row = {

                    id: -1,
                    name: values.name,
                    description: values.description,

                }

                dispatch(axiosEditTool(row))
                    .then(unwrapResult)
                    .then(response => dispatch(axiosGetTools({})))
                    .then(response => history.push('/tools'))
                    .then(response => closeModal())
                    .catch(rejectedValueOrSerializedError => {
                    })
            },
        }
    )

    return (
        <div className={classes.formDiv}>

            <form
                onSubmit={formik.handleSubmit}
                className={classes.form}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>

                        <TextField
                            id="name-input"
                            name="name"
                            label="Name"
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </Grid>


                    <Grid item xs={12}>

                        <TextField
                            id="description-input"
                            name="description"
                            label="Description"
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            onKeyDown={(e) => e.stopPropagation()}
                        />

                    </Grid>


                    <Grid item xs={12}>

                        <Button
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            size='small'
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={false}>

                            Add

                        </Button>
                        <Button
                            className={classes.button}
                            startIcon={<CancelPresentationSharpIcon/>}
                            size='small'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => closeModal()}>

                            Close

                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}


export default AddToolModalForm

