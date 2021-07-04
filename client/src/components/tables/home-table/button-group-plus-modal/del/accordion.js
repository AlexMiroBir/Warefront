import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 'bold'


    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

    info: {
        display: 'flex',
        flexFlow: 'column'
    },
    bold: {
        fontWeight: 'bold'
    }
}));

const AccordionItems = ({itemsForDelete}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const hasInventoryStatus=(item)=>{
        return item.Inventory_Status ? item.Inventory_Status : -1
    }

    return (
        <div className={classes.root}> {itemsForDelete.map(item => item &&
            <Accordion expanded={expanded === `panel${item.Id}`} onChange={handleChange(`panel${item.Id}`)}>


                <AccordionSummary
                    expandIcon={<InfoSharpIcon/>}
                    aria-controls="panel1bh-content"
                    id={item.Id}
                >

                    <Typography className={classes.heading}>{item.Name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.info}>
                        <Typography> Name:
                            <span className={classes.bold}>{item.Name}</span>
                        </Typography>
                        <Typography> Description:
                            <span className={classes.bold}>{item.Description}</span>
                        </Typography>
                        <Typography>BCode:
                            <span className={classes.bold}>{item.Inventory_BCode}</span>
                        </Typography>
                        <Typography> Location:
                            <span className={classes.bold}>{hasInventoryStatus(item).Location }</span>
                        </Typography>
                        <Typography> QTY:
                            <span
                                className={classes.bold}>{hasInventoryStatus(item).QTY_In_Stock}</span>
                        </Typography>
                        <Typography> QTY Min:
                            <span
                                className={classes.bold}>{hasInventoryStatus(item).QTY_Min}</span></Typography>
                    </Box>
                </AccordionDetails>

            </Accordion>)}
        </div>
    );
}


export default AccordionItems