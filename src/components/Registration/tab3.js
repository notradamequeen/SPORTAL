import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import Select from 'react-select';
import { getBase64, regexValidate, validateNRIC, validation } from '../../utils/common';
import '../../assets/css/form-style.css';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

class Tab3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: moment(),
            bencount: 1,
            schoolList: [],
            selectedCS: null,
            selectedAT: null,
            msList: [],
            nationList: [],
            Ben: [{ data: {}, attachment: {} }],
            isValidEmailFormat: [],
            isValidBenNric: [],
            curLevelBySchool: [[]],
            subTypes: [''],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.addCount = this.addCount.bind(this);
        this.UpdateBen = this.UpdateBen.bind(this);
        this.cs_handleChange = this.cs_handleChange.bind(this);
        this.at_handleChange = this.at_handleChange.bind(this);
        this.uploadBen = this.uploadBen.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    cs_handleChange(selectedCS, evt) {
        this.setState({ selectedCS, selectedCS });
    }

    at_handleChange(selectedAT) {
        this.setState({ selectedAT });
    }

    inputChangeHandler(event) {
        // this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name], event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInputChange(event) {
        this.props.changeState([event.target.name], event.target.value);
    }

    handleDOBChange(date) {
        let newdate = date.format('YYYY/MM/DD').toString();
        // this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: newDate,
        });
        // console.log( date.format("DD/MM/YYYY"));
        // alert('aaaa');
    }

    componentWillMount() {
        console.log(this.props);
    }

    componentDidMount() {
        const schoolList = [];
        if (this.props.salesforce.schoolList.fields.records === undefined) return;
        this.props.salesforce.schoolList.fields.records.map((field) => {
            schoolList.push({ type: 'school_list', value: field.Id, label: field.Name });
        });
        this.state.schoolList = schoolList;

        console.log('props', this.props.data);
    }

    addCount() {
        const benValidation = validation('3', this.props.data);
        if (!benValidation.isValid) {
            swal('please fill all required fields!');
        } else {
            const isValidEmailFormat = this.state.isValidEmailFormat;
            const isValidBenNric = this.state.isValidBenNric;
            const subTypes = this.state.subTypes;
            const curLevelBySchool = this.state.curLevelBySchool;

            isValidEmailFormat.push('');
            isValidBenNric.push('');
            subTypes.push('');
            curLevelBySchool.push([]);
            this.setState({
                bencount: (this.state.bencount + 1),
                isValidEmailFormat,
                isValidBenNric,
                subTypes,
                curLevelBySchool,
            });
            this.props.data.Ben.push({ data: { Date_of_Birth__c: '' }, attachment: {} });
            this.props.data.isValidBenEmail = this.state.isValidEmailFormat;
            this.props.data.isValidBenNric = this.state.isValidBenNric;
            this.forceUpdate();
        }
    }

    minCount(event) {
        // console.log('id', event.target.id)
        const BenList = this.props.data.Ben;
        const curLevelBySchool = this.state.curLevelBySchool;
        const subTypes = this.state.subTypes;
        let bencount = this.state.bencount;
        const benIdx = Number(event.target.id.match(/\d+/)[0]);
        bencount -= 1;
        BenList.splice(benIdx, 1);
        curLevelBySchool.splice(benIdx, 1);
        // console.log('cur', curLevelBySchool)
        subTypes.splice(benIdx, 1);
        this.setState({
            bencount,
            subTypes,
            curLevelBySchool,
        });
    }

    UpdateBen(event) {
        const BenList = this.props.data.Ben;
        const benIdx = Number(event.target.id.match(/\d+/)[0]);
        const subTypes = this.state.subTypes;
        const curLevelBySchool = this.state.curLevelBySchool;
        const value = event.target.value;
        if (event.target.name.indexOf('Email') !== -1) {
            const isValidEmail = value !== '' ? regexValidate('email', value) : true;
            if (!isValidEmail) {
                document.getElementById(`ben_email_error${benIdx}`).innerHTML = 'invalid email format';
            } else {
                document.getElementById(`ben_email_error${benIdx}`).innerHTML = '';
            }
            this.state.isValidEmailFormat[benIdx] = isValidEmail.toString();
            this.props.data.isValidBenEmail = this.state.isValidEmailFormat;
        }
        if (event.target.name === 'ID_Number__c') {
            const isValidNric = validateNRIC(value);
            if (!isValidNric) {
                document.getElementById(`ben_nric_error${benIdx}`).innerHTML = 'invalid format NRIC/FIN';
            } else {
                document.getElementById(`ben_nric_error${benIdx}`).innerHTML = '';
            }
            this.state.isValidBenNric[benIdx] = isValidNric.toString();
            this.props.data.isValidBenNric = this.state.isValidBenNric;
        }

        if (event.target.name.indexOf('Current_School') !== -1) {
            this.props.data.schoolList.map((item) => {
                if (item.value == event.target.value) {
                    const subtype = item.type;
                    subTypes[benIdx] = subtype;
                    if (subtype == 'Primary School')
                        {curLevelBySchool[benIdx] = this.props.data.currLevelList.filter((clItem)=>{
                        if(clItem.value.includes("Primary")){
                            return {value: clItem.value, label: clItem.label}
                        }
                        document.getElementById(`Ben${benIdx}[Stream__c]`).setAttribute('disabled', 'true')
                    })};
                    if (subtype == 'Secondary School')
                        {curLevelBySchool[benIdx] = this.props.data.currLevelList.filter((clItem)=>{
                        if(clItem.value.includes("Secondary")){
                            return {value: clItem.value, label: clItem.label}
                        }
                        document.getElementById(`Ben${benIdx}[Stream__c]`).removeAttribute('disabled')
                    })};
                    if (subtype == 'ITE')
                        {curLevelBySchool[benIdx] = this.props.data.currLevelList.filter((clItem)=>{
                        if(clItem.value.includes("NITEC")){
                            return {value: clItem.value, label: clItem.label}
                        }
                        document.getElementById(`Ben${benIdx}[Stream__c]`).setAttribute('disabled', 'true')
                    })};
                    if (subtype == 'Polytechnic')
                        {curLevelBySchool[benIdx] = this.props.data.currLevelList.filter((clItem)=>{
                        if(clItem.value.includes("Polytechnic")){
                            return {value: clItem.value, label: clItem.label}
                        }
                        document.getElementById(`Ben${benIdx}[Stream__c]`).setAttribute('disabled', 'true')
                    })};
                    if (subtype == 'Junior College')
                        {curLevelBySchool[benIdx] = this.props.data.currLevelList.filter((clItem)=>{
                        if(clItem.value.includes("JC")){
                            return {value: clItem.value, label: clItem.label}
                        }
                        document.getElementById(`Ben${benIdx}[Stream__c]`).setAttribute('disabled', 'true')
                    })};
                }
            });
        }
        console.log(BenList);
        BenList[benIdx].data[event.target.name] = value;
        this.setState({
            Ben: BenList,
            subTypes,
            curLevelBySchool,
        });
        this.props.changeState('Ben', BenList);
    }

    uploadBen(event) {
        const file = event.target.files[0];
        const benId = Number(event.target.id.match(/\d+/)[0]);
        const ben = this.props.data.Ben[benId];
        const attachment = {
            Name: `Nric_Fin_${file.name.replace(' ', '_')}`,
            Body: file,
            parentId: '', // the id of the opportunity
        };
        getBase64(file).then((encodedFile) => {
            attachment.Body = encodedFile.split(',')[1];
            ben.attachment = attachment;
        });
        document.getElementById(`fileName${benId}`).innerHTML = file.name;
    }

    render() {
        const that = this;
        const update = this.UpdateBen.bind(this);
        const dob = this.state.dob;
        const minCount = this.minCount.bind(this);
        const handleDOBChange = this.handleDOBChange.bind(this);
        const cs_handleChange = this.cs_handleChange.bind(this);
        const at_handleChange = this.at_handleChange.bind(this);
        const school_list = this.state.schoolList;
        const state = this.state;
        const props = this.props;
        // console.log('subtypes', state.subTypes)
        // console.log('curlevelbyschool', this.state.curLevelBySchool)
        // console.log('bencount', this.state.bencount)
        return (
            <div className="col-md-12 print" id="tab3">
                <br />
                <h4 className="info-text"> Beneficiaries List</h4>
                <br />
                {Array.apply(0, Array(this.state.bencount)).map((x, i) => {
                return (
                    <div className="full" key={i.toString()}>
                        <div className="row">
                            <div className="col-sm-6">
                                <p>Beneficiary - {(i+1)} </p>
                            </div>
                            <div className='col-sm-6 right'>
                                {i > 0 && 
                                    <button 
                                        className="small"
                                        id={`Ben[${i}][minbutton]`}
                                        onClick={minCount}><i id={`Ben[${i}][mincount]`} className="fa fa-minus"></i>
                                    </button>
                                }
                            </div>
                        </div>
                            {/* Full Name */}
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Name <small style={{color: "red"}}>(required)</small></label>
                                        <input
                                            onChange={update}
                                            name="Full_Name__c"
                                            id={`Ben${i}][Full_Name_del__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Ben[i].data !== undefined ? props.data.Ben[i].data.Full_Name__c !== undefined ? props.data.Ben[i].data.Full_Name__c : '' : ''}
                                            required
                                        />
                                </div>
                            </div>
                            {/* NRIC */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>NRIC/Birth Cert Number <small style={{color: "red"}}>(required)</small> </label>
                                        <input
                                            onChange={update}
                                            name="ID_Number__c"
                                            id={`Ben${i}[ID_Number__c]`}
                                            type="text"
                                            className="form-control"
                                            maxLength="9"
                                            value={props.data.Ben[i].data !== undefined ? props.data.Ben[i].data.ID_Number__c !== undefined ? props.data.Ben[i].data.ID_Number__c : '' : ''}
                                        />
                                        <span id={`ben_nric_error${i}`} style={{ color: "red"}}></span>
                                </div>
                            </div>
                            {/* Date of Birth */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Date of Birth <small style={{color: "red"}}>(required)</small></label>
                                        <DatePicker
                                            name="Date_of_Birth__c"
                                            selected={props.data.Ben[i] !== undefined ? props.data.Ben[i].data.Date_of_Birth__c !== '' ? moment(props.data.Ben[i].data.Date_of_Birth__c) : '' : ''}
                                            id={`Ben${i}[Date_of_Birth__c]`}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Ben[i].data.Date_of_Birth__c = newDate
                                                that.forceUpdate();}}
                                            className="form-control fullw"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                </div>
                            </div>
                            {/* Race */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Race <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        onChange={update}
                                        name="Race__c"
                                        id={`Ben${i}[Race__c]`}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Race__c !== undefined ? props.data.Ben[i].data.Race__c : ''}
                                    >
                                        <option value=''></option>
                                        {props.data.raceList !== undefined && props.data.raceList.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* row 2 */}
                        <div className="row">
                            {/* Gender */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Gender <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Gender__c" 
                                        ref="Ben[{i}][Gender__c]" 
                                        id={`Ben${i}[Gender__c]`}
                                        onChange={update}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Gender__c !== undefined ? props.data.Ben[i].data.Gender__c : ''}
                                        required>
                                        <option value=""></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            {/* Nationality */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Nationality <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Nationality__c" 
                                        id={`Ben${i}[Nationality__c]`}
                                        onChange={update}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Nationality__c !== undefined ? props.data.Ben[i].data.Nationality__c : ''}
                                    >
                                        <option value=""></option>
                                        {props.data.nationList !== undefined && props.data.nationList.map((nationItem) => {
                                            return(
                                                <option value={nationItem.value}>{nationItem.label}</option>
                                            ) 
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* Current School */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>School <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Current_School__c" 
                                        ref="Ben[{i}][Current_School__c]" 
                                        id={`Ben${i}[Current_School__c]`}
                                        onChange={update}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Current_School__c !== undefined ? props.data.Ben[i].data.Current_School__c : ''}
                                        required>
                                        <option value="">---Please Select Current School---</option>
                                        {props.data.schoolList.map((school_opt) => {
                                            return(
                                                <option 
                                                    key={school_opt.value}
                                                    value={school_opt.value}
                                                    subtype={school_opt.type}
                                                >{school_opt.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* Current Level */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Current level <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        onChange={update}
                                        name="Current_Level__c"
                                        id={`Ben${i}[Current_Level__c]`}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Current_Level__c !== undefined ? props.data.Ben[i].data.Current_Level__c : ''}
                                    >
                                        <option value=''></option>
                                        {state.curLevelBySchool[i] !== undefined && state.curLevelBySchool[i].map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Row 3 */}
                        <div className="row">
                            {/* Stream */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Stream</label>
                                    <select
                                        onChange={update}
                                        name="Stream__c"
                                        id={`Ben${i}[Stream__c]`}
                                        className="form-control select"
                                        value={props.data.Ben[i].data.Stream__c !== undefined ? props.data.Ben[i].data.Stream__c : ''}
                                        disabled={state.subTypes[i] !== 'Secondary School' ? true : false}
                                    >
                                        <option value=''></option>
                                        {props.data.streamList !== undefined && props.data.streamList.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* Applying To */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Applying to <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Applying_to__c"
                                        className="form-control select"
                                        ref="Ben[{i}][Applying_to__c]" 
                                        id={`Ben${i}[Applying_to__c]`}
                                        onChange={update}
                                        value={props.data.Ben[i].data.Applying_to__c !== undefined ? props.data.Ben[i].data.Applying_to__c : ''}
                                        required >
                                        <option value="">---Please Select Applying to---</option>
                                        {props.data.applyingToList.map((school_opt) => {
                                            return(
                                            <option key={`at${school_opt.value}`} value={school_opt.value}>{school_opt.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Email <small style={{color: "red"}}>(required)</small></label>
                                        <input
                                            onChange={update}
                                            name="Email_Address__c"
                                            id={`Ben${i}[Email_Address__c]`}
                                            type="text"
                                            className="form-control"
                                            value={props.data.Ben[i].data.Email_Address__c !== undefined ? props.data.Ben[i].data.Email_Address__c : ''}
                                        />
                                        <span id={`ben_email_error${i}`} style={{ color: "red"}}></span>
                                </div>
                            </div>
                            {/* Relationship to Applicant */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Relationship to Applicant <small className="red">(required)</small></label><br />
                                    <select
                                        name="Relationship_to_Applicant__c"
                                        id={`Ben${i}[Relationship_to_Applicant__c]`} 
                                        className="form-control relation1 select"
                                        onChange={update}
                                        value={props.data.Ben[i].data.Relationship_to_Applicant__c ? props.data.Ben[i].data.Relationship_to_Applicant__c : ''}
                                    >
                                        <option value=''></option>
                                        {props.data.relationList.map((rel) => {
                                            return (
                                                <option key={rel.value} value={rel.value}>{rel.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row"> 
                        {/* Upload NRIC */}
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label>NRIC/Birth File <small className="red">(required)</small></label><br />
                                <label className="fileContainer">
                                Choose File
                                <input
                                    onChange={that.uploadBen}
                                    type="file"
                                    className="form-control-file"
                                    id={`Ben${i}[file]`}
                                    aria-describedby="fileHelp1"/>
                                </label>&nbsp;
                                <span id={`fileName${i}`} style={{fontSize: "10pt", fontWeight: "bold"}}>
                                    {props.data.Ben[i].attachment.Name !== undefined ? props.data.Ben[i].attachment.Name : '' }
                                </span>
                                <label>
                                    <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                                </label>
                            </div>
                        </div>   
                            {/* Graduating this year */}
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <input
                                        onChange={update}
                                        type="checkbox"
                                        value="1"
                                        id={`grad1${i}`} /> 
                                    <label htmlFor={`grad1${i}`}>Graduating this year</label>
                                </div>
                            </div>
                        </div>
                        <hr className="dashed" />
                    </div>
                )
            })}
                <br />
                <center>
                    <button onClick={this.addCount} className="btn btn-primary">Add more beneficary</button>
                </center>
                <br />
            </div>);
    }
}

Tab3.propTypes = {
    title: PropTypes.string,
};
Tab3.defaultProps = {
    title: 'Tab3 ',
};


const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
