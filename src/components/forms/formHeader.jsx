import React, { Component } from 'react';
// import ApplicantDetailsForm from './applicantDetailsForm'
import './formStyles.css'
export default class FormHeader extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2">

                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8 " style={{ textAlign: "center" }}>
                        <h1>DATA COLLECION SERVICES</h1>
                        <h4>E-mail: karachi@dcspakistan.com</h4>
                        <h1>EV FORM - APPLICANT</h1>
                        <h2>({this.props.type})</h2>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2">

                    </div>
                </div>
            </div>
        )

    }
}
