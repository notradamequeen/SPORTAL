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
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.addCount = this.addCount.bind(this);
        this.UpdateHou = this.UpdateHou.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.uploadHouFile = this.uploadHouFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    inputChangeHandler(event) {
        // this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name], event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInputChange(event) {
        let value = event.target.value;
        if (event.target.name == 'ID_Number__c') {
            const isValidId = value !== '' ? validateNRIC(value) : true;
            if (!isValidId) {
                document.getElementById('nric_error0').innerHTML = 'invalid NRIC/FIN format';
            } else {
                document.getElementById('nric_error0').innerHTML = '';
            }
            this.props.data.isValidMainNric = isValidId;
        }
        if (event.target.name == 'Employment_Status__c') {
            this.props.data.HouStatusEmployement[0] = event.target.value;
        }
        if (event.target.id.indexOf('check') !== -1) {
            value = !this.props.data[event.target.name];
        }
        this.props.changeState([event.target.name], value);
        console.log('step4', this.props.data);
    }

    handleDOBChange(date) {
        let newDate = date.format('YYYY-MM-DD').toString();
        // this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: date,
        });
        this.props.changeState('Date_of_Birth__c', newDate);
    }
    handleStartDateChange(date) {
        let newDate = date.format('YYYY-MM-DD').toString();
        // this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.props.changeState('Employment_Start_Date__c', newDate);
    }
    handleEndDateChange(date) {
        let newDate = date.format('YYYY-MM-DD').toString();
        // this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.props.changeState('Employment_End_Date__c', newDate);
    }

    componentWillMount() {
        console.log(this.props);
    }

    componentDidMount() {
    }

    addCount() {
        this.setState({
            houCount: (this.state.houCount + 1),
        });
        this.props.data.Hou.push({
            data: {
                Gender__c: '',
                Race__c: '',
                Relationship_to_Applicant__c: '',
                Monthly_Gross_Income__c: 0,
            },
            attachment: {},
        });
        this.props.data.HouStatusEmployement.push('');
        this.props.data.isValidHouNric.push('');
    }
    minCount(event) {
        const houIdx = Number(event.target.id.match(/\d+/)[0]);
        this.setState({
            houCount: (this.state.houCount - 1),
        });
        this.props.data.Hou.splice(houIdx, 1);
        this.props.data.HouStatusEmployement.splice(houIdx, 1);
        this.props.data.isValidHouNric.splice(houIdx, 1);
    }
    UpdateHou(event) {
        const HouList = this.props.data.Hou;
        const houIdx = Number(event.target.id.match(/\d+/)[0]);
        HouList[houIdx].data[event.target.name] = event.target.value;
        if (event.target.name === 'ID_Number__c') {
            const isValidNric = validateNRIC(event.target.value);
            if (!isValidNric) {
                document.getElementById(`hou_nric_error${houIdx}`).innerHTML = 'invalid format NRIC/FIN';
            } else {
                document.getElementById(`hou_nric_error${houIdx}`).innerHTML = '';
            }
            this.props.data.isValidHouNric = isValidNric.toString();
        }
        if (event.target.name === 'Employment_Status__c') {
            this.props.data.HouStatusEmployement[houIdx] = event.target.value;
        }
        this.setState({
            Hou: HouList,
        });
        this.props.changeState('Hou', HouList);
    }
    uploadHouFile(event) {
        const houIdx = Number(event.target.id.match(/\d+/)[0]);
        const hou = this.props.data.Hou[Number(event.target.id.match(/\d+/)[0])];
        const name = event.target.name;
        const file = event.target.files[0];
        const prefixFile = { file1: 'Nric_Fin_', file2: 'Income_Receipt_', file3: 'payslip_' };
        const fileName = prefixFile[event.target.name] + file.name.replace(/ |-/g, '_');
        const attachment = {
            Name: fileName,
            Body: '',
            parentId: '',
        };
        getBase64(file).then((encodedFile) => {
            attachment.Body = encodedFile.split(',')[1];
            hou.attachment[name] = attachment;
        });
        document.getElementById(`${event.target.name}Name${houIdx}`).innerHTML = file.name;
        console.log(hou);
    }

    render() {
        const that = this;
        const update = this.UpdateHou.bind(this);
        const updateMain = this.handleInputChange.bind(this);
        const minCount = this.minCount.bind(this);
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const handleStartDateChange = this.handleStartDateChange.bind(this);
        const handleEndDateChange = this.handleEndDateChange.bind(this);
        const state = this.state;
        const props = this.props;
        const EarnerCount = props.data.HouStatusEmployement.filter(i => i !== 'Unemployed').length;
        props.data.EarnerCount = props.data.HouStatusEmployement.filter(i => i !== 'Unemployed').length;
        if (EarnerCount > 1) {
            Array.apply(1, Array(8)).map((val, num) => {
                const fieldName = document.getElementById(`checkbox-able-${num + 1}`).getAttribute('name');
                props.data[fieldName] = false;
            });
        }
        return (
            <div className="col-md-12 print" id="Tab4">
                {Array.apply(0, Array(this.state.houCount)).map((x, i) => {
                    return (
                        <div className="fullh" key={i.toString()}>  
                        <br />   
                        {i == 0 ?
                            <div className="row">
                                <div className='col-sm-6'>
                                    <p><b>Main Applicant</b></p>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className='col-sm-6'>
                                    <b>Member - {(i+1)}</b>
                                </div>
                                <div className='col-sm-6 right'>
                                    <button 
                                        className="small"
                                        id={`Ben[${i}][minbutton]`}
                                        onClick={minCount}><i id={`Hou[${i}][mincount]`} className="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="row ">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Name <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <input
                                            onChange={updateMain}
                                            name="Full_Name__c"
                                            id={`Hou${i}[Full_Name_del__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Fullname"
                                            value={props.data.Full_Name__c}
                                            disabled
                                        /> :
                                        <input
                                            onChange={update}
                                            name="Full_Name__c"
                                            id={`Hou${i}[Full_Name_del__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Hou[i].data.Full_Name__c !== undefined ? props.data.Hou[i].data.Full_Name__c : ''}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>NRIC <small className="red">(required)</small></label>
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
                                            disabled
                                        /><br/>
                                        <span id="nric_error0" style={{color: "red"}}></span></div> :
                                        <div>
                                        <input
                                            onChange={update}
                                            name="ID_Number__c"
                                            id={`Hou${i}[ID_Number__c]`}
                                            type="text"
                                            className="form-control"
                                            maxLength="9"
                                            value={props.data.Hou[i].data.ID_Number__c !== undefined ? props.data.Hou[i].data.ID_Number__c : ''}
                                        /><br/>
                                        <span id={`hou_nric_error${i}`} style={{color: "red"}}></span>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Date of Birth <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <DatePicker
                                            name="Date_of_Birth__c"
                                            selected={props.data.Date_of_Birth__c !== '' ?
                                                moment(props.data.Date_of_Birth__c) : ''}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={handleDOBChange} 
                                            placeholderText="Date of Birth"
                                            className="form-control fullw"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled
                                        /> :
                                        <DatePicker
                                            name="Date_of_Birth__c"
                                            selected={
                                                props.data.Hou[i].data.Date_of_Birth__c ?
                                                moment(props.data.Hou[i].data.Date_of_Birth__c) : ''
                                            }
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Hou[i].data.Date_of_Birth__c = newDate
                                                that.forceUpdate();}}
                                            placeholderText="Date of Birth"
                                            className="form-control fullw"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        {/* row 2 */}
                        <div className="row ">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Gender <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <select
                                            onChange={updateMain}
                                            name="Gender__c"
                                            id={`Hou${i}[Gender__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Gender__c}
                                            disabled
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        :
                                        <select
                                            onChange={update}
                                            name="Gender__c"
                                            id={`Hou${i}[Gender__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Hou[i].data.Gender__c !== undefined ? props.data.Hou[i].data.Gender__c : ''}
                                        >
                                            <option value=''></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    }
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Race <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <select
                                            onChange={updateMain}
                                            name="Race__c"
                                            id={`Hou${i}[Race__c]`}
                                            type="text"
                                            className="form-control select"
                                            placeholder="Race"
                                            value={props.data.Race__c}
                                            disabled
                                        >
                                            <option value=''></option>
                                        {props.data.raceList !== undefined && props.data.raceList.map((raceItem) => {
                                            return (
                                                <option key={raceItem.value} value={raceItem.value}>{raceItem.label}</option>
                                            );
                                        })}
                                        </select>
                                        :
                                        <select
                                            onChange={update}
                                            name="Race__c"
                                            id={`Hou${i}[Race__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Hou[i].data.Race__c !== undefined ? props.data.Hou[i].data.Race__c : ''}
                                        >
                                            <option value=''></option>
                                        {props.data.raceList !== undefined && props.data.raceList.map((raceItem) => {
                                            return (
                                                <option key={raceItem.value} value={raceItem.value}>{raceItem.label}</option>
                                            );
                                        })}
                                        </select>
                                    }  
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Nationality <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <select
                                            onChange={updateMain}
                                            name="Nationality__c"
                                            id={`Hou${i}[Nationality__c]`}
                                            type="text"
                                            className="form-control select"
                                            placeholder="Nationality"
                                            value={props.data.Nationality__c}
                                            disabled
                                        >
                                        {props.data.nationList !== undefined && props.data.nationList.map((raceItem) => {
                                            return (
                                                <option key={raceItem.value} value={raceItem.value}>{raceItem.label}</option>
                                            );
                                        })}
                                        </select>
                                        :
                                        <select
                                            onChange={update}
                                            name="Nationality__c"
                                            id={`Hou${i}[Nationality__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Hou[i].data.Nationality__c !== undefined ? props.data.Hou[i].data.Nationality__c : ''}
                                        >
                                            <option value=''></option>
                                        {props.data.nationList !== undefined && props.data.nationList.map((raceItem) => {
                                            return (
                                                <option key={raceItem.value} value={raceItem.value}>{raceItem.label}</option>
                                            );
                                        })}
                                        </select>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* row 3 */}
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Relationship to Applicant <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <select
                                            name="Relationship_to_Applicant__c"
                                            id="Hou[0][Relationship_to_Applicant__c]" 
                                            className="form-control relation1 select"
                                            onChange={updateMain}
                                            value={props.data.Relationship_to_Applicant__c}
                                            disabled
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
                                            className="form-control relation1 select"
                                            onChange={update}
                                            value={props.data.Hou[i].data.Relationship_to_Applicant__c ? props.data.Hou[i].data.Relationship_to_Applicant__c : ''}
                                        >
                                            <option value=''></option>
                                            {props.data.relationList.map((rel) => {
                                                if (rel.value != 'Self'){
                                                    return (
                                                        <option key={rel.value} value={rel.value}>{rel.label}</option>
                                                    );
                                                }
                                            })}
                                        </select>
                                    }
                                </div>
                            </div>
                            {/* Monthly Gross Income */}
                            <div className="col-sm-4">
                                <div className="form-group">
                                    {i == 0 ?
                                        <div>
                                        <label>Gross Monthly Income {props.data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}
                                            <a href="#" data-toggle="tooltip" title="The gross household income of the individual">
                                            <img src={require('../../assets/img/question.png')} width="15px" /></a>
                                        </label>
                                        <input
                                            onChange={updateMain}
                                            name="Monthly_Gross_Income__c"
                                            id={`Hou${i}[Monthly_Gross_Income__c]`}
                                            type="text"
                                            className="form-control"
                                            value = {props.data.Employment_Status__c == 'Unemployed' ? 0 : 
                                                props.data.Monthly_Gross_Income__c}
                                            disabled = {props.data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div> :
                                        <div>
                                        <label>Gross Monthly Income {props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}
                                            <a href="#" data-toggle="tooltip" title="The gross household income of the individual">
                                            <img src={require('../../assets/img/question.png')} width="15px" /></a>
                                        </label>
                                        <input
                                            onChange={update}
                                            name="Monthly_Gross_Income__c"
                                            id={`Hou${i}[Monthly_Gross_Income__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Hou[i].data.Employment_Status__c == 'Unemployed' ? 0 : 
                                                props.data.Hou[i].data.Monthly_Gross_Income__c}
                                            disabled = {props.data.Hou[i].data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div>
                                    }  
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Employment Status <small className="red">(required)</small></label>
                                    {i == 0 ? 
                                        <select
                                            onChange={updateMain}
                                            name="Employment_Status__c"
                                            id={`Hou${i}[Employment_Status__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Employment_Status__c}
                                        > 
                                            <option value=''></option>
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
                                            className="form-control select"
                                            value={props.data.Hou[i].data.Employment_Status__c ? props.data.Hou[i].data.Employment_Status__c : ''}
                                        >
                                            <option value=''></option>
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
                            {/* Occupation */}
                            <div className="col-sm-4">
                                <div className="form-group">
                                    {i == 0 ?
                                        <div>
                                        <label>Occupation {props.data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <input
                                            onChange={updateMain}
                                            name="Occupation__c"
                                            id={`Hou${i}[Occupation__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Employment_Status__c == 'Unemployed' ? '' : props.data.Occupation__c}
                                            disabled={props.data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div> :
                                        <div>
                                        <label>Occupation {props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <input
                                            onChange={update}
                                            name="Occupation__c"
                                            id={`Hou${i}[Occupation__c]`}
                                            type="text"
                                            className="form-control select"
                                            value={props.data.Hou[i].data.Employment_Status__c !== 'Unemployed'  ? props.data.Hou[i].data.Occupation__c : ''}
                                            disabled = {props.data.Hou[i].data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div>
                                    }  
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    {i == 0 ? 
                                        <div>
                                        <label>Company {props.data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <input
                                            onChange={updateMain}
                                            name="Company__c"
                                            id={`Hou${i}[Company__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Employment_Status__c == 'Unemployed' ? '' : props.data.Company__c}
                                            disabled={props.data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div> :
                                        <div>
                                        <label>Company {props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <input
                                            onChange={update}
                                            name="Company__c"
                                            id={`Hou${i}[Company__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Hou[i].data.Employment_Status__c !== 'Unemployed'  ? props.data.Hou[i].data.Company__c : ''}
                                            disabled = {props.data.Hou[i].data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div>

                                    }
                                    
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    {i == 0 ?
                                        <div>
                                        <label>Employment Start Date {props.data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <DatePicker
                                            name="Employment_Start_Date__c"
                                            selected={
                                                props.data.Employment_Status__c !== 'Unemployed' &&
                                                props.data.Employment_Start_Date__c !== '' &&
                                                props.data.Employment_Start_Date__c !== undefined
                                                  ?
                                                moment(props.data.Employment_Start_Date__c) : ''}
                                            id={`Hou${i}[Employment_Start_Date__c]`}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={handleStartDateChange} 
                                            className="form-control fullw"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled = {props.data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div> :
                                        <div>
                                        <label>Employment Start Date {props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' && <small className="red">(required)</small>}</label>
                                        <DatePicker
                                            name="Employment_Start_Date__c"
                                            selected={
                                                props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' && 
                                                props.data.Hou[i].data.Employment_Start_Date__c !== '' &&
                                                props.data.Hou[i].data.Employment_Start_Date__c !== undefined ? 
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
                                            className="form-control fullw"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled = {props.data.Hou[i].data.Employment_Status__c == 'Unemployed' ? true : false}
                                        /></div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Upload NRIC/Birth Cert Number<small className="red"> (required)</small></label><br /> 
                                    <label className="fileContainer">
                                        Choose File
                                        <input
                                            onChange={that.uploadHouFile}
                                            type="file"
                                            name="file1"
                                            className="form-control-file"
                                            id={`Hou${i}[nric_fin_file]`}
                                            aria-describedby="fh1" />
                                    </label>
                                    <br />
                                    &nbsp;
                                    <span id={`file1Name${i}`} style={{fontSize: "10pt", fontWeight: "bold"}}>
                                        {props.data.Hou[i].attachment.file1 !== undefined ? props.data.Hou[i].attachment.file1.Name : ''}
                                    </span>
                                    <br />
                                    <label>
                                        <small id="fileHelp1" className="form-text text-muted">jpg, png, pdf only </small>
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Upload Income Statement Receipt <small className="red">(required)</small></label><br />
                                    <label className="fileContainer">
                                        Choose File
                                        <input
                                            onChange={that.uploadHouFile}
                                            name="file2"
                                            type="file"
                                            className="form-control-file"
                                            id={`Hou${i}[income_receipt_file]`}
                                            aria-describedby="gh1" />
                                    </label>
                                    <br/>
                                    &nbsp;
                                    <span id={`file2Name${i}`} style={{fontSize: "10pt", fontWeight: "bold"}}>
                                        {props.data.Hou[i].attachment.file2 !== undefined ? props.data.Hou[i].attachment.file2.Name : ''}
                                    </span>
                                    <br/>
                                    <label>
                                        <small id="gh1" className="form-text text-muted">format: jpg, png, pdf only </small>
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    { i == 0 ? 
                                        <label>Upload last month's Payslip {props.data.Employment_Status__c !== 'Unemployed' }</label>
                                        :
                                        <label>Upload last month's Payslip {props.data.Hou[i].data.Employment_Status__c !== 'Unemployed' }</label>
                                    }
                                    <br/>
                                    <label className="fileContainer">
                                        Choose File
                                        <input
                                            onChange={that.uploadHouFile}
                                            type="file"
                                            name="file3"
                                            className="form-control-file"
                                            id={`Hou${i}[payslip]`}
                                            aria-describedby="fh1" />
                                    </label>
                                    <br/>
                                        &nbsp;
                                        <span id={`file3Name${i}`} style={{fontSize: "10pt", fontWeight: "bold"}}>
                                            {props.data.Hou[i].attachment.file3 !== undefined ? props.data.Hou[i].attachment.file3.Name : ''}
                                        </span>
                                    <br />
                                    <label>
                                        <small id="fileHelp1" className="form-text text-muted"> format: jpg, png, pdf only </small>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                })}
                <br />
                <center>
                    <button onClick={this.addCount} className="btn btn-primary">Add more household member</button>
                </center>
                <br />
                <hr className="dashed" />
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <h4 className="info-text">Reason/s for not having an income earner / Having one income earner:</h4>
                            <div className="row col-md-12">
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-1"
                                            type="checkbox"
                                            value
                                            name="Alcoholism__c"
                                            checked={props.data.Alcoholism__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-1">Alcoholism</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-2"
                                            type="checkbox"
                                            // value="Cultural or personal belief"
                                            name="Cultural_or_personal_belief__c"
                                            checked={props.data.Cultural_or_personal_belief__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-2">Cultural or personal belief</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-3"
                                            type="checkbox"
                                            // value="Social Visit Pass"
                                            name="Social_Visit_Pass__c"
                                            checked={props.data.Social_Visit_Pass__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-3">Social Visit Pass</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-4"
                                            type="checkbox"
                                            value="Chronic illness"
                                            name="Chronic_Illness__c"
                                            checked={props.data.Chronic_Illness__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-1">Chronic illness</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-5"
                                            type="checkbox"
                                            value="Gambling addiction"
                                            name="Gambling_Addiction__c"
                                            checked={props.data.Gambling_Addiction__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-2">Gambling addiction</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-6"
                                            type="checkbox"
                                            value="Temporarily unfit for work"
                                            name="Temporarily_unfit_for_work__c"
                                            checked={props.data.Temporarily_unfit_for_work__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-3">Temporarily unfit for work</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-7"
                                            type="checkbox"
                                            value="Disability"
                                            name="Disability__c"
                                            checked={props.data.Disability__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-3">Disability</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-8"
                                            type="checkbox"
                                            value="Low education"
                                            name="Low_Education__c"
                                            checked={props.data.Low_Education__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-3">Low education</label>
                                </div>
                                <div className="col-md-4">
                                    <label className="custom-option">
                                        <input
                                            onChange={updateMain}
                                            id="checkbox-able-9"
                                            type="checkbox"
                                            value="Drug addiction"
                                            name="Drug_Addiction__c"
                                            checked={props.data.Drug_Addiction__c}
                                            disabled={EarnerCount > 1}
                                    />
                                        <span className="button-checkbox" />
                                    </label>
                                    <label htmlFor="checkbox-able-3">Drug addiction</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="col-md-4">
                                <label>Another Reason</label>
                                <input
                                    onChange={updateMain}
                                    name="Other_Reason_Description__c"
                                    type="text"
                                    className="form-control"
                                    placeholder="Please Specify if exist"
                                    disabled={EarnerCount > 1}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Tab4.propTypes = {
    title: PropTypes.string,
};
Tab4.defaultProps = {
    title: 'Tab4 ',
};


const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tab4);
