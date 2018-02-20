import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import { getBase64, regexValidate, validateNRIC } from '../../utils/common';

import 'react-datepicker/dist/react-datepicker.css';

class Tab4 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: moment(),
            houCount: 1,
            Hou: [{}],
            HouFiles: [],
            isValidHouNric: [],
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.addCount                         = this.addCount.bind(this);
        this.UpdateHou                        = this.UpdateHou.bind(this);
        this.handleStartDateChange            = this.handleStartDateChange.bind(this);
        this.handleEndDateChange              = this.handleEndDateChange.bind(this);
        this.uploadHouFile                    = this.uploadHouFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    inputChangeHandler(event) {
        //this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name],event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleInputChange(event) {
        const value = event.target.value
        if (event.target.name == 'ID_Number__c'){
            const isValidId = value !== '' ? validateNRIC(value) : true;
            if(!isValidId) {
                document.getElementById("nric_error0").innerHTML = "invalid NRIC/FIN format"
            } else {
                document.getElementById("nric_error0").innerHTML = ""
            }
            this.props.data.isValidMainNric = isValidId;
        }
        this.props.changeState([event.target.name], value);
        console.log('step4', this.props.data)
    }

    handleDOBChange(date) {
        var newDate = date.format("YYYY-MM-DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: date
        });
        this.props.changeState('Date_of_Birth__c', newDate)
    }
    handleStartDateChange(date) {
        var newDate = date.format("YYYY-MM-DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.props.changeState('Employment_Start_Date__c', newDate)
    }
    handleEndDateChange(date) {
        var newDate = date.format("YYYY-MM-DD").toString();
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
        this.props.data.Hou.push({
            data: {
                Date_of_Birth__c:'',
                Employment_Start_Date__c: '',
                Employment_End_Date__c: '',
            },
            attachment: {},
        })
        this.props.data.isValidHouNric.push('');
    }
    UpdateHou(event){
        const HouList = this.props.data.Hou
        const houIdx = Number(event.target.id.match(/\d+/)[0])
        HouList[houIdx]['data'][event.target.name] = event.target.value 
        if(event.target.name === 'ID_Number__c'){
            let isValidNric = validateNRIC(event.target.value)
            if (!isValidNric) {
                document.getElementById(`hou_nric_error${houIdx}`).innerHTML = 'invalid format NRIC/FIN';
            } else {
                document.getElementById(`hou_nric_error${houIdx}`).innerHTML = '';
            }
            this.props.data.isValidHouNric = isValidNric.toString()
        }
        this.setState({ 
            Hou: HouList
        });
        this.props.changeState('Hou', HouList);
    }
    uploadHouFile(event){
        const hou = this.props.data.Hou[Number(event.target.id.match(/\d+/)[0])]
        const name = event.target.name
        const file = event.target.files[0]
        const prefixFile = {file1: 'Nric_Fin_', file2: 'Income_Receipt_'}
        const fileName = prefixFile[event.target.name] + file.name.replace(/ |-/g, '_')
        const attachment = {
            Name: fileName,
            Body: '',
            parentId: ''
        }
        getBase64(file).then((encodedFile) => {
            attachment.Body = encodedFile.split(',')[1]
            hou['attachment'][name] = attachment
        });
        console.log(hou)
    }

    render() {
        const that = this;
        const update = this.UpdateHou.bind(this);
        const updateMain = this.handleInputChange.bind(this)
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const handleStartDateChange = this.handleStartDateChange.bind(this);
        const handleEndDateChange = this.handleEndDateChange.bind(this)
        const state = this.state
        const props = this.props
        return (
            <div className="col-md-12 print" id="Tab4">
                <h5 className="info-text">Main Applicant</h5>
                {Array.apply(0, Array(this.state.houCount)).map(function (x, i) {
                    return (
                        <div className="fullh" key={i.toString()}>
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
                                        <div>
                                        <input
                                            onChange={updateMain}
                                            name="ID_Number__c"
                                            id={`Hou${i}[ID_Number__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="NRIC "
                                            maxLength="9"
                                            value={props.data.ID_Number__c}
                                        /><br/>
                                        <span id="nric_error0" style={{color: "red"}}></span></div> :
                                        <div>
                                        <input
                                            onChange={update}
                                            name="ID_Number__c"
                                            id={`Hou${i}[ID_Number__c]`}
                                            type="text"
                                            className="form-control"
                                            maxlength="9"
                                            placeholder="NRIC "
                                        /><br/>
                                        <span id={`hou_nric_error${i}`} style={{color: "red"}}></span>
                                        </div>
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
                                            value={props.data.Relationship_to_Applicant__c}
                                        >
                                            {props.data.relationList.map((rel) => {
                                                return (
                                                    <option key={rel.value} value={rel.value}>{rel.label}</option>
                                                );
                                            })}
                                        </select>
                                        :
                                        <select
                                            name="Relationship_to_Applicant__c"
                                            id={`Hou${i}[Relationship_to_Applicant__c]`} 
                                            className="form-control relation1"
                                            onChange={update}
                                        >
                                            {props.data.relationList.map((rel) => {
                                                return (
                                                    <option key={rel.value} value={rel.value}>{rel.label}</option>
                                                );
                                            })}
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
                                            selected={
                                                props.data.Hou[i].data.Date_of_Birth__c !== '' ?
                                                moment(props.data.Hou[i].data.Date_of_Birth__c) : ''
                                            }
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Hou[i].data.Date_of_Birth__c = newDate
                                                that.forceUpdate();}}
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
                                        <select
                                            onChange={updateMain}
                                            name="Employment_Status__c"
                                            id={`Hou${i}[Employment_Status__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Employment Status" 
                                        > 
                                            {props.data.employStatusList.map((emStat)=>{
                                                return (
                                                    <option key={emStat.value} value={emStat.value}>{emStat.label}</option>
                                                )
                                            })}
                                        </select> :
                                        <select
                                            onChange={update}
                                            name="Employment_Status__c"
                                            id={`Hou${i}[Employment_Status__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Employment Status" 
                                        >
                                            {props.data.employStatusList.map((emStat)=>{
                                                    return (
                                                        <option key={emStat.value} value={emStat.value}>{emStat.label}</option>
                                                    )
                                            })}
                                        </select>
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
                                            selected={
                                                props.data.Hou[i].data.Employment_Start_Date__c !== '' ?
                                                moment(props.data.Hou[i].data.Employment_Start_Date__c) : ''
                                            }
                                            id={`Hou${i}[Employment_Start_Date__c]`}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                console.log(props.data.Hou[i])
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Hou[i].data.Employment_Start_Date__c = newDate
                                                that.forceUpdate();
                                                console.log(props.data.Hou[i])
                                            }} 
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
                                            selected={
                                                props.data.Hou[i].data.Employment_End_Date__c !== '' ? 
                                                moment(props.data.Hou[i].data.Employment_End_Date__c) : ''
                                            }
                                            id={`Hou${i}[Employment_End_Date__c]`}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Hou[i].data.Employment_End_Date__c = newDate
                                                that.forceUpdate();}}
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
                                        onChange={that.uploadHouFile}
                                        type="file"
                                        name="file1"
                                        className="form-control-file"
                                        id={`Hou${i}[nric_fin_file]`}
                                        aria-describedby="fh1" />
                                    <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format: jpg, png, pdf only </small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <input
                                        onChange={that.uploadHouFile}
                                        name="file2"
                                        type="file"
                                        className="form-control-file"
                                        id={`Hou${i}[income_receipt_file]`}
                                        aria-describedby="gh1" />
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
                                    <label htmlFor="checkbox-able-1">Alcoholism</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-2"
                                        type="checkbox"
                                        value="Cultural or personal belief"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-2">Cultural or personal belief</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-3"
                                        type="checkbox"
                                        value="Social Visit Pass"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-3">Social Visit Pass</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-1"
                                        type="checkbox"
                                        value="Chronic illness"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-1">Chronic illness</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-2"
                                        type="checkbox"
                                        value="Gambling addiction"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-2">Gambling addiction</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-3"
                                        type="checkbox"
                                        value="Temporarily unfit for work"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-3">Temporarily unfit for work</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-3"
                                        type="checkbox"
                                        value="Disability"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-3">Disability</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-3"
                                        type="checkbox"
                                        value="Low education"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-3">Low education</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                    <input
                                        onChange={updateMain}
                                        id="checkbox-able-3"
                                        type="checkbox"
                                        value="Drug addiction"
                                        name="reason[]"
                                        disabled={state.houCount > 1 ? true : false} />
                                    <span className="button-checkbox"></span>
                                    </label>
                                    <label htmlFor="checkbox-able-3">Drug addiction</label>
                                </div>
                            </div>	
                        </div>
                        <div className="col-sm-12">
                            <div className="col-md-4">
                                <label>Another Reason</label>
                                <input
                                    onChange={update}
                                    name="Other_Reason_Description__c"
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Specify if exist"
                                    disabled={state.houCount > 1 ? true : false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
