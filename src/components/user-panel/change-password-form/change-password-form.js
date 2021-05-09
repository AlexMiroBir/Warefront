import React from 'react';
import {useFormik} from 'formik';
import {useHistory} from "react-router-dom"
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import {axiosChangePassword} from "../../../redux/async-thunks/auth-async-thunks";
import {axiosGetItems} from "../../../redux/async-thunks/items-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {setMessage, stopLoading} from "../../../redux/slices/common-slice";


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
            width: '350px',
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
    newPassword: yup
        .string()
        .required('Required'),

    newPasswordRepeat: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], "Passwords don't match")
        .required('Required')

});


const ChangePasswordForm = ({mod}) => {

    const classes = useStyles();


    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.Auth.Id)
    const isLoading = useSelector(state => state.Auth.isLoading)


    const onClickChangePassword = (newPassword) => {
        dispatch(setMessage({msg:"Updating password...",variant:'info'}))
        dispatch(axiosChangePassword({Id:userId, NewPassword:newPassword}))
            .then(unwrapResult)
            // .then(response => dispatch(fetchAllContacts()))
            .then(response => dispatch(setMessage({msg:"Password has been updated...", variant:'success'})))
            .then(response => history.push('/'))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))

            })
    }

    const onClickCancel = () => {
        history.push('/')
    }

    const formik = useFormik({
            initialValues: {
                newPassword: '',
                newPasswordRepeat: ''
            },
            validationSchema: validationSchema,
            onSubmit: values => {

                onClickChangePassword(values.newPassword)

            },
        }
    )
    const isDisabled=(a,b)=>{
        return (a||b)
    }


    return (
        <div className={classes.formDiv}>

            <form onSubmit={formik.handleSubmit}
                  className={classes.form}>

                <TextField
                    id="new-password-filed"
                    label="New password"
                    type="password"
                    name="newPassword"
                    className={classes.input}
                    placeholder="Type new password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                />

                <TextField
                    id="new-password-repeat-field"
                    label="Repeat password"
                    type="password"
                    name="newPasswordRepeat"
                    className={classes.input}
                    placeholder="Repeat new password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPasswordRepeat}
                    error={formik.touched.newPasswordRepeat && Boolean(formik.errors.newPasswordRepeat)}
                    helperText={formik.touched.newPasswordRepeat && formik.errors.newPasswordRepeat}
                />

                <Button
                    variant="contained"
                    color={'primary'}
                    type={'submit'}
                    disabled={isDisabled(formik.errors.newPassword,formik.errors.newPasswordRepeat)}
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

        </div>)

};

export default ChangePasswordForm;