import { Route } from 'react-router-dom';
import React from 'react';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

import Signin from "../containers/signin.js";
import Signup from "../containers/signup.js";
import Dashboard from "./../containers/dashboard";
import Admin from "./../containers/admin";
import Form from "./../containers/showPrint";
import ShowPrintImages from "./../containers/showPrintImages";

import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from '../registerServiceWorker';

export default function configRoutes(store) {

    let routes = (
        // <HashRouter>
        <div>
            <Route exact path="/" component={Signin} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin" component={Admin} />
            <Route path="/form/:id" component={Form} />
            <Route path="/image/:id" component={ShowPrintImages} />
        </div>
        // </HashRouter>

        // </Provider>
        // </MuiThemeProvider>
    )
    return routes;
}

// export default routes;
injectTapEventPlugin();
registerServiceWorker();