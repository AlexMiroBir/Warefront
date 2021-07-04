import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useFormik} from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {useSelector} from "react-redux";

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

    input: {
        width: '100%',

    },

    form: {
        width: '93%',
        fontSize: '0.5rem',

        '& > *': {
            margin: 0,
            width: '93%',
            padding: 0

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
        .string(),


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


const ItemDataForm = ({updateItemMainData}) => {


    const classes = useStyles();


    const itemData = useSelector(state => state.Items.ItemData)
    const tools = useSelector(state => state.Tools.Tools)

    const [qty, setQty] = useState(itemData.Inventory_Status.QTY_In_Stock)

    useEffect(() => setQty(itemData.Inventory_Status.QTY_In_Stock), [itemData.Inventory_Status.QTY_In_Stock])


    const formik = useFormik({

        initialValues: {
            name: itemData.Name,
            bCode: itemData.Inventory_BCode,
            description: itemData.Description,
            forTool: itemData.Tool.Name,
            location: itemData.Inventory_Status.Location,
            qty: qty,
            qtyMin: itemData.Inventory_Status.QTY_Min,
        },

        validationSchema: validationSchema,
    });

    return (
        <div className={classes.formDiv}>
            <form onSubmit={formik.handleSubmit}
                  className={classes.form}>


                <Grid container spacing={3}>
                    <Grid item xs={6}>

                        <TextField
                            variant="outlined"
                            size="small"
                            label="Name"
                            id="name-input"
                            type="text"
                            name="name"
                            className={classes.input}
                            placeholder="Type name"
                            onChange={formik.handleChange}
                            onKeyUp={(e) => updateItemMainData('Name', e.target.value)}
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
                            size="small"
                            label="BCode"
                            id="bCode-input"
                            type="text"
                            name="bCode"
                            className={classes.input}
                            placeholder=""
                            onChange={formik.handleChange}
                            onKeyUp={(e) => updateItemMainData('BCode', e.target.value)}
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
                            size="small"
                            label="Description"
                            id="description-input"
                            type="text"
                            name="description"
                            className={classes.input}
                            placeholder="Type description"
                            onChange={formik.handleChange}
                            onKeyUp={(e) => updateItemMainData('Description', e.target.value)}
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
                            size="small"
                            label="For Tools"
                            id="forTool-input"
                            type="text"
                            name="forTool"
                            className={classes.input}
                            placeholder=""
                            onChange={(e) => updateItemMainData('Tool', e.target.value)}
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
                            size="small"
                            label='Location'
                            id="forTool-input"
                            type="text"
                            name="location"
                            className={classes.input}
                            placeholder=""
                            onChange={(e) => updateItemMainData('Location', e.target.value)}
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
                            size="small"
                            id="qty-input"
                            label="QTY"
                            type="text"
                            name="qty"
                            className={classes.input}
                            placeholder="Type qty"
                            onChange={formik.handleChange}
                            onKeyUp={(e) => updateItemMainData('QTY', e.target.value)}
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
                            size="small"
                            label="QTY Min"
                            id="qtyMin-input"
                            type="text"
                            name="qtyMin"
                            className={classes.input}
                            placeholder="Type qty min"
                            onChange={formik.handleChange}
                            onKeyUp={(e) => updateItemMainData('QTY_MIN', e.target.value)}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.qtyMin}
                            error={formik.touched.qtyMin && Boolean(formik.errors.qtyMin)}
                            helperText={formik.touched.qtyMin && formik.errors.qtyMin}

                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        {/*<button type={'submit'}>submit</button>*/}
                    </Grid>

                </Grid>
            </form>


        </div>
    );
}


export default ItemDataForm


