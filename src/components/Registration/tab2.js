import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import 'react-datepicker/dist/react-datepicker.css';

class Tab2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: moment(),
            postal_code: [],
            selectedPC: null,
            selectedAddress: {
                Street__c: null,
                Block__c: null,
                Contry__c: null,
            },
            otherMS: false,
            otherNation: false,
            otherRace: false,
            otherTF: false,
            msList: [],
            selectedMS: null,
            nationList: [],
            selectedNation: null,
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.handelAddressChange              = this.handelAddressChange.bind(this);
        this.ms_handleChange                  = this.ms_handleChange.bind(this);
        this.nation_handleChange              = this.nation_handleChange.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
    }

    inputChangeHandler(event) {
        //this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name],event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    pc_handleChange = (selectedPC) => {
        const selectedAddress = this.props.salesforce.postalCodeRecord.fields.records[selectedPC.key]
        this.setState({ selectedPC, selectedAddress });

        console.log(selectedAddress);
    }
    ms_handleChange(selectedMS){
        if (selectedMS.value == "Others"){
            this.setState({ otherMS: true })
        }
        this.setState({ selectedMS })
    }
    nation_handleChange(selectedNation){
        if (selectedNation.value == "Others"){
            this.setState({ otherNation: true })
        }
        this.setState({ selectedNation })   
    }

    handelAddressChange(evt) {
        const target = `{ "${evt.target.id}":"${evt.target.value}" }`;
        const update = require('react-addons-update');
        const newData = update(this.state.selectedAddress, { $merge: JSON.parse(target) });
        this.setState({ selectedAddress: newData });
    }

    handleInputChange(evt) {
        
        if (evt.target.id == "Marital_Status__c"){
            if (evt.target.value == "other" ){
                this.setState({ otherMS: true })
            }
        }
        if (evt.target.id == "Nationality__c"){
            if (evt.target.value == "other" ){
                this.setState({ otherNation: true })
            }
        }
        if (evt.target.id == "Race__c"){
            if (evt.target.value == "other" ){
                this.setState({ otherRace: true })
            }
        }
        if (evt.target.id == "Fail_Flat_Type__c"){
            if (evt.target.value == "other" ){
                this.setState({ otherTF: true })
            }
        }

        this.props.changeState([evt.target.name],evt.target.value);
    }

    handleDOBChange(date) {
        var newdate = date.format("YYYY/MM/DD").toString();
        this.props.changeState('Date_of_Birth__c', date.format("YYYY-MM-DD").toString());
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
        const postalCodeOption = []
        this.props.salesforce.postalCodeRecord.fields.records.map((pc_list, idx) => {
           postalCodeOption.push({
               type:"postal_code",
               key: idx,
               value: pc_list.Name,
               label: pc_list.Name});
        });
        this.state.postal_code = postalCodeOption

        const SF_VERSION = 'v20.0';
        const salesforceToken = this.props.salesforce.token
        const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/Person__c/describe/`;
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            timeout: 5000,
        };
        fetch(fullUrl, fetchConfig).then((response) => {
            if (response.status === 204) {
                return { ok: true, id: request.id };
            }
            return response.json();
        }).then((json) => {
            const fields = json.fields;
            fields.sort((a, b) => {
                if (a.label.toUpperCase() < b.label.toUpperCase()) return -1;
                if (a.label.toUpperCase() > b.label.toUpperCase()) return 1;
                return 0;
            });
            fields.map((item) => {
                if (item.name == "Marital_Status__c") {
                    this.state.msList = item.picklistValues                    
                }
                if (item.name == "Nationality__c") {
                    this.state.nationList = item.picklistValues                    
                }
            })

            })
    }


    render() {
        return (
            <div className="col-md-12">
        <div className="row">
            <p className="ptitle">Personal Details</p>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Name <small style={{color:"red"}}>(required)</small></label>
                    <input name="Full_Name__c" id="Full_Name__c" type="text" className="form-control" placeholder="Fullname" onChange={this.handleInputChange}  />
                </div>
                <div className="form-group">
                    <label>ID Type</label>
                    <select id="ID_Type__c" name="ID_Type__c" className="form-control valid" aria-invalid="false" value={this.props.data.ID_Type__c} onChange={this.handleInputChange}>
                        <option value="NRIC">NRIC</option>
                        <option value="FIN">FIN</option>
                        <option value="other">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>ID Number <small style={{color:"red"}}>(required)</small></label>
                    <input name="ID_Number__c" id="ID_Number__c" type="text" className="form-control" placeholder="NRIC / FIN" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Date of Birth </label>
                    <DatePicker
                        selected={this.state.dob}
                        dateFormat="DD/MM/YYYY"
                        onChange={this.handleDOBChange} 
                        placeholderText="Date of Birth"
                        className="form-control fullw"
                        showYearDropdown
                        showMonthDropdown
                    />
                </div>
                <div className="form-group">
                    <label>Marital Status </label>
                    <Select
                        name="Marital_Status__c" 
                        ref="Marital_Status__c" 
                        id="Marital_Status__c" 
                        onChange={this.ms_handleChange}
                        options={this.state.msList}
                        placeholder="please select marital status"
                        value={this.state.selectedMS}
                        required />
                </div>
                <div className="form-group">
                    <label>Other Marital Status</label>
                    <input 
                        name="other4"
                        type="text"
                        className="form-control"
                        placeholder="Please Specify" 
                        disabled={!this.state.otherMS}/>
                </div>
                
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Gender </label>
                    <select name="Gender__c" id="Gender__c" className="form-control valid" aria-invalid="false">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Nationality </label>
                    <Select
                        name="Nationality__c" 
                        ref="Nationality__c" 
                        id="Nationality__c" 
                        onChange={this.nation_handleChange}
                        options={this.state.nationList}
                        placeholder="please select marital status"
                        value={this.state.selectedNation}
                        required />
                </div>
                <div className="form-group" >
                    <label>Other Nationality</label>
                    <input
                        name="other1"
                        type="text"
                        className="form-control"
                        placeholder="Please Specify"
                        disabled={!this.state.otherNation} />
                </div>
                <div className="form-group">
                    <label>Race </label>
                    <select
                        id="Race__c"
                        name="Race__c"
                        className="form-control valid"
                        aria-invalid="false"
                        onChange={this.handleInputChange}>
                        <option value="">Select Race</option>
                        <option  value="Chinese">Chinese</option>
                        <option  value="Malay">Malay</option>
                        <option  value="Indian">Indian</option>
                        <option  value="Eurasian">Eurasian</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Race</label>
                    <input
                        name="other1"
                        type="text"
                        className="form-control"
                        placeholder="Please Specify"
                        disabled={!this.state.otherRace} />
                </div>
            </div>
        </div>  
        <div className="row">
            <p className="ptitle">Address</p>	
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Postal Code</label>
                    {/* <input type="text" name="City__c" id="City__c" className="form-control" placeholder="Please Select Postal Code..." /> */}
                    <Select
                        name="Postal_Code__c" 
                        ref="postal_code" 
                        id="postalCode" 
                        onChange={this.pc_handleChange}
                        options={this.state.postal_code}
                        placeholder="please select postal code"
                        value={this.state.selectedPC}
                        required />
                </div>
                <div className="form-group">
                    <label>Street Name</label>
                    <input 
                        id="Street__c"
                        name="Street__c"
                        type="text"
                        className="form-control"
                        placeholder="5h Avenue"
                        value={this.state.selectedAddress.Street__c}
                        onChange={this.handelAddressChange} />
                </div>
                <div className="form-group">
                    <label>Block Number</label>
                    <input
                        id="Block__c"
                        name="Block__c"
                        type="text"
                        className="form-control"
                        placeholder="242"
                        value={this.state.selectedAddress.Block__c}
                        onChange={this.handelAddressChange} />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Type of Flat  </label>
                    <select
                        id="Fail_Flat_Type__c" 
                        name="Fail_Flat_Type__c"
                        className="form-control valid"
                        aria-invalid="false"
                        onChange={this.handleInputChange}>
                        <option value="1 Room HDB Flat">1 Room HDB Flat</option>
                        <option value="2 Room HDB Flat">2 Room HDB Flat</option>
                        <option value="3 Room HDB Flat">3 Room HDB Flat</option>
                        <option value="4 Room HDB Flat">4 Room HDB Flat</option>
                        <option value="5 Room HDB Flat">5 Room HDB Flat</option>
                        <option value="Interim Rental Housing">Interim Rental Housing</option>
                        <option value="Transitional Shelter">Transitional Shelter</option>
                        <option value="Crisis Shelter">Crisis Shelter</option>
                        <option value="Homeless">Homeless</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Type of Flat</label>
                    <input
                        name="other2"
                        type="text"
                        className="form-control"
                        placeholder="Please Specify"
                        disabled={!this.state.otherTF} />
                </div>
                
                <div className="form-group">
                    <label>Country</label><br />
                    <input
                        id="Country__c"
                        name="Country__c"
                        type="text"
                        className="form-control"
                        placeholder="242"
                        value={this.state.selectedAddress.Country__c}
                        onChange={this.handelAddressChange} />
                    {/* <select name="Country__c" id="Country__c" className="form-control" >
                        <option value="Singapore"> Singapore </option>
                        <option value="Albania"> Albania </option>
                        <option value="Algeria"> Algeria </option>
                        <option value="American Samoa"> American Samoa </option>
                        <option value="Andorra"> Andorra </option>
                        <option value="Angola"> Angola </option>
                        <option value="Anguilla"> Anguilla </option>
                        <option value="Antarctica"> Antarctica </option>
                        <option value="...">...</option>
                    </select> */}
                </div>
            </div>
        </div>
        <div className="row">	
            <p>Personal Contact</p>	
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Home Phone <small style={{color:"red"}}>(required)</small></label>
                    <input name="Home_Phone__c" id="Home_Phone__c" type="text" className="form-control" placeholder="Home no." />
                </div>
                <div className="form-group">
                    <label>Mobile Phone</label>
                    <input name="Mobile_Phone__c" id="Mobile_Phone__c" type="text" className="form-control" placeholder="Mobile no." />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Email Address </label>
                    <input name="Email_Address__c" id="Email_Address__c" type="text" className="form-control " placeholder="Email address" />
                </div>
                
            </div>	
        </div>	          
    </div>)
    }
}

Tab2.propTypes = {
    title: PropTypes.string
};
Tab2.defaultProps = {
    title: 'tab2 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
