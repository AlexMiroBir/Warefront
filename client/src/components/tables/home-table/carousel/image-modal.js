import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MyCarousel from "./carousel";
import {useDispatch} from "react-redux";
import {axiosAddImage, axiosGetAvatars, axiosGetItemImages} from "../../../../redux/async-thunks/items-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {setMessage, stopLoading} from "../../../../redux/slices/common-slice";

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
        maxWidth: '500px',

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



    const classes = useStyles();

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const [file, setFile] = useState()


    const handleOpen = () => {
     //   dispatch(setMessage({msg:"Getting images...",variant:'info'}))
        dispatch(axiosGetItemImages(itemId))
            .then(unwrapResult)
          //  .then(response => dispatch(setMessage({msg:"Images have been received",variant:'success'})))
            .then(response => setOpen(true))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))

            })

    };

    const handleClose = () => {
        console.log('close')
        setOpen(false);
    };

    const sendFileToServer = () => {
        if (file) {
           // dispatch(setMessage({msg:"Uploading image...",variant:'info'}))
            dispatch(axiosAddImage({ItemId: itemId, File: file}))
                .then(unwrapResult)
                .then(response => dispatch(setMessage({msg:"Image has been uploaded",variant:'success'})))
                .then(response => dispatch(axiosGetItemImages(itemId)))
                .then(response => dispatch(axiosGetAvatars()))
                // .then(response =>setIndex(0)) // TODO обновление QTY
                .catch(rejectedValueOrSerializedError => {
                    dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))

                })
        }
    }

    useEffect(() => sendFileToServer(), [file])

    return (
        <div>
            <img
                src={imgSrc}
                className={classes.avatar}
                onClick={(e)=>{
                    e.stopPropagation()
                    handleOpen()
                }} alt="avatar"/>
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