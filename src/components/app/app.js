import React, {useEffect} from "react";
import LoginPage from "../login-page/login-page";
import Toast from "../alert-toast/alert-toast";
import MainPage from "../main-page";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

//import {useSelector} from "react-redux";


function App() {
    const history = useHistory()
    //  const isAuthorized = useSelector(state => state.Slice.isAuthorized)

    useEffect(() => history.push('/login'), [history]) /// TODO потенциальная проблема


    return (

        <div className="App">

            <Switch>

            <Route path="/login" exact><LoginPage/> </Route>
            <Route path="/" > <MainPage/></Route>
            <Redirect from="**" to="/"/>

            </Switch>
            <Toast/>
        </div>

    );
}

export default App;
