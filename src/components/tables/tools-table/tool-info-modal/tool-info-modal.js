import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ToolInfoModalGrid from "./tool-info-modal-grid";

import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentToolData} from "../../../../redux/slices/tools-slice";



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

const ToolInfoModal = ({toolId}) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleOpen = (toolId) => {

        history.push(`/data/tool/${toolId}`)
        setOpen(true)

    }


    const handleClose = () => {
        setOpen(false)

    };

    return (
        <div>
            <Button
                onClick={() => handleOpen(toolId)}
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
             // onClose={closeInfoModal}
               closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>

                        <ToolInfoModalGrid  toolId={toolId} closeModal={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default ToolInfoModal


