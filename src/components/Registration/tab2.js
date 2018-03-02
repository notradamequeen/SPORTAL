import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getApplicationField, getPersonField } from '../../actions/salesforces';
import { regexValidate, validateNRIC } from '../../utils/common';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import '../../assets/css/form-style.css';
import 'react-datepicker/dist/react-datepicker.css';

class Tab2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            postal_code: [],
            selectedPC: {},
            selectedAddress: {
                Street__c: '',
                Block__c: '',
                Contry__c: '',
            },
            otherMS: false,
            otherNation: false,
            otherRace: false,
            otherTF: false,
            msList: [],
            flatTypeList: this.props.data.flatTypeList,
            selectedMS: null,
            nationList: [],
            selectedNation: {},
            selectedFlatType: {},
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.handelAddressChange              = this.handelAddressChange.bind(this);
        this.ms_handleChange                  = this.ms_handleChange.bind(this);
        this.nation_handleChange              = this.nation_handleChange.bind(this);
        this.flatType_handleChange            = this.flatType_handleChange.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
    }

    inputChangeHandler(event) {
        //this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name],event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    pc_handleChange = (selectedPC) => {
        if (selectedPC == null){
            this.props.changeState('Postal__c', '')
            this.props.changeState('Street__c', '')
            this.props.changeState('Blok__c', '')
            this.props.changeState('Blok__c', '')
            this.setState({ selectedPC: {}, 
                selectedAddress: {Street__c: '',
                    Block__c: '',
                    Contry__c: '',
                }
            });
        } else {
            const selectedAddress = this.props.salesforce.postalCodeRecord.fields.records[selectedPC.key]
            console.log('pc', selectedAddress)
            this.props.changeState('Postal__c', selectedPC.value)
            this.props.changeState('Street__c', selectedAddress.Street__c)
            this.props.changeState('Blok__c', selectedAddress.Block__c)
            this.props.changeState('Blok__c', selectedAddress.Country__c)
            this.setState({ selectedPC, selectedAddress });
        }
        
    }
    ms_handleChange(selectedMS){
        if (selectedMS.value == "Others"){
            this.setState({ otherMS: true })
        } else {
            this.setState({ otherMS: false })
        }
        this.props.changeState('Marital_Status__c', selectedMS.value);
        this.setState({ selectedMS })
    }
    nation_handleChange(selectedNation){
        if (selectedNation.value == "Others"){
            this.setState({ otherNation: true })
        } else {
            this.setState({ otherNation: false })
        }
        this.props.changeState('Nationality__c', selectedNation.value);
        this.setState({ selectedNation })   
    }

    flatType_handleChange(selectedFlatType){
        if (selectedFlatType.value == "Others"){
            this.setState({ otherTF: true })
        } else {
            this.setState({ otherTF: false })
        }
        this.setState({ selectedFlatType })
        this.props.changeState(['Flat_Type__c'],selectedFlatType.value);  
    }

    handelAddressChange(evt) {
        const target = `{ "${evt.target.id}":"${evt.target.value}" }`;
        const update = require('react-addons-update');
        const newData = update(this.state.selectedAddress, { $merge: JSON.parse(target) });
        this.setState({ selectedAddress: newData });

        this.props.changeState([evt.target.name],evt.target.value);
    }

    handleInputChange(evt) {  
        const value = evt.target.value
        if (evt.target.id == "Race__c"){
            if (value == "Others" ){
                this.setState({ otherRace: true })
            } else {
                this.setState({ otherRace: false })
            }
        }
        if(evt.target.name.indexOf("Email") !== -1){
            let isValidEmail = value !== '' ? regexValidate('email', value) : true;
            if(!isValidEmail) {
                document.getElementById("email_error").innerHTML = "invalid email format"
            } else {
                document.getElementById("email_error").innerHTML = ''
            }
            this.props.data.isValidMainEmail = isValidEmail;
            
            console.log(event.target.style)
        }
        if (evt.target.name == 'ID_Number__c'){
            const isValidId = validateNRIC(value)
            if(!isValidId) {
                document.getElementById("nric_error").innerHTML = "invalid NRIC/FIN format"
            } else {
                document.getElementById("nric_error").innerHTML = ""
            }
            this.props.data.isValidMainNric = isValidId;
        }
        this.props.changeState([evt.target.name],value);
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
        if (this.props.salesforce.postalCodeRecord.fields.records === undefined) return;
        this.props.salesforce.postalCodeRecord.fields.records.map((pc_list, idx) => {
           postalCodeOption.push({
               type:"postal_code",
               key: idx,
               value: pc_list.Name,
               label: pc_list.Name});
        });
        this.state.postal_code = postalCodeOption
        this.forceUpdate();
        console.log('tab 2', this.state)
    }
    render() {
        return (
            <div className="col-md-12 print">
                <div className="row">
                    <br />
                    <h4 className="info-text">Personal Details</h4>
                    <br />
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Name <small style={{color:"red"}}>(required)</small></label>
                            <input name="Full_Name__c" id="Full_Name__c" type="text" className="form-control" placeholder="Fullname" onChange={this.handleInputChange}  />
                        </div>
                        <div className="form-group">
                            <label>ID Type <small className="red">(required)</small></label>
                            <select 
                                id="ID_Type__c"
                                name="ID_Type__c"
                                className="form-control valid select"
                                aria-invalid="false"
                                value={this.props.data.ID_Type__c}
                                onChange={this.handleInputChange}>
                                <option value="NRIC">NRIC</option>
                                <option value="FIN">FIN</option>
                                <option value="other">Others</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>ID Number <small style={{color:"red"}}>(required)</small></label>
                            <input
                                name="ID_Number__c"
                                id="ID_Number__c"
                                type="text"
                                className="form-control"
                                placeholder="NRIC / FIN"
                                maxLength="9"
                                onChange={this.handleInputChange}
                            />
                            <span id="nric_error" style={{color: "red"}}></span>
                        </div>
                        <div className="form-group">
                            <label>Date of Birth <small className="red">(required)</small></label>
                            <DatePicker
                                name="Date_of_Birth__c"
                                selected={this.state.dob}
                                dateFormat="DD/MM/YYYY"
                                onChange={this.handleDOBChange} 
                                placeholderText="Date of Birth"
                                className="form-control fullw"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        </div>
                        <div className="form-group">
                            <label>Marital Status <small className="red">(required)</small></label>
                            <Select
                                name="Marital_Status__c" 
                                ref="Marital_Status__c" 
                                id="Marital_Status__c" 
                                onChange={this.ms_handleChange}
                                options={this.props.data.msList}
                                placeholder="please select marital status"
                                value={this.state.selectedMS}
                                required />
                        </div>
                        <div className="form-group">
                            <label>Other Marital Status</label>
                            <input 
                                name="Other_Marital_Status__c"
                                type="text"
                                className="form-control"
                                placeholder="Please Specify" 
                                disabled={!this.state.otherMS}/>
                        </div>
                        
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Gender <small className="red">(required)</small></label>
                            <select name="Gender__c" id="Gender__c" className="form-control valid select" aria-invalid="false">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nationality <small className="red">(required)</small></label>
                            <Select
                                name="Nationality__c" 
                                ref="Nationality__c" 
                                id="Nationality__c" 
                                onChange={this.nation_handleChange}
                                options={this.props.data.nationList}
                                placeholder="please select marital status"
                                value={this.props.data.Nationality__c}
                                required />
                        </div>
                        <div className="form-group" >
                            <label>Other Nationality</label>
                            <input
                                name="Other_Nationality__c"
                                type="text"
                                className="form-control"
                                placeholder="Please Specify"
                                disabled={!this.state.otherNation} />
                        </div>
                        <div className="form-group">
                            <label>Race <small className="red">(required)</small></label>
                            <select
                                id="Race__c"
                                name="Race__c"
                                className="form-control valid select"
                                aria-invalid="false"
                                onChange={this.handleInputChange}>
                                <option value="" className="white"></option>
                                {this.props.data.raceList !== undefined && 
                                    this.props.data.raceList.map((option) => {
                                        return (
                                            <option key={option.value} value={option.value} className="white">{option.label}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Other Race</label>
                            <input
                                name="Other_Race__c"
                                type="text"
                                className="form-control"
                                placeholder="Please Specify"
                                disabled={!this.state.otherRace} />
                        </div>
                    </div>
                </div>  
                <div className="row">
                    <br />
                    <h4 className="info-text">Address</h4>
                    <br />
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Postal Code <small className="red">(required)</small></label>
                            {/* <input type="text" name="City__c" id="City__c" className="form-control" placeholder="Please Select Postal Code..." /> */}
                            <Select
                                name="Postal__c" 
                                ref="postal_code" 
                                id="postalCode" 
                                onChange={this.pc_handleChange}
                                options={this.state.postal_code}
                                placeholder="please select postal code"
                                value={this.state.selectedPC}
                                required />
                        </div>
                        <div className="form-group">
                            <label>Street Name <small className="red">(required)</small></label>
                            <input 
                                id="Street__c"
                                name="Street__c"
                                type="text"
                                className="form-control"
                                placeholder="Street Name Ex: 5h Avenue"
                                value={this.props.data.Street__c}
                                onChange={this.handelAddressChange} />
                        </div>
                        <div className="form-group">
                            <label>Block Number <small className="red">(required)</small></label>
                            <input
                                id="Block__c"
                                name="Block__c"
                                type="text"
                                className="form-control"
                                placeholder="Block Number Ex: 242"
                                value={this.props.data.Block__c}
                                onChange={this.handelAddressChange} />
                        </div>
                        <div className="form-group">
                            <label>Unit Number</label>
                            <input
                                id="Unit_Number__c"
                                name="Unit_Number__c"
                                type="text"
                                className="form-control"
                                placeholder="Unit Number Ex: 242"
                                value={this.props.data.Unit_Number__c ? this.props.data.Unit_Number__c : ''}
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Type of Flat <small className="red">(required)</small></label>
                            <Select
                                id="Flat_Type__c" 
                                name="Flat_Type__c"
                                aria-invalid="false"
                                options={this.props.data.flatTypeList}
                                value={this.state.selectedFlatType}
                                onChange={this.flatType_handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Other Type of Flat</label>
                            <input
                                name="Other_Flat_Type__c"
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
                                value={this.props.data.Country__c}
                                onChange={this.handelAddressChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <br />
                    <h4 className="info-text">Personal Contact</h4>
                    <br />
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Contact Number <small style={{color:"red"}}>(required)</small></label>
                            <input
                                name="Contact_Number__c"
                                id="Contact_Number__c"
                                type="text"
                                className="form-control"
                                placeholder="Contact Number"
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Mobile Phone</label>
                            <input
                                name="Mobile_Phone__c"
                                id="Mobile_Phone__c"
                                type="text"
                                className="form-control"
                                placeholder="Mobile no."
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Office Phone</label>
                            <input
                                name="Office_Number__c"
                                id="Office_Phone__c"
                                type="text"
                                className="form-control"
                                placeholder="Office Phone"
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Home Phone</label>
                            <input
                                name="Home_Phone__c"
                                id="Home_Phone__c"
                                type="text"
                                className="form-control"
                                placeholder="Home Phone"
                                onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Email Address <small className="red">(required)</small></label>
                            <input
                                name="Email_Address__c"
                                id="Email_Address__c"
                                type="text"
                                className="form-control"
                                placeholder="Email address"
                                onChange={this.handleInputChange} />
                                <span id="email_error" style={{color: "red"}}></span>
                        </div>
                        
                    </div>	
                </div>	          
            </div>
        )
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
