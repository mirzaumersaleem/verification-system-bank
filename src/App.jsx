import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import configRoutes from './config/routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from "./store/index.js";
import firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCVffAbDj5afLQ0qBDczFroXuF86qHfXyg",
      authDomain: "dcs-pakistan.firebaseapp.com",
      databaseURL: "https://dcs-pakistan.firebaseio.com",
      projectId: "dcs-pakistan",
      storageBucket: "",
      messagingSenderId: "808180371720"
    };
    firebase.initializeApp(config);
  }
  
  render() {
    const routes = configRoutes(store)
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router children={routes} />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;