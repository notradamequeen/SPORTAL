import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import '../../assets/css/form-style.css';
import 'react-datepicker/dist/react-datepicker.css';

class Tab1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: ''
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
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD"));
        //this.setState(dob, date.format("YYYY/MM/DD"));
        console.log(date);
    }

    componentWillMount(){
        
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="col-md-12 print">
                <br />
                <p> * This form takes about 10 - 12 minutes to complete. Please ensure that you have the below documents scanned and ready for upload.</p>
                <br />
                <h4 className="info-text">Eligibility Criteria</h4>
                <br />
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input 
                            type="checkbox"
                            name="check4" 
                            id="check4"
                            defaultChecked={this.props.data.check4}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="col-sm-11 text-content">
                            Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check5" id="check5" defaultChecked={this.props.data.check5} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-sm-11 text-content">
                        Family is living in a 4-room HDB flat or smaller
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check6" id="check6" defaultChecked={this.props.data.check6} onChange={this.handleInputChange} />
                    </div>
                    <div className="col-sm-11 text-content">
                        Family has a gross per capita income (PCI) of $625/ month or less
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check7" id="check7" defaultChecked={this.props.data.check7} onChange={this.handleInputChange} /> 
                    </div>
                    <div className="col-sm-11 text-content">
                        Is not concurrently receiving School Pocket Money Fund from any other STSPMF disbursing agency/school or any other similar schemes except MOE Financial Assistance Scheme
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check8" id="check8" defaultChecked={this.props.data.check8} onChange={this.handleInputChange} /> 
                    </div>
                    <div className="col-sm-11 text-content">
                        Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check9" id="check9" defaultChecked={this.props.data.check9} onChange={this.handleInputChange} /> 
                    </div>
                    <div className="col-sm-11 text-content">
                        Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education.
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check10" id="check10" defaultChecked={this.props.data.check10} onChange={this.handleInputChange} />  
                    </div>
                    <div className="col-sm-11 text-content">  
                        Student is 20 years or younger at point of application 
                    </div>
                </div>
                <hr className="dashed"/>
                <h4 className="info-text">All completed STSPMF application forms must be attached with the relevant documents listed below:</h4>
                <br />
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check1" id="check1" defaultChecked={this.props.data.check1} onChange={this.handleInputChange} />   
                    </div>
                    <div className="col-sm-11 text-content">
                        Soft copy of student(s)’s NRIC / birth certificate
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 checkContainer">
                        <input type="checkbox" name="check2" id="check2" defaultChecked={this.props.data.check2} onChange={this.handleInputChange} /> 
                    </div>
                    <div className="col-sm-11 text-content">
                        Soft copy of both parents’/ guardian’s NRIC / passport
                    </div>
                </div>
                <br />
                <p className="red">STSPMF reserves the right to reject the application if any of the supporting documents is not submitted</p>
                <br />
            </div>
        )
    }
}

Tab1.propTypes = {
    title: PropTypes.string
};
Tab1.defaultProps = {
    title: 'tab1 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
