import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import UserInfoModalGrid from "./user-info-modal-grid";

import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";


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
}));

const UserInfoModal = ({userId}) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleOpen = (userId) => {

        history.push(`/user/${userId}`)
        setOpen(true)

    }


    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div>
            <Button
                onClick={() => handleOpen(userId)}
                variant="contained"
                color="primary"
                size="small"
                style={{marginLeft: 16}}
            >
                Show info
            </Button>
            <Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>

                        <UserInfoModalGrid userId={userId} closeModal={handleClose} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default UserInfoModal


