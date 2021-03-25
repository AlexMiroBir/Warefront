import React from 'react';

import {Formik} from 'formik';
import {useHistory} from "react-router-dom"
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch} from "react-redux";
//import {axiosGetItems, axiosLogin} from "../../../redux/async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosLogin} from "../../../redux/async-thunks/auth-async-thunks"
import {axiosGetItems} from "../../../redux/async-thunks/items-async-thunks"
import {axiosGetTools} from "../../../redux/async-thunks/tools-async-thunks";
import {axiosGetSuppliers} from "../../../redux/async-thunks/suppliers-async-thunks";
import {axiosGetUsers} from "../../../redux/async-thunks/users-async-thunks";
import {axiosGetOrders} from "../../../redux/async-thunks/orders-async-thunks";


//-----------Material UI styles----------------

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


//------------------------------------


//-----------------YUP----------------- Form validation library
let schemaYup = yup.object().shape({
    login: yup.string().required(),  //.min(4, "Email is too short"),
    password: yup.string().required()   //.min(8, "Password is too short (min 8 symbols)")

});

// check validity
schemaYup
    .isValid({
        login: 'Administrator',
        password: '12345'
    })


// you can try and type cast objects to the defined schema
schemaYup.cast({
    login: 'Administrator',
    password: '12345'
});
// => { login: 'jimmy@mail.com',
//      password: '123Qwer-'}
//----------------------------------------


const LoginForm = ({mod}) => {

    const classes = useStyles();


    const dispatch = useDispatch();
    const history = useHistory();
    // const loading = useSelector(state => state.toolkit.loading)


    const onClickLogin = (username, password) => {
        console.log(username)
        dispatch(axiosLogin({username, password}))
            .then(unwrapResult)
            .then(response => dispatch(axiosGetItems({})))
            .then(response => history.push('/home'))
            .then(response => dispatch(axiosGetTools({})))
            .then(response => dispatch(axiosGetSuppliers({})))
            .then(response => dispatch(axiosGetUsers({})))
            .then(response => dispatch(axiosGetOrders({})))
            .catch(rejectedValueOrSerializedError => {
            })
    }

    return (

        <div className={classes.formDiv}>

            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}

                onSubmit={(values, {setSubmitting}) => {

                    // if (mod === 'register') {
                    //     onClickRegister(values.login, values.password)
                    //
                    // } else {
                    onClickLogin(values.login, values.password)
                    // }

                }}
                validationSchema={schemaYup}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      isValid
                      /* and other goodies */

                  }) => (
                    <form onSubmit={handleSubmit}
                          className={classes.form}>
                        <TextField
                            id="standard-basic1"
                            label="Login"
                            type="text"
                            name="login"
                            className={classes.input}
                            placeholder="Type login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.login}
                        />

                        {errors.login && touched.login && <Alert severity="error">{errors.login}</Alert>}
                        <TextField
                            id="standard-basic2"
                            label="Password"
                            type="password"
                            name="password"
                            className={classes.input}
                            placeholder="Type password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password &&
                        <Alert severity="error">{errors.password}</Alert>}
                        <Button
                            variant="contained"
                            color={'primary'}
                            type={'submit'}
                            // disabled={loading}
                        >
                            {mod === 'register' ? 'Register' : 'Log in'}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>)
};

export default LoginForm;