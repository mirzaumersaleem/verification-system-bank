import React, { Component } from 'react';
import { Dialog, FlatButton, SelectField, MenuItem, Divider, RadioButtonGroup, RadioButton } from 'material-ui';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Custome components
import Style from '../styles/style';

// Styles
import '../styles/css.css';
import Toast from './toast';


class AddFormImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: null,
            message: null,
            formResult: null,
            status_code: null,
            show_message: false,
            uploading: false
        }
    }

    componentWillMount() {
        this.setState({ open: this.props.open });

    }

    componentDidMount() {
        this.props.resetMessage();
        // this.setState({
        //     file: this.props.file,
        //     file_type: this.props.file_type,
        //     selectedFileName: this.props.file.name,
        //     pending_assignments: this.props.pending_assignments,
        //     message: this.props.obj.message,
        //     status_code: this.props.obj.status_code,
        // })
    }

    handleSelectBoxChange(name, ev, index, value) {
        let newState = this.state;
        newState[name] = value;
        newState['message'] = null;
        this.setState(newState);
    }


    handleClose(btn, ev) {
        if (btn === 'submit') {
            if (!this.state.file || !this.state.formResult) toast.error("Please add File and select verification.");
            else {
                this.props.addFile(this.state.file, this.state.formResult);
                this.setState({ uploading: true });
            }
        } else {
            this.setState({ open: false, uploading: false });
            setTimeout(() => { this.props.close(null) }, 150);

        }
    }

    onImageDrop(files) {
        this.validateFile(files[0]);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.uploading === true && !newProps.isLoading && newProps.message && newProps.code) this.handleClose(null);
    }

    validateFile(file) {
        let filename = file.name;
        let reg = /(\.png|\.jpeg|\.jpg)$/i;
        let extension = reg.exec(filename);
        if (!extension) {
            toast.error("Only image supported (.png,.jpg etc).");
            console.warn("Image extension not supported!");
        } else {
            let newState = this.state;
            newState['show_message'] = false;
            newState['message'] = "";
            newState['file'] = file;
            newState['file_type'] = extension[1];
            this.setState(newState);
        }
    }
    closingRequest() { }
    radioBtnSelected(ev) {
        this.setState({ formResult: ev.target.value })
    }

    render() {
        const actions = [
            <FlatButton label="Submit" primary={true} onTouchTap={this.handleClose.bind(this, 'submit')} disabled={this.state.uploading} />,
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose.bind(this, 'cancel')} disabled={this.state.uploading} />,
        ];
        return (<Dialog actions={actions} modal={true}
            open={this.state.open} onRequestClose={this.handleClose}>
            <div className="fieldsWrapper">
                <h3>Add Form Images</h3>
                <Divider />
                <Dropzone style={{ border: "0px", cursor: 'pointer', marginTop: '5px' }} onDrop={this.onImageDrop.bind(this)}>
                    <div style={Style.dropzoneDiv}>
                        <i className="fa fa-download fa-2x" style={Style.iconColor}></i>
                        <p>Drop here OR click to <b>change</b> assignment</p>
                    </div>
                </Dropzone>
                {(this.state.file != null) ? <h4 className="selectedFile">{this.state.file.name}</h4> : null}
                <Divider />
                <hr />
                <p>Result of verfication: </p>
                <RadioButtonGroup name="formResult" style={{ display: 'flex', justifyContent: 'center', maxWidth: '250px' }} onChange={(ev) => { this.radioBtnSelected(ev) }}>
                    <RadioButton value="positive" label="Positive" />
                    <RadioButton value="negative" label="Negative" />
                </RadioButtonGroup>
                {/* {((this.props.obj.inProcess === false && this.state.status_code !== 200 && this.state.message !== "" && this.state.message !== null) || this.state.show_message === true) ? <Toast message={this.state.message} bgColor="red" closingRequest={this.closingRequest.bind(this)} /> : ""} */}
            </div>
            {/* <ToastContainer
                style={{ zIndex: 999999 }}
                position="top-center"
                type="default"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            /> */}
        </Dialog>);
    }
}


export default AddFormImage;