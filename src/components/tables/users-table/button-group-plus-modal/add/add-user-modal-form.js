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
import {axiosEditUser, axiosGetUsers} from "../../../../../redux/async-thunks/users-async-thunks";
import Select from "@material-ui/core/Select";
import {setMessage, stopLoading} from "../../../../../redux/slices/common-slice";


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

    status: yup
        .string(),


    phone: yup
        .string()
        .required(),

    password: yup
        .string()
        .required(),

});


const AddUserModalForm = ({closeModal}) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()


    /**
     * Formik for Material UI - https://formik.org/docs/examples/with-material-ui
     */

    const formik = useFormik({
            initialValues: {
                name: '',
                status: 'LIMITED',
                phone: '',
                password: '',
            },
            validationSchema: validationSchema,
            onSubmit: values => {

                const row = {
                    Id: -1,
                    Name: values.name,
                    Status: values.status,
                    Phone: values.phone,
                    Password: values.password,
                }
                dispatch(setMessage({msg:"Adding user...",variant:'info'}))
                dispatch(axiosEditUser(row))
                    .then(unwrapResult)
                    .then(response => dispatch(axiosGetUsers({})))
                    .then(response => history.push('/users'))
                    .then(response => dispatch(setMessage({msg:"User has been added",variant:'success'})))
                    .then(response => closeModal())
                    .catch(rejectedValueOrSerializedError => {
                        dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))
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

                        <Select
                            id="status-select"
                            name="status"
                            label="status"
                            type="text"
                            variant="outlined"
                            native
                            className={classes.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}
                            onKeyDown={(e) => e.stopPropagation()}
                        >

                            <option value={'LIMITED'}>LIMITED</option>
                            <option value={'READER'}>READER</option>
                            <option value={'ADMIN'}>ADMIN</option>
                        </Select>

                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            id="phone-input"
                            name="phone"
                            label="Phone"
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            onKeyDown={(e) => e.stopPropagation()}
                        />

                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            id="password-input"
                            name="password"
                            label="Password"
                            type="text"
                            variant="outlined"
                            className={classes.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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


export default AddUserModalForm

