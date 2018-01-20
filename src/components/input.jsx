import React, { Component } from 'react';
import { TextField } from 'material-ui';

// Style
import Style from '../styles/style';


class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: null
        }
    }
    
    render() {

        return (
            <TextField floatingLabelText={this.props.label} style={this.props.styles} type={this.props.textType}
                floatingLabelStyle={Style.floatingLabelStyle} key={this.props.keyName}
                underlineStyle={Style.underlineStyle} id={this.props.idName}
                underlineFocusStyle={Style.underlineFocusStyle} disabled={this.props.disabled}
                floatingLabelFocusStyle={Style.floatingLabelFocusStyle}
                onChange={this.props.getVal} value={this.props.value}
                hintText={this.props.hintText} underlineShow={this.props.underlineShow}
            />

        );
    }
}

export default TextInput;