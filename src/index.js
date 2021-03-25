
import "regenerator-runtime/runtime";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/app";
import {BrowserRouter as Router} from "react-router-dom";
import store from "./redux/store";
import {Provider} from 'react-redux'


ReactDOM.render(
   // <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>,
   // </React.StrictMode>,
    document.getElementById('root')
);


