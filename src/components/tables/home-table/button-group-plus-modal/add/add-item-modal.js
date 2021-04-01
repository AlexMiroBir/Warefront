import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import {useHistory} from "react-router-dom";
import AddBoxSharpIcon from "@material-ui/icons/AddBoxSharp";
import AddUserModalForm from "./add-user-modal-form";
import ItemInfoModalGrid from "../../show-info-modal/item-info-modal-grid";


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

const AddItemModal = () => {

    const history = useHistory()
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        history.push('/items/new')
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddBoxSharpIcon/>}
                onClick={handleOpen}
            >
                Add new
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
                }}
            >
                <Fade in={open}>
                    <Box className={classes.modalInclude}>

                       <ItemInfoModalGrid/>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}


export default AddItemModal


