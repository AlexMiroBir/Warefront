import React from 'react';
import {useFormik} from 'formik';
import {useHistory} from "react-router-dom"
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosLogin} from "../../../redux/async-thunks/auth-async-thunks"
import {axiosGetAvatars, axiosGetItems} from "../../../redux/async-thunks/items-async-thunks"
import {axiosGetTools} from "../../../redux/async-thunks/tools-async-thunks";
import {axiosGetSuppliers} from "../../../redux/async-thunks/suppliers-async-thunks";
import {axiosGetUsers} from "../../../redux/async-thunks/users-async-thunks";
import {axiosGetOrders} from "../../../redux/async-thunks/orders-async-thunks";
import {startLoading, stopLoading} from "../../../redux/slices/common-slice";


/**
 * Material-UI styles:
 */

const useStyles = makeStyles((theme) => ({
    formDiv: {
        display: 'flex',
        width: "500px",
        justifyContent: "center",
    },


    inputFormAlert: {
        width: '100%',
        padding: '0 25px',
    },
    input: {
        marginBottom: '10px',
    },
    form: {
        width: '500px',
        '& > *': {
            margin: theme.spacing(1),
            width: '400px',
        },
    },

    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));


/**
 * YUP validator for forms:  https://github.com/jquense/yup
 */


const validationSchema = yup.object({
    login: yup
        .string()
        .required(),

    password: yup
        .string()
        .required()   //.min(8, "Password is too short (min 8 symbols)")

});


const LoginForm = () => {


    const classes = useStyles();


    const dispatch = useDispatch();
    const history = useHistory();


    const onClickLogin = (username, password) => {
        dispatch(startLoading("Login..."))
        dispatch(axiosLogin({Name: username, Password: password}))
            .then(unwrapResult)
            .then(response => dispatch(stopLoading({msg: "Authorized", variant: 'success'})))
            .then(response => dispatch(startLoading("Getting main data...")))
            .then(response => dispatch(axiosGetItems({})))
            .then(response => dispatch(axiosGetAvatars({})))
            .then(response => history.push('/home'))
            .then(response => dispatch(axiosGetTools({})))
            .then(response => dispatch(axiosGetSuppliers({})))
            .then(response => dispatch(axiosGetUsers({})))
            .then(response => dispatch(axiosGetOrders({})))
            .then(response => dispatch(stopLoading({msg: "Data has been received", variant: 'success'})))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg: rejectedValueOrSerializedError.message, variant: "error"}))
            })
    }

    const isDisabled = (a, b) => {
        if (a || b) {
            return true
        }
    }


    /**
     * Formik for Material UI - https://formik.org/docs/examples/with-material-ui
     */


    const formik = useFormik({
            initialValues: {
                login: '',
                password: ''
            },
            validationSchema: validationSchema,
            onSubmit: values => {

                onClickLogin(formik.values.login, formik.values.password)

            },
        }
    )


    return (

        <div className={classes.formDiv}>


            <form onSubmit={formik.handleSubmit}
                  className={classes.form}>
                <TextField
                    id="login-input"
                    label="Login"
                    type="text"
                    name="login"
                    className={classes.input}
                    placeholder="Type login"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    helperText={formik.touched.login && formik.errors.login}
                />

                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    name="password"
                    className={classes.input}
                    // placeholder="Type password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}

                />


                <Button
                    variant="contained"
                    color={'primary'}
                    type={'submit'}
                    disabled={isDisabled(formik.errors.name, formik.errors.password)}
                >
                    Log in
                </Button>
            </form>


        </div>)
};

export default LoginForm;