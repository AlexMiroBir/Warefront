import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ItemAddModalGrid from './item-add-modal-grid'
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import AddBoxSharpIcon from "@material-ui/icons/AddBoxSharp";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight:'100vh',
        maxWidth:'1020px',
        overflowY:'auto',
        margin:"5px auto auto auto"

    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1),

    },
}));

const ItemAddForm = ({itemId}) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleOpen = (itemId) => {
            setOpen(true)
    }


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ItemAddModalGrid itemId={itemId} closeMadal={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default ItemAddForm


// import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';
//
// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }
//
// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }
//
// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));
//
// const ShowToolInfoModal = ({itemId, onClickShowInfo}) => {
//     const classes = useStyles();
//     // getModalStyle is not a pure function, we roll the style only on the first render
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);
//
//     const renderButton = (handler,text) => {
//
//         return (
//
//             <Button
//                 onClick={handler}
//                 variant="contained"
//                 color="primary"
//                 size="small"
//                 style={{marginLeft: 16}}
//             >
//                 {text}
//             </Button>)
//     }
//
//     async function handleOpen (itemId)  {
//         await onClickShowInfo(itemId)
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     const body = (
//         <div style={modalStyle} className={classes.paper}>
//             <h2 id="simple-modal-title">Text in a modal</h2>
//             <p id="simple-modal-description">
//                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </p>
//             <ShowToolInfoModal/>
//
//         </div>
//     );
//
//     return (
//         <div>
//             <Button
//                 onClick={open ? ()=>handleClose() : ()=>handleOpen(itemId) }
//                 variant="contained"
//                 color="primary"
//                 size="small"
//                 style={{marginLeft: 16}}
//             >
//                 {open? "close" : "show info"}
//             </Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                 {body}
//             </Modal>
//         </div>
//     );
// }
//
// export default ShowToolInfoModal
