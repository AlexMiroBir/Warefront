import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Formik} from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
//import {axiosGetItems, axiosLogin} from "../../../../redux/async-thunks";
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {addToCandidatesToUpdateMainItemData} from "../../../../redux/slices/items-slice";

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

        width: '100%'
    },
    form: {
        width: '93%',
        '& > *': {
            margin: theme.spacing(1),
            width: '93%',
        },
    },

    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


//-----------------YUP----------------- Form validation library
let schemaYup = yup.object().shape({
    name: yup.string().required(),  //.min(4, "Email is too short"),
    bCode: yup.string().required(),   //.min(8, "Password is too short (min 8 symbols)")
    description: yup.string().required(),   //.min(8, "Password is too short (min 8 symbols)")
    forTool: yup.string().required(),   //.min(8, "Password is too short (min 8 symbols)")
    location: yup.string().required(),   //.min(8, "Password is too short (min 8 symbols)")
    qty: yup.number().required(),   //.min(8, "Password is too short (min 8 symbols)")
    qtyMin: yup.number().required(),   //.min(8, "Password is too short (min 8 symbols)")

});

// check validity
schemaYup
    .isValid({
        name: 'keyboard',
        bCode: 'BC0000000094',
        description: 'Apple Full - Keyboard',
        forTool: 'PC',
        location: 'A1',
        qty: '3',
        qtyMin: '5',

    })


// you can try and type cast objects to the defined schema
schemaYup.cast({
    name: 'keyboard',
    bCode: 'BC0000000094',
    description: 'Apple Full - Keyboard',
    forTool: 'PC',
    location: 'A1',
    qty: '3',
    qtyMin: '5',
});
//----------------------------------------


const ItemDataForm = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const itemData = useSelector(state => state.ItemsSlice.itemData.data)
    const tools = useSelector(state => state.ToolsSlice.tools)


    return (
        <div className={classes.formDiv}>


            <Formik
                initialValues={{
                    name: itemData.Name,
                    bCode: itemData.Inventory_BCode,
                    description: itemData.Description,
                    forTool: itemData.Tool,
                    location: itemData.Location,
                    qty: itemData.QTY_In_Stock,
                    qtyMin: itemData.QTY_Min,
                }}

                onSubmit={(values, {setSubmitting}) => {
                    let candidateToUpdate = {
                        Id: itemData.Id,
                        Name: values.name,
                        Description: values.description,
                        Inventory_BCode: values.bCode,
                        Tool_Id: itemData.Tool_Id,
                        Tool: values.forTool,
                        Filename: itemData.Filename,
                        Filepath: itemData.Filepath,
                        QTY_In_Stock: values.qty,
                        QTY_Min: values.qty,
                        Location: values.location
                    }
                    dispatch(addToCandidatesToUpdateMainItemData(candidateToUpdate))


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


                        <Grid container spacing={3}>
                            <Grid item xs={6}>

                                <TextField
                                    variant="outlined"
                                    label="Name"
                                    id="name-input"
                                    type="text"
                                    name="name"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name && <Alert severity="error">{errors.name}</Alert>}


                            </Grid>
                            <Grid item xs={6}>

                                <TextField
                                    variant="outlined"
                                    label="BCode"
                                    id="bCode-input"
                                    type="text"
                                    name="bCode"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bCode}
                                    disabled={true}


                                />
                                {errors.bCode && touched.bCode && <Alert severity="error">{errors.bCode}</Alert>}
                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    id="description-input"
                                    type="text"
                                    name="description"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {errors.description && touched.description &&
                                <Alert severity="error">{errors.description}</Alert>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    variant="outlined"
                                    label="For Tools"
                                    id="forTool-input"
                                    type="text"
                                    name="forTool"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.forTool}
                                    defaultValue={values.forTool}
                                >
                                    {tools.map((tool) => (
                                        <MenuItem key={tool.id} value={tool.Name}>
                                            {tool.Name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {errors.forTool && touched.forTool && <Alert severity="error">{errors.forTool}</Alert>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField

                                    variant="outlined"
                                    label='Location'
                                    id="forTool-input"
                                    type="text"
                                    name="location"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                    defaultValue={values.location}
                                />

                                {errors.forTool && touched.forTool && <Alert severity="error">{errors.forTool}</Alert>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField

                                    variant="outlined"
                                    id="qty-input"
                                    label="QTY"
                                    type="text"
                                    name="qty"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.qty}
                                />
                                {errors.qty && touched.qty && <Alert severity="error">{errors.qty}</Alert>}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    label="QTY Min"
                                    id="standard-basic2"
                                    type="text"
                                    name="qtyMin"
                                    className={classes.input}
                                    placeholder="Type login"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.qtyMin}
                                />
                                {errors.qtyMin && touched.qtyMin && <Alert severity="error">{errors.qtyMin}</Alert>}
                                <button type={'submit'}>privet</button>
                            </Grid>

                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    );
}


export default ItemDataForm


