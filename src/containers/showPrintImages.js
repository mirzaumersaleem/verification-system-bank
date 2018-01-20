import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import domtoimage from 'dom-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Material UI import
import { RaisedButton, FloatingActionButton } from 'material-ui';

// Actions
import { UserActions, FileActions } from '../store/actions';

import $ from 'jquery'
// Style
import '../styles/css.css';

class ShowPrintImage extends Component {
    constructor(props) {
        super(props);
        this.state = { form: {}, imag: null, flag: false };
        this.paramKey = this.props.location.pathname.split('/').pop();
        this.imageUploadingFor = this.props.location.search.split('=').pop();
        // this.props.getCustomerFormData(this.paramKey, this.query);
        this.sendImages = this.sendImages.bind(this)

    }
    componentWillMount() {
        if (!this.props.user || Object.keys(this.props.user).length === 0 || !this.props.images || Object.keys(this.props.images).length === 0) {
            this.props.history.push('/admin')
        }
    }
    componentWillReceiveProps(newProps) {
        if (this.state.flag === true && Object.keys(newProps.images).length > 0 && newProps.message && newProps.code === 200) {
            this.props.resetImages();
            this.props.resetForm();
            this.setState({ flag: false }, this.props.history.push('/admin'));
        } else if (this.state.flag === true && Object.keys(newProps.images).length > 0 && !newProps.message && !newProps.code && newProps.isLoading === false) {
            this.setState({ flag: this.state.flag });
            toast.error("Oops, Please try again.");

        }
    }

    componentDidMount() {
        // this.setState({images:this});
    }
    sendImages() {
        let self = this;
        domtoimage.toPng(document.getElementById('rootValue'))
            .then(function (dataUrl) {
                const currentUser = self.props.customers.find((customer) => { return customer['key'] === self.paramKey });
                console.log(self.imageUploadingFor == "Residence", self.imageUploadingFor);
                const keyToSet = (self.imageUploadingFor == "Residence") ? "residence" : (self.imageUploadingFor == "Office") ? "office" : "";
                const revision = (self.imageUploadingFor == "Residence") ? currentUser['residenceImageRevise'] : currentUser['officeImageRevise'];
                console.log(keyToSet);
                const obj = {
                    userId: self.paramKey,
                    url: keyToSet + "ImageUrl",
                    public_id: self.paramKey + revision + keyToSet + "ImageUrl",
                    status: keyToSet,
                    revision: revision + 1,
                    revisionName: (self.imageUploadingFor == "Residence") ? 'residenceImageRevise' : 'officeImageRevise'
                }
                self.props.uploadFile(dataUrl, obj);
                self.setState({ imag: dataUrl, flag: true })
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
                toast.error("Oops, Please try again.");
            });
    }
    imageSize(images) {
        if (images.length >= 7 && images.length <= 9) {
            return { width: '225px', height: '280px' }
        } else if (images.length >= 4 && images.length <= 6) {
            return { width: '225px', height: '330px' }
        } else if (images.length === 3) {
            return { width: '500px', height: '280px' }
        } else if (images.length === 2) {
            return { width: '500px', height: '330px' }
        } else if (images.length === 1) {
            return { width: '550px', height: '400px' }
        }
    }
    toggleForm() {
        this.props.history.push('/admin');
    }
    render() {
        const { images } = this.props;
        return (
            <div style={{ textAlign: 'center', width: '700px', boxAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ position: 'fixed', top: '24px', left: '30px' }}>
                    <FloatingActionButton mini backgroundColor="white" iconStyle={{ color: 'gray' }} onClick={this.toggleForm.bind(this)} disabled={this.state.flag} >
                        <i className="fa fa-arrow-left"></i>
                    </FloatingActionButton>
                </div>
                <div id="rootValue" style={{ width: '690px', height: "880px", border: '1px solid gray', padding: '5px', textAlign: 'center' }}>

                    {images.map((image, index) => {
                        return <img key={index} src={image.preview} style={this.imageSize(images)} />
                    })}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <RaisedButton label="Print" icon={<i className="fa fa-print"></i>} onTouchTap={this.sendImages.bind(this)} disabled={this.state.flag} />
                </div>
                <ToastContainer
                    style={{ zIndex: 999999 }}
                    position="top-center"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </div>
        );
    }
}
// export default Profile;

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return (state.userReducer)
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCustomerFormData: (key, type) => dispatch(UserActions.getCustomerFormData(key, type)),
        uploadFile: (dataUrl, obj) => dispatch(FileActions.uploadFile(dataUrl, obj)),
        resetForm: () => dispatch(FileActions.resetForm()),
        resetImages: () => dispatch(FileActions.resetImages()),
        // updateUserInfo: (user) => {
        //     dispatch(AuthActions.updateUser(user))
        // }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPrintImage));