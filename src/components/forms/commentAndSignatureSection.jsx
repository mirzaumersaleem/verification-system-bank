import React, { Component } from 'react';
import './formStyles.css'

/* import validator functions to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'

// impirt matrial UI
import DatePicker from 'material-ui/DatePicker';



export default class CommentAndSignature extends Component {
    render() {
        console.log(this.props.values['givenDate'])
        console.log(this.props.values['dileveryDate'])
        console.log(!this.props.values['dileveryDate'] || !this.props.values['givenDate'])
        const { isSubmitting } = this.props;
        return (
            <div>

                <div className="form-group">
                    <label htmlFor="comment">EAMU Comments:</label>
                    <textarea className={validator(this.props.values['comment'], 3, isSubmitting) ? "form-control commentBox notes displayErrorView" : "form-control commentBox notes displayView"}
                        rows="5" id="comment" value={this.props.values['comment']} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.id, ev.target.value)} ></textarea>
                </div>
                <br />

                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['verification'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="verification">Result of verfication:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="verification" id="verification" value="positive" checked={this.props.values.verification === "positive"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Positive</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="verification" id="verification" value="negative" checked={this.props.values.verification === "negative"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Negative</label>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="signaturebox">
                    <div className="singleSigntop"></div>
                    <div >
                        <DatePicker
                            id="dateOfVisit" name="dateOfVisit"
                            value={this.props.values.dateOfVisit}
                            className={selectBoxValidator(this.props.values['dateOfVisit'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"}
                            placeholder="Date of Visit"
                            autoOk={true}
                            disabled={!this.props.values['dileveryDate'] || !this.props.values['givenDate']}
                            onChange={(ev, date) => this.props.radioBtnChangeHandler("dateOfVisit", date)}
                            minDate={this.props.values['givenDate']}
                            maxDate={this.props.values['dileveryDate']}


                        />
                        {/* <input type="date"
                            className={validator(this.props.values['dateOfVisit'], 3, isSubmitting) ? "displayErrorView" : ""}
                            name="dateOfVisit" id="dateOfVisit" onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.id, ev.target.value)} /><br /> */}
                    </div>
                    <div className="singleSigntop"></div>
                </div>

                <div className="signaturebox">
                    <div className="singleSign">VA Signature.</div>
                    <div >
                        {/* <DatePicker
                                id="dateOfVisit" name="dateOfVisit"
                                
                                className={selectBoxValidator(this.props.values['dateOfVisit'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"}
                                placeholder="Date of Visit" 
                                autoOk={true}
                                onChange= {(ev,date) => this.props.radioBtnChangeHandler("dateOfVisit", date)}
                                maxDate={this.props.maxDate}
                                minDate={this.props.minDate}
                                
                                
                                /><br/><br/> */}
                        {/* <input type="date"
                            className={validator(this.props.values['dateOfVisit'], 3, isSubmitting) ? "displayErrorView" : ""}
                            name="dateOfVisit" id="dateOfVisit" onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.id, ev.target.value)} /><br /> */}
                        <div><label htmlFor="singleSign">Date of Visit.</label></div>
                    </div>
                    <div className="singleSign">Checked By</div>
                </div>
            </div>
        )

    }
}