import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import UploadButton from "./upload-button";
import {useDispatch, useSelector} from "react-redux";
import StarSharpIcon from '@material-ui/icons/StarSharp';
import {orange} from '@material-ui/core/colors';
import StarOutlineSharpIcon from '@material-ui/icons/StarOutlineSharp';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
    axiosDeleteImage,
    axiosGetAvatars,
    axiosGetItemImages,
    axiosSetAvatar
} from "../../../../redux/async-thunks/items-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import noImagePic from "../../../../images/no-image.png"
import Box from "@material-ui/core/Box";
import {setMessage, startLoading, stopLoading} from "../../../../redux/slices/common-slice";

const API_URL_SERVER = process.env.REACT_APP_API_URL;


const useStyles = makeStyles((theme) => ({

        star: {
            display: 'flex',
            justifyContent: 'center',
            width: '30px',
            margin: '0 auto'
        },
        buttons: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
        },
        img: {
            maxWidth: '500px',
            maxHeight: '600px'

        },
        box:{
            display:'flex',
            flexFlow:'column',
            alignItems:'center'
        }
    }

));


const MyCarousel = ({setFile, close}) => {   //TODO подумать о перескакивании картинки при установлении аватара


    const [index, setIndex] = useState(0)

    const itemImages = useSelector(state => state.Items.ItemImages)



    const imageSort = (array) => {
        if (array.length < 1) {
            return [{}]
        }
        return array.slice().sort((a, b) => a.General < b.General ? 1 : -1)
    }


    {

        return (
            <Carousel
                animation={'slide'}
                autoPlay={false}
                index={index}
            >

                {
                    imageSort(itemImages).map((image, i) => <Item setFile={setFile} key={i} image={image}
                                                                  setIndex={setIndex}/>)
                }
            </Carousel>
        )
    }
}

function Item({setFile, image, setIndex}) {

    const status = useSelector(state => state.Auth.Status)
    const isAdmin = status.toLowerCase()==='admin'

    const itemId = image.Inventory_ID

    const classes = useStyles()

    const dispatch = useDispatch()

    const [fullFill, setFullFill] = useState(false)

    const isAvatar = (item) => {
        return item.General === '0x01'
    }

    const setAvatar = () => {
        const id = itemId
        dispatch(setMessage({msg:"Setting avatar...", variant:"info"}))
        dispatch(axiosSetAvatar({itemId, pictId: image.Id}))
            .then(unwrapResult)
            .then(response => dispatch(axiosGetItemImages(id)))
            .then(response => dispatch(axiosGetAvatars()))
            .then(response => dispatch(setMessage({msg:"Avatar has been set",variant:'success'})))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))

            })
    }

    const delImage = () => {
        const Id = image.Id
        dispatch(setMessage({msg:"Deleting image...",variant:'info'}))
        dispatch(axiosDeleteImage(Id))
            .then(unwrapResult)
            .then(response => dispatch(axiosGetItemImages(Id)))
            .then(response => dispatch(axiosGetAvatars()))
            .then(response => dispatch(setMessage({msg:"Image has been deleted",variant:'success'})))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading({msg:rejectedValueOrSerializedError.message, variant:"error"}))

            })
    }

    const noImage = image.Filename === undefined

    const getImageLink = (filename) => {
        if (noImage) {
            return noImagePic
        }
        return `${API_URL_SERVER}/${filename}`
    }

    const imageSrc = getImageLink(image.Filename)



    return (
        <Box className={classes.box}>
            <div>
                <img className={classes.img} src={imageSrc} alt={'alt'}/>

            </div>


            {isAvatar(image) ?
                <div>
                    {!noImage && <div className={classes.star}>

                        {isAdmin &&<StarSharpIcon
                            style={{color: orange[500]}}
                            fontSize="large"/>}

                    </div>}
                    {isAdmin &&  <div className={classes.buttons}>
                        <UploadButton setFile={setFile}/>
                       <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => delImage()}
                            disabled={noImage}
                        >Delete</Button>
                    </div>}
                </div>

                :

                <div>
                    {!noImage && <div className={classes.star}
                                      onMouseOver={() => setFullFill(true)}
                                      onMouseOut={() => setFullFill(false)}
                                      onClick={() => setAvatar()}
                    >
                        {fullFill ?
                            isAdmin && <StarSharpIcon
                                style={{color: orange[500]}}
                                fontSize="large"/>

                            :

                            isAdmin && <StarOutlineSharpIcon
                                style={{color: orange[500]}}
                                fontSize="large"/>


                        }

                    </div>}
                    {isAdmin && <div className={classes.buttons}>
                        <UploadButton setFile={setFile}/>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => delImage()}
                            disabled={noImage}
                        >Delete</Button>
                    </div>}
                </div>}
        </Box>
    )
}

export default MyCarousel