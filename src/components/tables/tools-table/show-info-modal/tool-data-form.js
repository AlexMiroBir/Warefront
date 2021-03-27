import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {axiosEditTool, axiosGetTools} from "../../../../redux/async-thunks/tools-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationSharpIcon from '@material-ui/icons/CancelPresentationSharp';


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
        // width: "100%",
        justifyContent: "center",
    },


    inputFormAlert: {
        // width: '100%',
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
        width: '93%',
        '& > *': {
            margin: theme.spacing(1),
            width: '93%',
        },
    },

    button: {
        marginTop: '10px',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
}));


//-----------------YUP----------------- Form validation library
const validationSchema = yup.object({
    name: yup
        .string()
        .required(),

    description: yup
        .string()
        .required()

});

//----------------------------------------


const ToolDataForm = ({toolId, handleCloseModal}) => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const tools = useSelector(state => state.ToolsSlice.tools)
    const currentToolData = tools.find(tool => tool.Id === toolId) // TODO в редаксе неиспользуемый куррентТул


    const history = useHistory()


    const onClickEditToolsData = (row) => {
        dispatch(axiosEditTool(row))
            .then(unwrapResult)
            .then(response => dispatch(axiosGetTools({})))
            .then(response => history.push('/tools'))
            .catch(rejectedValueOrSerializedError => {
            })
    }


    const formik = useFormik({
            initialValues: {
                name: currentToolData.Name,
                description: currentToolData.Description,
            },
            validationSchema: validationSchema,
            onSubmit: values => {

                let row = {
                    Id: currentToolData.Id,
                    Name: values.name,
                    Description: values.description,
                }
                onClickEditToolsData(row)
                handleCloseModal()
            },
        }
    )

    return (
        <div className={classes.formDiv}>


            <form onSubmit={formik.handleSubmit}
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
                            //value={values.name}
                            defaultValue={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

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
                            //value={values.name}
                            defaultValue={formik.values.description}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Button className={classes.button} startIcon={<SaveIcon/>} size='small' color="primary"
                                variant="contained" fullWidth type="submit"
                                disabled={currentToolData.Name === formik.values.name && currentToolData.Description === formik.values.description}>
                            Save
                        </Button> <Button className={classes.button} startIcon={<CancelPresentationSharpIcon/>}
                                          size='small' color="secondary" variant="contained" fullWidth
                                          onClick={() => handleCloseModal()}>
                        Cancel
                    </Button>

                    </Grid>

                </Grid>
            </form>


        </div>
    );
}


export default ToolDataForm

