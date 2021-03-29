import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
//import {axiosGetItems, axiosLogin} from "../../../../redux/async-thunks";
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from "react-redux";

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


/**
 * YUP validator for forms:  https://github.com/jquense/yup
 */

const validationSchema = yup.object({
    name: yup
        .string()
        .required(),

    bCode: yup
        .string()
        .required(),

    description: yup
        .string()
        .required(),

    forTool: yup
        .string()
        .required(),

    location: yup
        .string()
        .required(),

    qty: yup
        .number()
        .required(),

    qtyMin: yup
        .number()
        .required(),

});


// const ItemDataForm = ({setId,setName,setBCode,setDescription,setForTool,setLocation,setQty,setQtyMin}) => {
const ItemDataForm = ({updateItemMainData}) => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const itemData = useSelector(state => state.ItemsSlice.itemData.data)
    const tools = useSelector(state => state.ToolsSlice.tools)


    const formik = useFormik({
            initialValues: {
                name: itemData.Name,
                bCode: itemData.Inventory_BCode,
                description: itemData.Description,
                forTool: itemData.Tool,
                location: itemData.Location,
                qty: itemData.QTY_In_Stock,
                qtyMin: itemData.QTY_Min,
            },
            validationSchema: validationSchema,

            onSubmit: values => {
                const newRow = {
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

                updateItemMainData(newRow)

            },
        }
    )

    return (
        <div className={classes.formDiv}>
            <form onSubmit={formik.handleSubmit}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

                            onKeyDown={(e) => e.stopPropagation()}
                        />

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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.bCode}
                            disabled={true}
                            error={formik.touched.bCode && Boolean(formik.errors.bCode)}
                            helperText={formik.touched.bCode && formik.errors.bCode}

                            onKeyDown={(e) => e.stopPropagation()}


                        />
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.description}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}

                            onKeyDown={(e) => e.stopPropagation()}
                        />

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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.forTool}
                            error={formik.touched.forTool && Boolean(formik.errors.forTool)}
                            helperText={formik.touched.forTool && formik.errors.forTool}

                            onKeyDown={(e) => e.stopPropagation()}
                        >
                            {tools.map((tool) => (
                                <MenuItem key={tool.id} value={tool.Name}>
                                    {tool.Name}
                                </MenuItem>
                            ))}
                        </TextField>
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.location}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}

                            onKeyDown={(e) => e.stopPropagation()}
                        />

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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.qty}
                            error={formik.touched.qty && Boolean(formik.errors.qty)}
                            helperText={formik.touched.qty && formik.errors.qty}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="QTY Min"
                            id="qtyMin-input"
                            type="text"
                            name="qtyMin"
                            className={classes.input}
                            placeholder="Type login"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.qtyMin}
                            error={formik.touched.qtyMin && Boolean(formik.errors.qtyMin)}
                            helperText={formik.touched.qtyMin && formik.errors.qtyMin}

                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <button type={'submit'}>submit</button>
                    </Grid>

                </Grid>
            </form>


        </div>
    );
}


export default ItemDataForm


