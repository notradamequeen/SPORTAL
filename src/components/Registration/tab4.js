import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';

import 'react-datepicker/dist/react-datepicker.css';

class Tab4 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: moment(),
            houCount: 1
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.addCount                         = this.addCount.bind(this);
        this.UpdateBen                        = this.UpdateBen.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    inputChangeHandler(event) {
        //this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name],event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleInputChange(event) {
        this.props.changeState([event.target.name],event.target.value);
    }

    handleDOBChange(date) {
        var newdate = date.format("YYYY/MM/DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: date
        });
        //console.log( date.format("DD/MM/YYYY"));
        //alert('aaaa');
    }

    componentWillMount(){
        console.log(this.props);
    }

    componentDidMount() {
    }

    addCount(){
        this.setState({
            houCount: (this.state.houCount+1)
        });
    }

    UpdateBen(){
        var data = Array();
        $(".fullh").each(function() {
            data.push($(this).find('select, textarea, input').serializeArray());
        })
        this.props.changeState('Hou', data);
    }


    render() {
        const update = this.UpdateBen.bind(this);
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const state = this.state
        return (
            <div className="col-md-12" id="Tab4">
        <h5 className="info-text">Main Applicant</h5>
        {Array.apply(0, Array(this.state.houCount)).map(function (x, i) {
            return (
                <div className="fullh">
                    <div className="row ">
                    <p>Member - 1</p>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Name <small>(required)</small></label>
                            <input onChange={update} name="Full_Name_del__c" id="Hou[0][Full_Name_del__c]" type="text" className="form-control" placeholder="Fullname" /> 
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>NRIC</label>
                            <input onChange={update} name="ID_Number__c" id="Hou[0][ID_Number__c]" type="text" className="form-control" placeholder="Nric " />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Relationship to Applicant</label>
                            <select name="Relationship_to_Applicant__c" id="Hou[0][Relationship_to_Applicant__c]" className="form-control relation1">
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Step son">Step Son</option>
                                <option value="Step daughter">Step Daughter</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Grandfather">Grandfather</option>
                                <option value="Grandmother">Grandmother</option>
                                <option value="Step father">Step Father</option>
                                <option value="Step mother">Step Mother</option>
                                <option value="Self">Self</option>
                                <option value="Wife">Wife</option>
                                <option value="Husband">Husband</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <DatePicker
                                name="dob"
                                selected={state.dob}
                                dateFormat="DD/MM/YYYY"
                                onChange={update} 
                                placeholderText="Date of Birth"
                                className="form-control fullw"
                                showYearDropdown
                                showMonthDropdown
                            />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Gross Monthly Income <a href="#" data-toggle="tooltip" title="The gross household income of the individual"><img src="assets/img/question.png" width="15px" /></a></label>
                            <input
                                onChange={update}
                                name="Monthly_Gross_Income__c"
                                id="Hou[0][Monthly_Gross_Income__c]"
                                type="text"
                                className="form-control"
                                placeholder="Montly Income" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment Status</label>
                            <input
                                onChange={update}
                                name="Employment_Status__c"
                                id="Hou[0][Employment_Status__c]"
                                type="text"
                                className="form-control"
                                placeholder="Employment Status" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Occupation</label>
                            <input
                                onChange={update}
                                name="Occupation__c"
                                id="Hou[0][Occupation__c]"
                                type="text"
                                className="form-control"
                                placeholder="Occupation__c" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                onChange={update}
                                name="Company__c"
                                id="Hou[0][Company__c]"
                                type="text"
                                className="form-control"
                                placeholder="Company" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment Start Date</label>
                            <DatePicker
                                name="Employment_Start_Date__c"
                                selected={state.dob}
                                dateFormat="DD/MM/YYYY"
                                onChange={update} 
                                placeholderText="Employment Start Date"
                                className="form-control fullw"
                                showYearDropdown
                                showMonthDropdown
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment End Date</label>
                            <DatePicker
                                name="Employment_End_Date__c"
                                selected={state.dob}
                                dateFormat="DD/MM/YYYY"
                                onChange={update} 
                                placeholderText="Employment End Date"
                                className="form-control fullw"
                                showYearDropdown
                                showMonthDropdown
                            />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <input
                                onChange={update}
                                type="file"
                                className="form-control-file"
                                id="mla1"
                                aria-describedby="fh1" />
                            <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format: jpg, png, pdf only </small>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <input onChange={update} type="file" className="form-control-file" id="mlb1" aria-describedby="gh1" />
                            <small id="gh1" className="form-text text-muted">Income Statement Receipt,  format: jpg, png, pdf only </small>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
        })}
        <br />
        <center>
            <button onClick={this.addCount} className="btn btn-primary">Add more household member</button>
        </center>
        <br />
        <div className="row">	
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Reason/s for not having an income earner / Having one income earner:</label>
                        <div className="row col-md-12">
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-1"
                                    type="checkbox"
                                    value="Alcoholism"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} /> 
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-1">Alcoholism</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-2"
                                    type="checkbox"
                                    value="Cultural or personal belief"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-2">Cultural or personal belief</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-3"
                                    type="checkbox"
                                    value="Social Visit Pass"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Social Visit Pass</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-1"
                                    type="checkbox"
                                    value="Chronic illness"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-1">Chronic illness</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-2"
                                    type="checkbox"
                                    value="Gambling addiction"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-2">Gambling addiction</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-3"
                                    type="checkbox"
                                    value="Temporarily unfit for work"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Temporarily unfit for work</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-3"
                                    type="checkbox"
                                    value="Disability"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Disability</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-3"
                                    type="checkbox"
                                    value="Low education"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Low education</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option">
                                <input
                                    onChange={update}
                                    id="checkbox-able-3"
                                    type="checkbox"
                                    value="Drug addiction"
                                    name="reason[]"
                                    disabled={state.houCount > 1 ? true : false} />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Drug addiction</label>
                            </div>
                        </div>	
                    </div>
                    <div className="col-sm-12">
                        <div className="col-md-4">
                            <label>Another Reason</label>
                            <input
                                onChange={update}
                                name="another_reason"
                                type="text"
                                className="form-control"
                                placeholder="Please Specify if exist"
                                disabled={state.houCount > 1 ? true : false} />
                        </div>
                    </div>
                </div>
            </div>
    </div>)
    }
}

Tab4.propTypes = {
    title: PropTypes.string
};
Tab4.defaultProps = {
    title: 'Tab4 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab4);
