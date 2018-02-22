import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Success extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: ''
        }
    }
    render() {
        return (
            <div className="container body" id="printed">
                <div className="col-md-12" id="logoHeader">
                    <div className="col-md-3">
                    <img src={require('../../assets/img/spmf_logo.jpg')} width="150px"/>
                    </div>
                    <div className="col-md-9 header-title">
                        <br /><br /><br /><br />
                        <h4>STSPMF Application Form</h4>
                    </div>
                </div>
                <div className="col-md-12" style={{ marginTop: "60px"}}>
                    <h4 style={{textAlign: "center"}}> Thanks for your Application, Your Application has successfuly submitted! </h4>
                </div>
            </div>
        )
    }
}

Success.propTypes = {
    title: PropTypes.string
};
Success.defaultProps = {
    title: 'tab1 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce
})

export default connect(mapStateToProps, mapDispatchToProps)(Success);