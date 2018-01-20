import React, { Component } from 'react';
import { Dialog, FlatButton, SelectField, MenuItem, Divider } from 'material-ui';
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Custome components
import Style from '../styles/style';

// Styles
import '../styles/css.css';
import Toast from './toast';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: null,
            images: [],
            message: null,
            status_code: null,
            show_message: false,
        }
    }

    componentWillMount() {
        this.setState({ open: this.props.open });
    }

    componentDidMount() {
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
            if (this.state.images.length > 0) {
                this.props.addTempImages(this.state.images);
                this.setState({ open: false });
                setTimeout(() => { this.props.close(null) }, 150);
            }
            else toast.error("Please select at-least one image.");
        } else {
            this.setState({ open: false });
            setTimeout(() => { this.props.close(null) }, 150);

        }
    }

    onImageDrop(files) {
        (this.state.images.length === 9) ? toast.error("Only 9 images allowed.") : this.validateFile(files[0]);
    }

    validateFile(file) {
        let filename = file.name;
        let reg = /(\.png|\.jpeg|\.jpg)$/i;
        let extension = reg.exec(filename);
        if (!extension) {
            this.setState({ show_message: true, message: " Only image supported (.png,.jpg etc).." })
            console.warn("Image extension not supported!");
        } else {
            let newState = this.state;
            newState['show_message'] = false;
            newState['message'] = "";
            newState['images'].push(file);
            newState['file_type'] = extension[1];
            this.setState(newState);
        }
    }
    closingRequest() { }

    render() {
        const actions = [
            <FlatButton label="Submit" primary={true} onTouchTap={this.handleClose.bind(this, 'submit')} disabled={this.props.obj.inProcess} />,
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose.bind(this, 'cancel')} disabled={this.props.obj.inProcess} />,
        ];
        return (<Dialog actions={actions} modal={true}
            open={this.state.open} onRequestClose={this.handleClose}>
            <div className="fieldsWrapper">
                <h3>Add Images</h3>
                <Divider />
                <Dropzone style={{ border: "0px", cursor: 'pointer', marginTop: '5px' }} onDrop={this.onImageDrop.bind(this)}>
                    <div style={Style.dropzoneDiv}>
                        <i className="fa fa-download fa-2x" style={Style.iconColor}></i>
                        <p>Drop here OR click to <b>change</b> assignment</p>
                    </div>
                </Dropzone>
                {/* {(this.props.obj.inProcess === true) ?  <CircularProgress size={30} style={{zIndex:"9999"}}/> : ""} */}
                {(this.state.images.map((image, index) => {
                    return <h4 key={index} className="selectedFile">{index + 1}) {image.name}</h4>
                }))}
                <Divider />
                {((this.props.obj.inProcess === false && this.state.status_code !== 200 && this.state.message !== "" && this.state.message !== null) || this.state.show_message === true) ? <Toast message={this.state.message} bgColor="red" closingRequest={this.closingRequest.bind(this)} /> : ""}
            </div>
            <ToastContainer
                style={{ zIndex: 999999 }}
                position="top-center"
                type="default"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
        </Dialog>);
    }
}


export default ImageUpload;