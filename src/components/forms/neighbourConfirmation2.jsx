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
export default class NeighbourConfirmation2 extends Component {

    render() {
        const { isSubmitting } = this.props;

        return (
            <div className="col-md-6 col-sm-6 col-lg-6" >
                <br />
                <div className="subHeading"><p>Neighbour Confirmation-2</p></div>
                <br />
                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="nameOfPersonMetNB2">Name of the person met:</label>
                    <input type="text" className={validator(this.props.values['nameOfPersonMetNB2'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                        style={{ width: '70%' }} id="nameOfPersonMetNB2" name="nameOfPersonMetNB2" placeholder="Name of the person met"
                        value={this.props.values['nameOfPersonMetNB2']} onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <label htmlFor="addressNB2">Address:</label>
                    <input type="text"
                        className={validator(this.props.values['addressNB2'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                        value={this.props.values['addressNB2']} id="addressNB2" name="addressNB2" placeholder="Address of Neighbour"
                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                </div>

                <div className="form-group" style={{ display: 'flex' }}>
                    <label className={radioBtnValidator(this.props.values['knowTheApplcantNB2'], isSubmitting) ? "displayRadioError" : ""} htmlFor="knowTheApplcantNB2">Does the neighbour know the applicant: </label>
                    <label className="radio-inline"><input type="radio" name="knowTheApplcantNB2" value="yes" checked={this.props.values.knowTheApplcantNB2 === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Yes </label>
                    <label className="radio-inline"><input type="radio" name="knowTheApplcantNB2" value="no" checked={this.props.values.knowTheApplcantNB2 === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> No </label>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label className={selectBoxValidator(this.props.values['residencSinceNB2'], isSubmitting) ? "displaySelectBoxError" : ""} htmlFor="residencSinceNB2">Applicant residing since:</label>
                    <div style={{ width: '70%' }}>
                        <Select
                            id="residencSinceNB2"
                            name="residencSinceNB2"
                            style={{ width: '100%' }}
                            value={this.props.values.residencSinceNB2}
                            options={this.props.constants.residingYears}
                            onChange={(ev) => this.props.selectBoxChangeHandler("residencSinceNB2", ev)}
                            onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                            allowCreate={true}
                            Creatable={true}
                            closeOnSelect={true}
                            noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("residencSinceNB2", "residingYears")} /></div>}
                        />
                    </div>
                    {/* <input type="text" className="form-control displayView" style={{ width: '70%' }} id="residencSinceNB2" name="residencSinceNB2" placeholder="Name of the person met" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                </div>
                <div className="form-group" style={{ display: 'flex' }}>
                    <label className={radioBtnValidator(this.props.values['residencIsNB2'], isSubmitting) ? "displayRadioError" : ""} htmlFor="residencIsNB2">Applicant residence is: </label>
                    <label className="radio-inline"><input type="radio" name="residencIsNB2" value="owend" checked={this.props.values.residencIsNB2 === "owend"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Owned</label>
                    <label className="radio-inline"><input type="radio" name="residencIsNB2" value="rented" checked={this.props.values.residencIsNB2 === "rented"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Rented</label>
                </div>
            </div>
        )

    }
}
