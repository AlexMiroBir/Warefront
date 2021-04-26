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
import AccordionItems from "./accordion";
import CancelPresentationSharpIcon from "@material-ui/icons/CancelPresentationSharp";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import {axiosDeleteItem, axiosGetItems} from "../../../../../redux/async-thunks/items-async-thunks";
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

const DeleteItemModal = ({selectedItemsId}) => {
    const classes = useStyles();


    const dispatch = useDispatch()
    const history = useHistory()
    const items = useSelector(state => state.Items.Items)


    const [open, setOpen] = useState(false);
    const [sure, setSure] = useState(false);        // TODO при повтороном открытии крнпка delete активна


    const handleOpen = () => {
        setOpen(true);
        history.push('/items/delete')
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getArrWithItemsForDelete = (arrWithId) => {
        let arr = []
        arrWithId.forEach(id => {
            // eslint-disable-next-line eqeqeq
            let item = items.find(item => item.Id == id)
            {
                arr = [...arr, item]
            }
        })
        return arr
    }

    const deleteUsers = async (usersId) => {
        for (const id of usersId) {
            await dispatch(axiosDeleteItem(id))
                .then(unwrapResult)
                .then(response => dispatch(axiosGetItems({})))
                .catch(rejectedValueOrSerializedError => {
                })
        }

        handleClose()
        history.push('/home')
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
                disabled={selectedItemsId.length < 1}>

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
                            {`Are you sure you want to delete ${selectedItemsId.length} follow items:`}
                        </Alert>

                        <SureSlider setSure={setSure}/>

                        <Divider className={classes.divider}/>

                        Users for deleting:
                        <AccordionItems itemsForDelete={getArrWithItemsForDelete(selectedItemsId)}/>

                        <Button
                            className={classes.button}
                            startIcon={<DeleteForeverSharpIcon/>}
                            size='small'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => deleteUsers(selectedItemsId)}
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


export default DeleteItemModal


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