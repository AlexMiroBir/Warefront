import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '80px',
        cursor:'pointer',
        marginTop:'30%'
    },
    bigImage: {
        maxWidth: '500px',

    },


    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '500px'
    },
    paper: {
        width:'500px',
        position: 'absolute',
        top: '25%',
        left: '0',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ImageModal = ({imgSrc}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <img src={imgSrc} className={classes.avatar} onClick={handleOpen} alt="avatar"/>
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
                        <img className={classes.bigImage} src={imgSrc} alt="big avatar"/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ImageModal