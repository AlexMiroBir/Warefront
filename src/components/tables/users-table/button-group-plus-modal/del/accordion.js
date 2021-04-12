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
        marginBottom:'5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight:'bold'


    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

    info: {
        display: 'flex',
        flexFlow: 'column'
    },
    bold:{
        fontWeight:'bold'
    }
}));

const AccordionUsers = ({usersForDelete}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}> {usersForDelete.map(user => user &&
            <Accordion expanded={expanded === `panel${user.id}`} onChange={handleChange(`panel${user.id}`)}>


                <AccordionSummary
                    expandIcon={<InfoSharpIcon/>}
                    aria-controls="panel1bh-content"
                    id={user.Id}
                >

                    <Typography className={classes.heading}>{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.info}>
                        <Typography> Name: <span className={classes.bold}>{user.name}</span></Typography>
                        <Typography> Status: <span className={classes.bold}>{user.role}</span></Typography>
                        <Typography> phone: <span className={classes.bold}>{user.phone}</span></Typography>
                    </Box>
                </AccordionDetails>

            </Accordion>)}
        </div>
    );
}


export default AccordionUsers