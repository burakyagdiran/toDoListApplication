import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import { CookiesProvider } from "react-cookie";

const appNode = document.getElementById("app");
ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
    , appNode);

serviceWorker.unregister();
