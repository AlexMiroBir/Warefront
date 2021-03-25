import React from 'react';
import {Formik} from 'formik';
import {useHistory} from "react-router-dom"
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import {axiosChangePassword} from "../../../redux/async-thunks/auth-async-thunks";
import {axiosGetItems} from "../../../redux/async-thunks/items-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";


// import './login-form.css'


///////////Material UI styles//////////////////

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
            width: '350px',
        },
    },

    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));


////////////////////////////////////////////


//////////YUP//////////////
let schemaYup = yup.object().shape({
    // login: yup.string().required(),  //.min(4, "msg"),
    newPassword: yup.string().required('Required'),   //.min(8, "Password is too short (min 8 symbols)")
    newPasswordRepeat: yup.string()
        .oneOf([yup.ref('newPassword'), null], "Passwords don't match")
        .required()   //.min(8, "Password is too short (min 8 symbols)")

});

// check validity
schemaYup
    .isValid({
        // login: 'Administrator',
        newPassword: '12345',
        newPasswordRepeat: '12345'
    })


// you can try and type cast objects to the defined schema
schemaYup.cast({
    //  login: 'Administrator',
    newPassword: '12345',
    newPasswordRepeat: '12345'
});


const ChangePasswordForm = ({mod}) => {

    const classes = useStyles();


    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.AuthSlice.id)
    const isLoading = useSelector(state => state.AuthSlice.isLoading)


    // const onClickRegister = (login, password) => {
    //     dispatch(fetchRegister({login, password}))
    //         .then(unwrapResult)
    //         .then(response => history.push('/login'))
    //         .catch(rejectedValueOrSerializedError => {
    //         })
    // }

    const onClickChangePassword = (newPassword) => {
        console.log(newPassword)
        const newpassword = newPassword
        dispatch(axiosChangePassword({userId, newpassword}))
            .then(unwrapResult)
            // .then(response => dispatch(fetchAllContacts()))
            .then(response => history.push('/'))
            .catch(rejectedValueOrSerializedError => {
            })
    }

    const onClickCancel = () => {
        dispatch(axiosGetItems({})) /// TODO убрать
        history.push('/')
    }

    return (

        <div className={classes.formDiv}>

            <Formik
                initialValues={{
                    newPassword: '',
                    newPasswordRepeat: ''
                }}

                onSubmit={(values, {setSubmitting}) => {

                    // if (mod === 'register') {
                    //     onClickRegister(values.login, values.password)
                    //
                    // } else {
                    onClickChangePassword(values.newPassword)
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
                            id="standard-basic-password-filed"
                            label="New password"
                            type="password"
                            name="newPassword"
                            className={classes.input}
                            placeholder="Type new password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                        />
                        {errors.newPassword && touched.newPassword &&
                        <Alert severity="error">{errors.newPassword}</Alert>}
                        <TextField
                            id="standard-basic-password-repeat-field"
                            label="Repeat password"
                            type="password"
                            name="newPasswordRepeat"
                            className={classes.input}
                            placeholder="Repeat new password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPasswordRepeat}
                        />
                        {errors.newPasswordRepeat && touched.newPasswordRepeat &&
                        <Alert severity="error">{errors.newPasswordRepeat}</Alert>}
                        <Button
                            variant="contained"
                            color={'primary'}
                            type={'submit'}
                            disabled={isLoading}
                        >
                            Change password
                        </Button>
                        <Button
                            variant="contained"
                            color={'secondary'}
                            onClick={() => onClickCancel()}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </form>
                )}
            </Formik>
        </div>)
};

export default ChangePasswordForm;