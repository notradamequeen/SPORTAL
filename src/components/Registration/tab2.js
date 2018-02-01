import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Tab2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: moment()
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        
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
    }


    render() {
        return (
            <div className="col-md-12">
        <div className="row">
            <p className="ptitle">Personal Details</p>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Name <small>(required)</small></label>
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
                    <label>ID Number <small>(required)</small></label>
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
                    <select className="form-control valid" name="Marital_Status__c" id="Marital_Status__c" aria-invalid="false" value={this.props.data.Marital_Status__c} onChange={this.handleInputChange}>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Marital Status</label>
                    <input name="other4" type="text" className="form-control" placeholder="Please Specify" />
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
                    <select name="Nationality__c" id="Nationality__c" className="form-control valid " aria-invalid="false">
                        <option value="Singaporean">Singaporean</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group" >
                    <label>Other Nationality</label>
                    <input name="other1" type="text" className="form-control" placeholder="Please Specify" />
                </div>
                <div className="form-group">
                    <label>Race </label>
                    <select id="Race__c" name="Race__c" className="form-control valid" aria-invalid="false">
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
                    <input name="other1" type="text" className="form-control" placeholder="Please Specify" />
                </div>
            </div>
        </div>  
        <div className="row">
            <p className="ptitle">Address</p>	
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Street Name</label>
                    <input id="Street__c" name="Street__c" type="text" className="form-control" placeholder="5h Avenue" />
                </div>
                <div className="form-group">
                    <label>Block Number</label>
                    <input id="Unit_Number__c" name="Unit_Number__c" type="text" className="form-control" placeholder="242" />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="City__c" id="City__c" className="form-control" placeholder="New York..." />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Type of Flat  </label>
                    <select id="Fail_Flat_Type__c" name="Fail_Flat_Type__c" className="form-control valid" aria-invalid="false">
                        <option value="1 Room HDB Flat">1 Room HDB Flat</option>
                        <option value="2 Room HDB Flat">2 Room HDB Flat</option>
                        <option value="3 Room HDB Flat">3 Room HDB Flat</option>
                        <option value="4 Room HDB Flat">4 Room HDB Flat</option>
                        <option value="5 Room HDB Flat">5 Room HDB Flat</option>
                        <option value="Interim Rental Housing">Interim Rental Housing</option>
                        <option value="Transitional Shelter">Transitional Shelter</option>
                        <option value="Crisis Shelter">Crisis Shelter</option>
                        <option value="Homeless">Homeless</option>
                        <option  value="Other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Type of Flat</label>
                    <input name="other2" type="text" className="form-control" placeholder="Please Specify" />
                </div>
                
                <div className="form-group">
                    <label>Country</label><br />
                    <select name="Country__c" id="Country__c" className="form-control" >
                        <option value="Singapore"> Singapore </option>
                        <option value="Albania"> Albania </option>
                        <option value="Algeria"> Algeria </option>
                        <option value="American Samoa"> American Samoa </option>
                        <option value="Andorra"> Andorra </option>
                        <option value="Angola"> Angola </option>
                        <option value="Anguilla"> Anguilla </option>
                        <option value="Antarctica"> Antarctica </option>
                        <option value="...">...</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="row">	
            <p>Personal Contact</p>	
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Home Phone <small>(required)</small></label>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
