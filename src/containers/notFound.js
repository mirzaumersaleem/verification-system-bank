import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

// Material UI import
import { Paper } from 'material-ui';

// Custom components
import Header from './header';


// Style
import Style from '../styles/style';
import '../styles/css.css';

class PageNotFound extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Header />
                <Paper style={Style.paperStyleProfile} zDepth={1}>
                    Sorry . Requested Page Not found.
                </Paper >
            </div>
        );
    }
}
export default PageNotFound;
