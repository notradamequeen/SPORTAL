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
            houCount: 1,
            Hou: [],
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.addCount                         = this.addCount.bind(this);
        this.UpdateHou                        = this.UpdateHou.bind(this);
        this.handleStartDateChange            = this.handleStartDateChange.bind(this);
        this.handleEndDateChange              = this.handleEndDateChange.bind(this);
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
        console.log('step4', this.props.data)
    }

    handleDOBChange(date) {
        var newdate = date.format("YYYY-MM-DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: date
        });
        this.props.changeState('Date_of_Birth__c', newDate)
    }
    handleStartDateChange(date) {
        var newdate = date.format("YYYY-MM-DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.props.changeState('Employment_Start_Date__c', newDate)
    }
    handleEndDateChange(date) {
        var newdate = date.format("YYYY-MM-DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.props.changeState('Employment_End_Date__c', newDate)
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
        this.state.Hou.push({RecordType: 'Household Member'})
    }
    updateMain(){

    }
    UpdateHou(event){
        const HouList = this.state.Hou
        HouList[Number(event.target.id.match(/\d+/)[0])][event.target.name] = event.target.value 
        this.setState({ 
            Hou: HouList
        });
        this.props.changeState('Hou', HouList);
        console.log(this.state)
    }


    render() {
        const update = this.UpdateHou.bind(this);
        const updateMain = this.handleInputChange.bind(this)
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const handleStartDateChange = this.handleStartDateChange.bind(this);
        const handleEndDateChange = this.handleEndDateChange.bind(this)
        const state = this.state
        const props = this.props
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
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="Full_Name__c"
                                    id={`Hou${i}[Full_Name_del__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Fullname"
                                    value={props.data.Full_Name__c}
                                /> :
                                <input
                                    onChange={update}
                                    name="Full_Name__c"
                                    id={`Hou${i}[Full_Name_del__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Fullname"
                                />
                            }
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>NRIC</label>
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="ID_Number__c"
                                    id={`Hou${i}[ID_Number__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Nric "
                                    value={props.data.ID_Number__c}
                                /> :
                                <input
                                    onChange={update}
                                    name="ID_Number__c"
                                    id={`Hou${i}[ID_Number__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Nric "
                                /> 
                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Relationship to Applicant</label>
                            {i == 0 ? 
                                <select
                                    name="Relationship_to_Applicant__c"
                                    id="Hou[0][Relationship_to_Applicant__c]" 
                                    className="form-control relation1"
                                    onChange={updateMain}
                                >
                                    <option value="Self" selected>Self</option>
                                </select>
                                :
                                <select
                                    name="Relationship_to_Applicant__c"
                                    id={`Hou${i}[Relationship_to_Applicant__c]`} 
                                    className="form-control relation1"
                                    onChange={update}
                                >
                                    <option value="Self">Self</option>
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
                                    <option value="Wife">Wife</option>
                                    <option value="Husband">Husband</option>
                                </select>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            {i == 0 ? 
                                <DatePicker
                                    name="Date_of_Birth__c"
                                    selected={moment(props.data.Date_of_Birth__c)}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={handleDOBChange} 
                                    placeholderText="Date of Birth"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                /> :
                                <DatePicker
                                    name="Date_of_Birth__c"
                                    selected={moment(props.data.Date_of_Birth__c)}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={update} 
                                    placeholderText="Date of Birth"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Gross Monthly Income <a href="#" data-toggle="tooltip" title="The gross household income of the individual">
                                <img src={require('../../assets/img/question.png')} width="15px" /></a>
                            </label>
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="Monthly_Gross_Income__c"
                                    id={`Hou${i}[Monthly_Gross_Income__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Montly Income" 
                                /> :
                                <input
                                    onChange={update}
                                    name="Monthly_Gross_Income__c"
                                    id={`Hou${i}[Monthly_Gross_Income__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Montly Income"
                                />
                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment Status</label>
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="Employment_Status__c"
                                    id={`Hou${i}[Employment_Status__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Employment Status" 
                                /> :
                                <input
                                    onChange={update}
                                    name="Employment_Status__c"
                                    id={`Hou${i}[Employment_Status__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Employment Status" 
                                />
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Occupation</label>
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="Occupation__c"
                                    id={`Hou${i}[Occupation__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Occupation__c" 
                                /> :
                                <input
                                    onChange={update}
                                    name="Occupation__c"
                                    id={`Hou${i}[Occupation__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Occupation__c" 
                                />
                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Company</label>
                            {i == 0 ? 
                                <input
                                    onChange={updateMain}
                                    name="Company__c"
                                    id={`Hou${i}[Company__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Company" 
                                /> :
                                <input
                                    onChange={update}
                                    name="Company__c"
                                    id={`Hou${i}[Company__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Company"
                                />

                            }
                            
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment Start Date</label>
                            {i == 0 ? 
                                <DatePicker
                                    name="Employment_Start_Date__c"
                                    selected={moment(props.data.Employment_Start_Date__c)}
                                    id={`Hou${i}[Employment_Start_Date__c]`}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={handleStartDateChange} 
                                    placeholderText="Employment Start Date"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                /> :
                                <DatePicker
                                    name="Employment_Start_Date__c"
                                    selected={state.dob}
                                    id={`Hou${i}[Employment_Start_Date__c]`}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={update} 
                                    placeholderText="Employment Start Date"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Employment End Date</label>
                            {i == 0 ? 
                                <DatePicker
                                    name="Employment_End_Date__c"
                                    selected={moment(props.data.Employment_End_Date__c)}
                                    id={`Hou${i}[Employment_End_Date__c]`}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={handleEndDateChange} 
                                    placeholderText="Employment End Date"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                /> :
                                <DatePicker
                                    name="Employment_End_Date__c"
                                    selected={state.dob}
                                    id={`Hou${i}[Employment_End_Date__c]`}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={update} 
                                    placeholderText="Employment End Date"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            }
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
