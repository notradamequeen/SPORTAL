import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import Select from 'react-select';
import { getBase64, regexValidate, validateNRIC, validation } from '../../utils/common'

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
            Ben:[{data:{}, attachment: {}}],
            isValidEmailFormat: [],
            isValidBenNric: [],
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.addCount                         = this.addCount.bind(this);
        this.UpdateBen                        = this.UpdateBen.bind(this);
        this.cs_handleChange                  = this.cs_handleChange.bind(this);
        this.at_handleChange                  = this.at_handleChange.bind(this);
        this.uploadBen                        = this.uploadBen.bind(this);
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
            dob: newDate
        });
        //console.log( date.format("DD/MM/YYYY"));
        //alert('aaaa');
    }

    componentWillMount(){
        console.log(this.props);
    }

    componentDidMount() {
        const schoolList = []
        if (this.props.salesforce.schoolList.fields.records === undefined) return;
        this.props.salesforce.schoolList.fields.records.map((field) => {
            schoolList.push({type:"school_list", value: field.Id, label: field.Name })
        })
        this.state.schoolList = schoolList

        console.log('props', this.props.data)
    }

    addCount(){
        const isValidRequired = validation('3', this.props.data);
        if (!isValidRequired) {
            swal('please fill all required fields!')
        } else {
            this.setState({
                bencount: (this.state.bencount+1)
            });
            this.props.data.Ben.push({data:{Date_of_Birth__c : ''}, attachment: {}});
            this.state.isValidEmailFormat.push('');
            this.state.isValidBenNric.push('');
            this.props.data.isValidBenEmail = this.state.isValidEmailFormat;
            this.props.data.isValidBenNric = this.state.isValidBenNric;
            console.log(this.props.data)
        }
        
        
    }

    UpdateBen(event){
        const BenList = this.props.data.Ben
        const benIdx = Number(event.target.id.match(/\d+/)[0])
        const value = event.target.value
        if ( event.target.name.indexOf("Email") !== -1) {
            let isValidEmail = value !== '' ? regexValidate("email", value) : true;
            if (!isValidEmail) {
                document.getElementById(`ben_email_error${benIdx}`).innerHTML = 'invalid email format';
            } else {
                document.getElementById(`ben_email_error${benIdx}`).innerHTML = '';
            }  
            this.state.isValidEmailFormat[benIdx] = isValidEmail.toString()
            this.props.data.isValidBenEmail = this.state.isValidEmailFormat
        }
        if(event.target.name === 'ID_Number__c'){
            let isValidNric = validateNRIC(value)
            if (!isValidNric) {
                document.getElementById(`ben_nric_error${benIdx}`).innerHTML = 'invalid format NRIC/FIN';
            } else {
                document.getElementById(`ben_nric_error${benIdx}`).innerHTML = '';
            }
            this.state.isValidBenNric[benIdx] = isValidNric.toString()
            this.props.data.isValidBenNric = this.state.isValidBenNric
        }
        
        BenList[benIdx]['data'][event.target.name] = value
        this.setState({ 
            Ben: BenList
        });
        this.props.changeState('Ben', BenList);
        console.log('state', this.state)
    }

    uploadBen(event){
        const file = event.target.files[0]
        let ben = this.props.data.Ben[Number(event.target.id.match(/\d+/)[0])]
        let attachment = {
            Name : 'Nric_Fin_'+file.name.replace(' ', '_'),
            Body : file,
            parentId : '' //the id of the opportunity
          }
        getBase64(file).then((encodedFile) => {
            attachment.Body = encodedFile.split(',')[1]
            ben['attachment'] = attachment
        })
    }


    render() {
        const that = this
        const update = this.UpdateBen.bind(this);
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const cs_handleChange = this.cs_handleChange.bind(this);
        const at_handleChange = this.at_handleChange.bind(this)
        const school_list = this.state.schoolList
        const state = this.state
        const props = this.props
        return (
            <div className="col-md-12 print" id="tab3">
                <h5 className="info-text"> Beneficiaries List</h5>
            {Array.apply(0, Array(this.state.bencount)).map(function (x, i) {
                return (
                    <div className="full" key={i.toString()}>
                        <div className="row">
                            <p>Beneficiary - {(i+1)}</p>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Name <small style={{color: "red"}}>(required)</small></label>
                                        <input
                                            onChange={update}
                                            name="Full_Name__c"
                                            id={`Ben${i}][Full_Name_del__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Fullname"
                                            required
                                        />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>NRIC <small style={{color: "red"}}>(required)</small> </label>
                                        <input
                                            onChange={update}
                                            name="ID_Number__c"
                                            id={`Ben${i}[ID_Number__c]`}
                                            type="text"
                                            className="form-control"
                                            maxLength="9"
                                            placeholder="NRIC "
                                        />
                                        <span id={`ben_nric_error${i}`} style={{ color: "red"}}></span>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Date of Birth <small style={{color: "red"}}>(required)</small></label>
                                        <DatePicker
                                            name="Date_of_Birth__c"
                                            selected={props.data.Ben[i].data.Date_of_Birth__c !== '' ? moment(props.data.Ben[i].data.Date_of_Birth__c) : ''}
                                            id={`Ben${i}[Date_of_Birth__c]`}
                                            dateFormat="DD/MM/YYYY"
                                            onChange={date => {
                                                const newDate = date.format("YYYY-MM-DD").toString()
                                                props.data.Ben[i].data.Date_of_Birth__c = newDate
                                                that.forceUpdate();}}
                                            placeholderText="Date of Birth"
                                            className="form-control fullw"
                                            showYearDropdown
                                            showMonthDropdown
                                        />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Current level <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        onChange={update}
                                        name="Current_Level__c"
                                        id={`Ben${i}[Current_Level__c]`}
                                        className="form-control"
                                    >
                                        <option value=''></option>
                                        {props.data.currLevelList !== undefined && props.data.currLevelList.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Email <small style={{color: "red"}}>(required)</small></label>
                                        <input
                                            onChange={update}
                                            name="Email_Address__c"
                                            id={`Ben${i}[Email_Address__c]`}
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                        <span id={`ben_email_error${i}`} style={{ color: "red"}}></span>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>School <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Current_School__c" 
                                        ref="Ben[{i}][Current_School__c]" 
                                        id={`Ben${i}[Current_School__c]`}
                                        onChange={update}
                                        className="form-control"
                                        required>
                                        <option value="">---Please Select Current School---</option>
                                        {props.data.schoolList.map((school_opt) => {
                                            return(
                                                <option key={school_opt.value} value={school_opt.value}>{school_opt.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Stream</label>
                                    <select
                                        onChange={update}
                                        name="Stream__c"
                                        id={`Ben${i}[Stream__c]`}
                                        className="form-control"
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
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label>Applying to <small style={{color: "red"}}>(required)</small></label>
                                    <select
                                        name="Applying_to__c"
                                        className="form-control"
                                        ref="Ben[{i}][Applying_to__c]" 
                                        id={`Ben${i}[Applying_to__c]`}
                                        onChange={update}
                                        required >
                                        <option value="">---Please Select Applying to---</option>
                                        {props.data.schoolList.map((school_opt) => {
                                            return(
                                            <option key={`at${school_opt.value}`} value={school_opt.value}>{school_opt.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <input
                                        onChange={that.uploadBen}
                                        type="file"
                                        className="form-control-file"
                                        id={`Ben${i}[file]`}
                                        aria-describedby="fileHelp1" />
                                    <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <input
                                        onChange={update}
                                        type="checkbox"
                                        value="1"
                                        id="grad1" /> 
                                    <label htmlFor="grad1">Graduating this year</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}
        <br />
        <center>
            <button onClick={this.addCount} className="btn btn-primary">Add more beneficary</button>
        </center>
        <br />
    </div>)
    }
}

Tab3.propTypes = {
    title: PropTypes.string
};
Tab3.defaultProps = {
    title: 'Tab3 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
