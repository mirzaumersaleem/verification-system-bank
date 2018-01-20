import React, { Component } from "react";
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router';
import Moment from 'react-moment';

// Material UI import
import { RaisedButton, Card, CardHeader, CardText } from 'material-ui';
// import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import AssignmentIcon from 'material-ui/svg-icons/action/assignment';

// Actions
import { FileActions } from '../store/actions/file';
import { AuthActions } from '../store/actions/auth';
import { InstituteActions } from '../store/actions/institute';
import { AssignmentActions } from '../store/actions/assignment';

// Style
import Style from '../styles/style';
import '../styles/css.css';

// Custom components
import SendRequestInsituteDrawer from '../components/sendRequestInstituteDrawer';
import SubmitAssignmentDialog from '../components/submitAssignmentDialog';
import Announcement from '../components/announcements';
import Toast from '../components/toast';
// import Header from './header';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.sendRequestToInstitute = this.sendRequestToInstitute.bind(this);
        this.closeRequestInstitueDrawer = this.closeRequestInstitueDrawer.bind(this);
        this.state = {
            openSendRequestDrawer: false,
            fileToUpload: "",
            imageUpload: false,
            user: {},
            pending_assignments: [],
            file_type: "",
            assignment: {},

        }
    }

    componentDidMount() {
        const application = this.props || JSON.parse(localStorage.getItem('state'));
        if (!application.user || (application.user && Object.keys(application.user).length === 0))
            this.props.history.push('/signin')
        else {
            this.getPendingAssignments();
            this.setState({ user: application.user });
        }
    }

    componentWillReceiveProps(newProps) {
        // if (newProps.assignments.length > 0 && newProps.pending === true) {
        //     let filteredAssignments = [];
        //     if (newProps.submitted_assignments && newProps.submitted_assignments.length > 0) {
        //         if (newProps.pending_assignments && newProps.pending_assignments.length === 0) {
        //             filteredAssignments = newProps.assignments.filter((assignment) => {
        //                 return newProps.submitted_assignments.filter((submitted) => {
        //                     if (assignment['_id'] !== submitted['assignment_id']) {
        //                         console.log(assignment['_id'] !== submitted['assignment_id'])
        //                         console.log(assignment['_id'])
        //                         console.log(submitted['assignment_id'])
        //                         return assignment
        //                     }
        //                 })
        //             })
        //             this.props.setPendingAssignments(filteredAssignments);
        //         } else filteredAssignments = newProps.pending_assignments;
        //     } else if (newProps.submitted_assignments && newProps.submitted_assignments.length === 0)
        //         filteredAssignments = newProps.assignments;
        //     this.setState({ pending_assignments: filteredAssignments })
        //     console.log("filteredAssignments", filteredAssignments);
        // }
    }


    searchInSubmittedAssignments(submitted_assignments, assignment_id) {
        return submitted_assignments.find((submitted) => {
            return (assignment_id === submitted['assignment_id'])
        })

    }

    getPendingAssignments() {
        let assignments = this.props.assignments;
        let submitted_assignments = this.props.submitted_assignments;
        // let p_assignments = this.props.pending_assignments || [];
        if (assignments && assignments.length > 0 && this.props.pending === true) {
            let filteredAssignments = [];
            if (submitted_assignments && submitted_assignments.length > 0) {
                filteredAssignments = assignments.filter((assignment) => {
                    if (!this.searchInSubmittedAssignments(submitted_assignments, assignment['_id'])) return assignment
                })
                this.props.setPendingAssignments(filteredAssignments);
            } else if (submitted_assignments && submitted_assignments.length === 0)
                filteredAssignments = assignments;
            let newState = this.state;
            newState['pending_assignments'] = filteredAssignments.slice(0);
            this.setState(newState);
        }
    }

    onImageDrop(files) {
        this.validateFile(files[0]);
        // this.handleImageUpload(files[0]);
    }

    sendRequestToInstitute() {
        this.setState({ openSendRequestDrawer: true });
        this.getInstitutes();
    }

    closeRequestInstitueDrawer() {
        this.setState({ openSendRequestDrawer: false });
    }

    closeDialogHandler(type, obj) {
        console.log(type, obj)
        if (type === 'submit') {
            obj['student_id'] = this.state.user['_id'];
            obj['institute_id'] = this.state.user['institute_id'];
            this.props.submitAssignment(obj)
        } else this.setState({ message: "", show_message: false, fileToUpload: "" })
    }

    validateFile(file) {
        let filename = file.name;
        // let fileToLoad = file;
        let reg = /(\.rar|\.zip|\.txt)$/i;
        let extension = reg.exec(filename);
        if (!extension) {
            this.setState({ show_message: true, message: " Only archive file supported (.zip etc)." })
            console.warn("File extension not supported!");
        } else {
            this.getPendingAssignments();
            let newState = this.state;
            newState['show_message'] = false;
            newState['message'] = "";
            newState['assignment']['selectedFileName'] = filename;
            newState['file_type'] = extension[1];
            newState['fileToUpload'] = file;
            this.setState(newState)
            // this.props.sendFileData(file);
            // let fileReader = new FileReader();
            // fileReader.onload = function (fileLoadedEvent) {
            //     let blob = fileLoadedEvent.target.result;
            //     let obj = {
            //         name: filename,
            //         type: extension,
            //         blob: blob
            //     }
            //     this.props.sendFileData(blob);
            // }.bind(this);
            // fileReader.readAsDataURL(fileToLoad);
            // fileReader.readAsText(fileToLoad);
        }
    }

    joiningRequest(obj) {
        obj['student_id'] = this.props.user._id;
        this.props.joiningRequest(obj);

    }

    conditionalRender(type) {
        if (type === ".zip" || type === ".rar")
            return <i className="fa fa-file-archive-o fa-5x" style={Style.iconColor}></i>
        else if (type === ".pdf")
            return <i className="fa fa-file-pdf-o fa-5x" style={Style.iconColor}></i>
        else if (type === ".jpeg" || type === ".jpg" || type === ".png" || type === ".bmp")
            return <i className="fa fa-file-image-o fa-5x" style={Style.iconColor}></i>
        else if (type === ".docx" || type === "doc")
            return <i className="fa fa-file-word-o fa-5x" style={Style.iconColor}></i>
        else if (type === ".txt")
            return <i className="fa fa-file-text-o fa-5x" style={Style.iconColor}></i>
        else if (type === ".html" || type === "js")
            return <i className="fa fa-file-code-o fa-5x" style={Style.iconColor}></i>
        else
            return <i className="fa fa-file-o fa-5x" style={Style.iconColor}></i>
    }

    renderAssignments(assignments) {
        return assignments.map((assi, index) => {
            return (
                <Card className="cardStyle" key={index}>
                    <CardHeader className="cardHeaderStyle" titleStyle={Style.cardHeaderTitle} title={assi['title']} subtitle={<Moment format="ll">{assi['uploadedAt']}</Moment>} />
                    <CardText>
                        {this.conditionalRender(assi['type'])}
                    </CardText>
                </Card>
            )
        })
    }

    getInstitutes() {
        this.props.getAllInstitutes('all', 'all')
    }

    closingRequest() { }

    render() {
        let announcements = this.props.announcements || [];
        const submitted_assignments = this.props.submitted_assignments || [];
        const inProcess = this.props.isLoading;
        let user = this.state.user;
        let institute = this.props.institute;
        let requestIntituteDrawer = (this.state.openSendRequestDrawer === true) ? <SendRequestInsituteDrawer open={this.state.openSendRequestDrawer} institutes={this.props.institutes} close={this.closeRequestInstitueDrawer} joining={this.joiningRequest.bind(this)} inProcess={inProcess} /> : '';
        let condition = (user !== null && Object.keys(user).length > 0 && user['institute_id'] !== "" && this.props.institute_request && Object.keys(this.props.institute_request).length > 0 && this.props.institute_request['approval'] !== "approved");
        let check_institute = (user !== null && Object.keys(user).length > 0 && user['institute_id'] === "") ? <div className="add_institute"> Please Join an institute first!!</div> :
            condition ? <div className="add_institute_info"> Sorry! Your request still needs to be approved.</div> : ""
        const show_toast = (this.state.show_message === true && this.state.fileToUpload === "") ? <Toast message={this.state.message} bgColor="red" closingRequest={this.closingRequest.bind(this)} /> : false;
        const obj = { inProcess: inProcess, message: this.props.message, code: this.props.code }
        return (
            <div>
                {/* // <Paper zDepth={1}> */}
                {check_institute}
                <div style={{ display: 'flex' }}>
                    <div style={Style.cardWrapper}>
                        {(!condition) ?
                            <Card className="cardStyle dropCard" key="0">
                                {/* <CardHeader title="Without Avatar" subtitle="Subtitle" /> */}
                                <Dropzone onDrop={this.onImageDrop.bind(this)} style={{ border: "0px" }}>
                                    <CardText>
                                        <div style={Style.cardTextDiv}>
                                            Drop assignments here OR click to upload
                                        <i className="fa fa-plus fa-5x" style={{ color: 'gray' }}></i>
                                        </div>
                                    </CardText>
                                </Dropzone>
                            </Card> : ""}
                        {(submitted_assignments && submitted_assignments.length > 0) ? this.renderAssignments(submitted_assignments) : ""}
                    </div>
                    <div style={{ flex: 1, marginLeft: '1em' }}>
                        <Announcement obj={announcements} institute={institute} />
                    </div>
                </div>
                {requestIntituteDrawer}
                {(this.state.user && this.state.user['institute_id'] === "") ?
                    <div className="sendRequestBtnDiv">
                        <RaisedButton label="Join an Institute" icon={<i className="fa fa-paper-plane"></i>} className="sendRequestBtn" primary={true} onTouchTap={this.sendRequestToInstitute} />
                    </div> : ""}

                {show_toast}
                {(this.state.show_message === false && this.state.fileToUpload !== "" && this.state.message === "") ? <SubmitAssignmentDialog open={!this.state.show_message} pending_assignments={this.state.pending_assignments} file={this.state.fileToUpload} file_type={this.state.file_type} close={this.closeDialogHandler.bind(this)} obj={obj} /> : ""}
            </div>
        );
    }
}

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return state.authReducer
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // dispatch(LoadActions.loadState())

    return {
        sendFileData: (file) => dispatch(FileActions.uploadFile(file)),
        uploadImage: (image) => dispatch(FileActions.uploadImage(image)),
        logout: () => dispatch(AuthActions.logout()),
        joiningRequest: (obj) => dispatch(InstituteActions.joiningRequest(obj)),
        // loadState: () => dispatch(LoadActions.loadState()),
        // loadInitialState: () => dispatch(LoadActions.loadInitialState()),
        checkInstitute: (institute_id, id) => dispatch(InstituteActions.checkInstitute(institute_id, id)),
        getAssignments: (flag, institute_id) => dispatch(AssignmentActions.getAssignment(flag, institute_id)),
        getSubmittedAssignments: (flag, institute_id, student_id) => dispatch(AssignmentActions.getSubmittedAssignments(flag, institute_id, student_id)),
        submitAssignment: (obj) => dispatch(AssignmentActions.submitAssignment(obj)),
        setPendingAssignments: (filteredAssignments) => dispatch(AssignmentActions.setPendingAssignments(filteredAssignments)),
        getInstitute: (flag, id) => dispatch(InstituteActions.getInstitute(flag, id)),
        getAllInstitutes: (flag, id) => dispatch(InstituteActions.getAllInstitutes(flag, id)),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentDashboard));