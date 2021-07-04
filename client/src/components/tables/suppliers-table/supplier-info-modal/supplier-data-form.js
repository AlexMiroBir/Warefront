import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';
import {axiosEditSupplier, axiosGetSuppliers} from "../../../../redux/async-thunks/suppliers-async-thunks";
import {setMessage, stopLoading} from "../../../../redux/slices/common-slice";

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
        .string()
        .required(),

    phone: yup
        .string(),

    contactName: yup
        .string()

});


const SupplierDataForm = ({supplierId, closeModal}) => {

    const classes = useStyles();


    const dispatch = useDispatch()
    const suppliers = useSelector(state => state.Suppliers.Suppliers)
    const currentSupplierData = suppliers.find(supplier => supplier.Id === supplierId)
    const status = useSelector(state => state.Auth.Status)
    const isAdmin = status.toLowerCase() === "admin"

    const history = useHistory()


    /**
     * Formik for Material UI - https://formik.org/docs/examples/with-material-ui
     */

    const formik = useFormik({
            initialValues: {
                name: currentSupplierData.Name,
                description: currentSupplierData.Description,
                phone: currentSupplierData.Phone,
                contactName: currentSupplierData.Contact_Name,
            },
            validationSchema: validationSchema,
            onSubmit: values => {

                const row = {
                    Id: currentSupplierData.Id,
                    Name: values.name,
                    Description: values.description,
                    Phone: values.phone,
                    Contact_Name: values.contactName,
                }
                dispatch(setMessage({msg:"Editing supplier...",variant:'info'}))
                dispatch(axiosEditSupplier(row))
                    .then(unwrapResult)
                    .then(response => dispatch(axiosGetSuppliers({})))
                    .then(response => history.push('/suppliers'))
                    .then(response => dispatch(setMessage({msg:"Supplier has been deleted...",variant:'success'})))
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
                            defaultValue={formik.values.name}
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
                            defaultValue={formik.values.description}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            onKeyDown={(e) => e.stopPropagation()}
                        />

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
                            defaultValue={formik.values.phone}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            onKeyDown={(e) => e.stopPropagation()}
                        />

                    </Grid> <Grid item xs={12}>

                    <TextField
                        id="contact-name-input"
                        name="contactName"
                        label="Contact Name"
                        type="text"
                        variant="outlined"
                        className={classes.input}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={formik.values.contactName}
                        error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                        helperText={formik.touched.contactName && formik.errors.contactName}
                        onKeyDown={(e) => e.stopPropagation()}
                    />

                </Grid>

                    <Grid item xs={12}>

                        {isAdmin && <Button
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            size='small'
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={currentSupplierData.Name === formik.values.name
                            &&
                            currentSupplierData.Description === formik.values.description
                            &&
                            currentSupplierData.Phone === formik.values.phone
                            &&
                            currentSupplierData.Contact_Name === formik.values.contactName
                            }>

                            Save
                        </Button>}
                        <Button
                            className={classes.button}
                            startIcon={<CancelPresentationSharpIcon/>}
                            size='small'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => closeModal()}
                        >

                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}


export default SupplierDataForm

