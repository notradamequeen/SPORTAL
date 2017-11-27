import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab1 = props => (
    <div className="col-md-12">
        <p><b>Eligibility Criteria</b></p>
        <ul className="ulnone">
                <li><input type="checkbox" value="1" name="check4" required /> Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)</li>
                <li><input type="checkbox" value="1" name="check5" required /> Family is living in a 4-room HDB flat or smaller</li>
                <li><input type="checkbox" value="1" name="check6" required /> Family has a gross per capita income (PCI) of $625/ month or less</li>
                <li><input type="checkbox" value="1" name="check7" required /> Student is receiving full-time formal education in a mainstream primary / secondary / mixed level / Junior College / Centralised Institute; Institutes of Technical Education; Polytechnic; Specialised; Independent; Specialised Independent; SPED; MOE-designated full-time Madrasahs and Mountbatten Vocational school</li>
                <li><input type="checkbox" value="1" name="check8" required /> Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme</li>
                <li><input type="checkbox" value="1" name="check8" required /> Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education. </li>
                <li><input type="checkbox" value="1" name="check9" required /> Student is 20 years or younger at point of application </li>
            </ul>
        <p><b>All completed STSPMF application forms must be attached with the relevant documents listed below:</b></p>
        <ul>
            <li><input type="checkbox" value="1" name="check1" required /> Photocopy of student(s)’s NRIC / birth certificate </li>
            <li><input type="checkbox" value="1" name="check2" required /> Photocopy of both parents’/ guardian’s NRIC / passport</li>
            <li><input type="checkbox" value="1" name="check3" required /> Documentary evidence of gross household income of every single member of the household eg: latest payslips and CPF statements for the past 15 months (My Contribution, My Statement and Transaction History) or income declaration (only if applicant is unemployed)</li>
        </ul>
        <p className="red">STSPMF reserves the right to reject the application if any of the supporting documents is not submitted</p>
        
            
    </div>
);


Tab1.propTypes = {
    title: PropTypes.string
};
Tab1.defaultProps = {
    title: 'tab1',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab1);

