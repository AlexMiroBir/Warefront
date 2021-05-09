import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosGetItemData, axiosGetItems} from "../../../../redux/async-thunks/items-async-thunks";
import {axiosPickUpItem} from "../../../../redux/async-thunks/orders-async-thunks";
import {setMessage, stopLoading} from "../../../../redux/slices/common-slice";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),

    },
    window: {
        display: 'flex',
        flexFlow: 'column',
        height: '100px',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: 'white',
    }
}));

const PickUpModal = ({itemId, closeModal}) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const itemQTY = useSelector(state => state.Items?.ItemData?.Inventory_Status?.QTY_In_Stock)
    const userId = useSelector(state => state.Auth.Id)
    const toolId = useSelector(state => state.Items?.ItemData?.Tool_Id)

    const [pickUpQTY, setPickupQTY] = React.useState(itemQTY);
    const handleOpen = (itemId) => {

        setOpen(true)
    }


    const handleClose = () => {
        setOpen(false);
    };

    const pickUpToServer = () => {
        dispatch(setMessage({msg: 'pick up...', variant: 'info'}))
        dispatch(axiosPickUpItem({Id: itemId, PickUpQTY: pickUpQTY, User_Id: userId, Tool_Id: toolId}))
            .then(unwrapResult)
            .then(response=>dispatch(setMessage({msg: 'pick up completed', variant: 'success'})))
            .then(response => dispatch(axiosGetItems({})))
            // .then(response => history.push('/home'))
            //
            .then(response => dispatch(axiosGetItemData(itemId)))
            // .then(response => dispatch(axiosGetSuppliers({})))
            // .then(response => dispatch(axiosGetUsers({})))
            // .then(response => dispatch(axiosGetOrders({})))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg: rejectedValueOrSerializedError.message, variant: "error"}))
            })
    }

    return (
        <div>
            <Button
                onClick={() => handleOpen(itemId)}
                size='small'
                color="default"
                variant="contained"
                style={{marginLeft: 16}}
            >
                Pick UP
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.window}>
                        <div>
                            {`How much pcs do you want to pick up (available ${itemQTY} pcs)`}
                        </div>
                        <TextField
                            onChange={(event) => setPickupQTY(event.target.value)}
                            id="standard-number"
                            label=""
                            type="number"
                            InputProps={{inputProps: {min: 1, max: itemQTY}}}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                        <div><Button
                            size='small'
                            color="primary"
                            variant="contained"
                            onClick={() => pickUpToServer()}>
                            Pick up
                        </Button>
                            <Button
                                size='small'
                                color="secondary"
                                variant="contained"
                                onClick={() => handleClose()}>
                                Close
                            </Button>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default PickUpModal

