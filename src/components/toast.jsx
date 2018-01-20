import React, { Component } from 'react';
import { Snackbar } from 'material-ui';
// import Style from '../styles/style';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ open: this.props.message !== "" ? true : false })
        }, 10)
    }


    render() {
        return (<div>
            <Snackbar
                open={this.state.open}
                autoHideDuration={3000}
                message={this.props.message}
                onRequestClose={this.props.closingRequest()}
                bodyStyle={{ backgroundColor: this.props.bgColor }} />
        </div>);
    }
}


export default Toast;