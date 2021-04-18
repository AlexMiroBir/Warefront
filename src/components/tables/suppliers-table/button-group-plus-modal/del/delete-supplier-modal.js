import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import AccordionSuppliers from "./accordion";
import CancelPresentationSharpIcon from "@material-ui/icons/CancelPresentationSharp";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import {axiosDeleteSupplier, axiosGetSuppliers} from "../../../../../redux/async-thunks/suppliers-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modalInclude: {
        padding: "10px 10px 10px 10px",
        backgroundColor: 'white',
        width: '1000px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center'
    },
    slider: {
        width: '50%',
        margin: '5px 0 5px 5px'
    },
    divider: {
        margin: '5px 0 5px 0'
    }
}));

const DeleteSupplierModal = ({selectedSuppliersId}) => {

    const classes = useStyles();


    const dispatch = useDispatch()
    const history = useHistory()
    const suppliers = useSelector(state => state.SuppliersSlice.Suppliers)


    const [open, setOpen] = useState(false);
    const [sure, setSure] = useState(false);        // TODO при повтороном открытии крнпка delete активна


    const handleOpen = () => {
        setOpen(true);
        history.push('/suppliers/delete')
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getArrWithSuppliersForDelete = (arrWithId) => {
        let arr = []
        arrWithId.forEach(id => {
            // eslint-disable-next-line eqeqeq
            let supplier = suppliers.find(supplier => supplier.Id == id)  // no change!
            {
                arr = [...arr, supplier]
            }
        })
        return arr
    }

    const deleteSuppliers = async (suppliersId) => {
        for (const id of suppliersId) {
            await dispatch(axiosDeleteSupplier(id))
                .then(unwrapResult)
                .then(response => dispatch(axiosGetSuppliers({})))
                .catch(rejectedValueOrSerializedError => {
                })
        }

        handleClose()
        history.push('/suppliers')
        setSure(false)
    }


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon/>}
                onClick={handleOpen}
                disabled={selectedSuppliersId.length < 1}>

                Delete

            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>

                <Fade in={open}>
                    <Box className={classes.modalInclude}>

                        <Alert
                            severity="error">
                            {`Are you sure you want to delete ${selectedSuppliersId.length} follow suppliers:`}
                        </Alert>

                        <SureSlider setSure={setSure}/>

                        <Divider className={classes.divider}/>

                        Suppliers for deleting:
                        <AccordionSuppliers suppliersForDelete={getArrWithSuppliersForDelete(selectedSuppliersId)}/>

                        <Button
                            className={classes.button}
                            startIcon={<DeleteForeverSharpIcon/>}
                            size='small'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => deleteSuppliers(selectedSuppliersId)}
                            disabled={!sure}>

                            Delete

                        </Button>

                        <Button
                            className={classes.button}
                            startIcon={<CancelPresentationSharpIcon/>}
                            size='small'
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleClose}>

                            Cancel

                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


export default DeleteSupplierModal


const SureSlider = ({setSure}) => {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        newValue > 50 ? setSure(true) : setSure(false)
        setValue(newValue);
    };

    return (
        <div className={classes.slider}>
            <Typography id="sure-slider" gutterBottom>
                Sure?
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    No
                </Grid>
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        aria-labelledby="continuous-slider"/>
                </Grid>
                <Grid item>
                    Yes
                </Grid>
            </Grid>

        </div>
    );
}