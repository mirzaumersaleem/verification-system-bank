import React, { Component } from 'react';
/** React select box */
import Select, { Creatable } from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
/* Material UI */
import { RaisedButton } from 'material-ui';
/* import validator functions to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'

import './formStyles.css'
export default class NeighbourConfirmation extends Component {

    render() {
        const { isSubmitting } = this.props;
        return (
            <div className="col-md-6 col-sm-6 col-lg-6" >
                <br />
                <div className="subHeading"><p>Neighbour Confirmation-1</p></div>
                <br />
                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="nameOfPersonMetNB1">Name of the person met:</label>
                    <input type="text" className={validator(this.props.values['nameOfPersonMetNB1'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                        style={{ width: '70%' }} id="nameOfPersonMetNB1" name="nameOfPersonMetNB1" placeholder="Name of the person met"
                        value={this.props.values['nameOfPersonMetNB1']} onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <label htmlFor="addressNB1">Address:</label>
                    <input type="text" className={validator(this.props.values['addressNB1'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                        value={this.props.values['addressNB1']} id="addressNB1" name="addressNB1" placeholder="Address of Neighbour"
                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                </div>

                <div className="form-group" style={{ display: 'flex' }}>
                    <label className={radioBtnValidator(this.props.values['knowTheApplcantNB1'], isSubmitting) ? "displayRadioError" : ""} htmlFor="knowTheApplcantNB1">Does the neighbour know the applicant: </label>
                    <label className="radio-inline"><input type="radio" name="knowTheApplcantNB1" value="yes" checked={this.props.values.knowTheApplcantNB1 === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Yes </label>
                    <label className="radio-inline"><input type="radio" name="knowTheApplcantNB1" value="no" checked={this.props.values.knowTheApplcantNB1 === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> No </label>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label className={selectBoxValidator(this.props.values['residencSinceNB1'], isSubmitting) ? "displaySelectBoxError" : ""} htmlFor="residencSinceNB1">Applicant residing since:</label>
                    <div style={{ width: '70%' }}>
                        <Select
                            id="residencSinceNB1"
                            name="residencSinceNB1"
                            style={{ width: '100%' }}
                            value={this.props.values.residencSinceNB1}
                            options={this.props.constants.residingYears}
                            onChange={(ev) => this.props.selectBoxChangeHandler("residencSinceNB1", ev)}
                            onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                            allowCreate={true}
                            Creatable={true}
                            closeOnSelect={true}
                            noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("residencSinceNB1", "residingYears")} /></div>}
                        />
                    </div>
                    {/* <input type="text" className="form-control displayView"  style={{width:'70%'}} id="residencSinceNB" name="residencSinceNB" placeholder="Name of the person met" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                </div>
                <div className="form-group" style={{ display: 'flex' }}>
                    <label className={radioBtnValidator(this.props.values['residencIsNB1'], isSubmitting) ? "displayRadioError" : ""} htmlFor="residencIsNB1">Applicant residence is: </label>
                    <label className="radio-inline"><input type="radio" name="residencIsNB1" value="owend" checked={this.props.values.residencIsNB1 === "owend"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Owned</label>
                    <label className="radio-inline"><input type="radio" name="residencIsNB1" value="rented" checked={this.props.values.residencIsNB1 === "rented"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Rented</label>
                </div>
            </div>
        )

    }
}
