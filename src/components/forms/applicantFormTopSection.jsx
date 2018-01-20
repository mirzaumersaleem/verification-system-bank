import React, { Component } from 'react';
/**
 * React select box
 */
import Select, { Creatable } from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
/**
 * Material UI
 */

import DatePicker from 'material-ui/DatePicker';
import { RaisedButton } from 'material-ui';
/* import validator function to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'
import './formStyles.css'







export default class ApplicantFormTopSection extends Component {

  
    


    // handleDatePicker(ev, date) {

        
        // let newAssignment = this.state.assignment;
        // newAssignment["due_date"] = date;
        // this.setState(newAssignment);
    // }





    render() {
        console.log(this.props.minDate)
        console.log(this.props.maxDate)
        const { isSubmitting } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        {(this.props.type === "Residence") ?
                            <div className="form-group">
                                <label className="col-sm-4" htmlFor="noOfVisits">No. of Visits:</label>
                                <div className="col-sm-8">
                                    <input type="number"
                                        className={validator(this.props.values['noOfVisits'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="noOfVisits" name="noOfVisits" placeholder="No. of Visits" value={this.props.values.noOfVisits}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div> :
                            <div className="form-group">
                                <label className="col-sm-4 col-md-4 col-lg-4" htmlFor="visitTime">Visit Time:</label>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <input type="time"
                                        className={validator(this.props.values['visitTime'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="visitTime" name="visitTime" placeholder="Visit Time" value={this.props.values.visitTime}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="hidden-sm col-md-2 col-lg-4">

                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4">

                        <div className="form-group">
                            <label className={selectBoxValidator(this.props.values['branch'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"} htmlFor="branch">Branch:</label>
                            <div className="col-sm-8">
                                <Select
                                    id="branch"
                                    value={this.props.values.branch}
                                    name="branch"
                                    options={this.props.constants.branches}
                                    onChange={(value) => this.props.selectBoxChangeHandler("branch", value)}
                                    onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                    allowCreate={true}
                                    Creatable={true}
                                    closeOnSelect={true}
                                    noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("branch", "branches")} /></div>}
                                />
                                {/* <input type="text" className="form-control displayView" id="branch" name="branch" placeholder="Branch" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                            </div>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="ccol-sm-6 col-md-5 col-lg-4">
                        <div className="form-group">
                            <label className="col-sm-5" htmlFor="givenDate">VA Given Date:</label>
                            <div className="col-sm-7">
                                    {/* <input type="date" id="StartDate"/> */}
                                    <DatePicker
                                        value={this.props.values.givenDate}
                                        id="givenDate" name="givenDate"
                                        autoOk={true}
                                        className={selectBoxValidator(this.props.values['givenDate'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"}
                                        onChange={(event ,date) => {this.props.handleChangeMinDate(event ,date ,"givenDate")}}
                                        minDate={this.props.minDate}
                                        placeholder="VA Given Date" 
                                        
                                    />
                                {/* <DatePicker hintText="Due Date" className='DatePickerCustom' minDate={this.state.minDate} /> */}
                                    
                                {/* <input type="date"
                                    className={validator(this.props.values['givenDate'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="givenDate" name="givenDate" placeholder="VA Given Date" 
                                    value={this.props.values.givenDate}
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="hidden-sm col-md-2 col-lg-4">

                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4">

                        <div className="form-group">
                            <label className="col-sm-5" htmlFor="applicationNo">Application No.:</label>
                            <div className="col-sm-7">
                                <input type="text"
                                    className={validator(this.props.values['applicationNo'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="applicationNo" name="applicationNo" placeholder="Application No." value={this.props.values.applicationNo} onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
               
               
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <div className="form-group">
                            <label className="col-sm-5" htmlFor="dileveryDate">Va Delivery Date:</label>
                            <div className="col-sm-7">
                            {/* <DatePicker hintText="Due Date" className='DatePickerCustom' minDate={minDate} maxDate={maxDate} value={assignmentObj['due_date']} onChange={this.handleDatePicker.bind(this)} /> */}
                                {/* className={validator(this.props.values['dileveryDate'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"} */}
                            <DatePicker
                                value={this.props.values.dileveryDate}
                                id="dileveryDate" name="dileveryDate"
                                className={selectBoxValidator(this.props.values['dileveryDate'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"}
                                placeholder="Va Delivery Date" 
                                autoOk={true}
                                onChange={(event ,date) => {this.props.handleChangeMaxDate(event ,date ,"dileveryDate")}}
                                minDate={this.props.minDate}
                                maxDate={this.props.maxDate}
                                
                                />
                                {/* <DatePicker hintText="Due Date" className='DatePickerCustom'  maxDate={this.state.maxDate}   /> */}
                            {/* <input type="date" id="EndDate" onBlur={()=>{this.changeDateHandler()}}/> */}
                                {/* <input type="date"
                                    className={validator(this.props.values['dileveryDate'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="dileveryDate" name="dileveryDate" placeholder="Va Delivery Date" 
                                    value={this.props.values.dileveryDate} 
                                    ref = "dileveryDate"
                                    onBlur={()=>{this.changeDateHandler()}}
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="hidden-sm col-md-2 col-lg-4">

                    </div>
                    <div className="col-sm-6 col-md-5 col-lg-4">

                        <div className="form-group">
                            <label className={selectBoxValidator(this.props.values['product'], isSubmitting) ? "col-sm-4 displaySelectBoxError" : "col-sm-4"} htmlFor="product">Product:</label>
                            <div className="col-sm-8">
                                <Select
                                    id="product"
                                    name="product"
                                    value={this.props.values.product}
                                    options={this.props.values.branch === "Meezan Bank" ? this.props.constants.meezanProducts : this.props.constants.islamicProducts}
                                    onChange={(ev) => this.props.selectBoxChangeHandler("product", ev)}
                                    disabled={this.props.values.branch === null ? true : false}
                                    closeOnSelect={true}
                                    Creatable={true}
                                    allowCreate={true}
                                    noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("product", "meezanProducts")} /></div>}
                                    onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
