import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Tab5 extends React.Component {

    constructor() {
        super();
        this.state = {
            isAgree : false,
            beneficiaries : [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        this.setState({isAgree: !this.state.isAgree})
        this.props.changeState([event.target.name],!this.state.isAgree);
    }
    submitApp = () => {
        this.props.submitApp();
    }
    componentDidMount() {
        let beneficiaries = []
        this.props.data.Ben.map((benData) => {
            beneficiaries.push(benData.data.Full_Name__c);
        })
        this.setState({beneficiaries})
    }

    render() {
        return (
            <div className="col-md-12 print">
                <div className="row">
                    <br />
                    <h4 className="info-text">Declaration of consent</h4>
                    <div className="col-sm-10 col-sm-offset-1">
                        <p>1. I, <span className="span_name"></span> {this.props.data.Full_Name__c}, I/C No <span className="span_nric"></span> {this.props.data.ID_Number__c}, declare that [my child/children/ward (s)] is/are currently NOT receiving The Straits Times School Pocket Money Fund (STSPMF) from any other STSPMF disbursing agency/school and have not applied for STSPMF at another disbursing agency/school.</p>
                        <p>2. 1.	I declare that {this.state.beneficiaries.toString()} is/are NOT receiving other similar monthly pocket money schemes excluding MOE FAS.
                            </p>
                        <p>3. I acknowledge that for the purpose of facilitating my application for the STSPMF, that is administered by the STSPMF through disbursing agencies and schools,</p>
                            {/* <ul className="ulnone"> */}
                            &nbsp;<p>a) any and all agencies and schools that have any of my prior financial assistance or social assistance records may share the relevant information with STSPMF.</p>
                            &nbsp;<p>b) that the record of this application, if approved, may be shared with STSPMF Trustees, the school and any agency or persons authorised by The Straits Times School Pocket Money Fund for the purpose of rendering me or assessing my eligibility for financial or other assistance in future occasions; or for research studies in which I, as a specific individual, shall not be identified; or for any other purpose prescribed or permitted under Singapore law. </p>
                            {/* </ul> */}
                        {/* </p> */}
                        <p>4. I acknowledge that the information I have provided is accurate. I understand that [my children / my ward(s)] data will be stored in the electronic Case Management System (and in future, any replacement system developed by STSPMF) and consent for the data to be shared with STSPMF and across other agencies for analysis and enhancement of service delivery. 
                            </p>
                        <p>5. I am aware that the disbursing agency and/or STSPMF has the right to recover in full the STSPMF that was given to me, if I have provided inaccurate information, or withheld any relevant information from the school.</p>
                        <p>6. I am aware that the STSPMF assistance is given for the benefit of [children/ ward(s)], for use as pocket money in school.
                            </p>
                        
                    </div>
                </div> 
                <hr />
                <div className="row">
                    <h4 className="info-text">MEDIA COVERAGE </h4>
                    <div className="col-sm-10 col-sm-offset-1">
                        <p>This section seeks the consent of the STSPMF applicant to be featured and interviewed for articles on STSPMF. I, {this.props.data.Full_Name__c}, NRIC No {this.props.data.ID_Number__c}, to my Family/me being featured.</p>
                    </div>
                </div>
                <div className="row">
                    <br />
                    <center>
                        <input
                            type="checkbox" 
                            name="PDPA_Consent__c"
                            id="checkagree"
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            disabled={this.props.data.isSubmitted ? true : false}
                            /> 													
                        <input 
                            type='button' 
                            className='btn btn-lg btn-fill btn-primary btn-wd'
                            id="agreebtn"
                            name='agree'
                            value='I Agree and Submit'
                            onClick={this.props.submitApp} 
                            disabled={this.props.data.isSubmitted || !this.state.isAgree ? true : false} />
                    </center>
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}

Tab5.propTypes = {
    title: PropTypes.string
};
Tab5.defaultProps = {
    title: 'tab5 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab5);
