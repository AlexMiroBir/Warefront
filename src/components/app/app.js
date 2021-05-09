import React, {useEffect} from "react";
import LoginPage from "../login-page/login-page";
import Toast from "../alert-toast/alert-toast";
import MainPage from "../main-page";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";
import Loader from "../loader";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    app: {
        maxWidth: '99vw'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1b5e20',
        },
        secondary: {
            main: '#b71c1c',
        },
    },
});


function App() {

    const classes = useStyles()

    const history = useHistory()
    const isLoading = useSelector(state => state.Common.isLoading)
    const loadingLabel = useSelector(state => state.Common.loadingLabel)

    useEffect(() => history.push('/login'), [history])


    return (

        <div className={classes.app}>
            {isLoading && <Loader
                label={loadingLabel}/>}

            <ThemeProvider theme={theme}>
                <Switch>

                    <Route path="/login" exact><LoginPage/> </Route>
                    <Route path="/"> <MainPage/></Route>
                    <Redirect from="**" to="/"/>

                </Switch> </ThemeProvider>
            <Toast/>
        </div>

    );
}

export default App;
