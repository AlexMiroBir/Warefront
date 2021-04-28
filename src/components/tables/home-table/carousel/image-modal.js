import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MyCarousel from "./carousel";
import {useDispatch} from "react-redux";
import {axiosAddImage, axiosGetAvatars, axiosGetItemImages} from "../../../../redux/async-thunks/items-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {setMessage} from "../../../../redux/slices/common-slice";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '80px',
        cursor: 'pointer',
        marginTop: '30%'
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
        width: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: "translate(50%, -50%)",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ImageModal = ({imgSrc, itemId}) => {

    console.log(imgSrc)
    // const avatars = useSelector(state => state.Items.Avatars)
    //
    // useEffect(()=> console.log('rererer'),[avatars])
    const classes = useStyles();

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const [file, setFile] = useState()


    const handleOpen = () => {
        dispatch(setMessage("Getting images..."))
        dispatch(axiosGetItemImages(itemId))
            .then(unwrapResult)
            .then(response => dispatch(setMessage("Images have been received...")))
            .then(response => setOpen(true))
            .catch(rejectedValueOrSerializedError => {
                dispatch(setMessage(rejectedValueOrSerializedError.message))

            })

    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendFileToServer = () => {
        if (file) {
            dispatch(setMessage("Uploading image..."))
            dispatch(axiosAddImage({ItemId: itemId, File: file}))
                .then(unwrapResult)
                .then(response => dispatch(setMessage("Image has been uploaded...")))
                .then(response => dispatch(axiosGetItemImages(itemId)))
                .then(response => dispatch(axiosGetAvatars()))
                // .then(response =>setIndex(0))
                .catch(rejectedValueOrSerializedError => {
                    dispatch(setMessage(rejectedValueOrSerializedError.message))

                })
        }
    }

    useEffect(() => sendFileToServer(), [file])

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
                        {/*<img className={classes.bigImage} src={imgSrc} alt="big avatar"/>*/}

                        <MyCarousel
                            close={handleClose}
                            setFile={setFile}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ImageModal