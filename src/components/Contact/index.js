import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/';
import { styles } from '../../assets/css/style.css';

const Contact = props => (
    <div className="container body">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/profile">Profile</a></li>
                <li class="active"><a href="/contact">Contact</a></li>
                <li><a href="#" onClick={props.logoutUser}>Logout</a></li>
                </ul>
            </div>
        </nav>
        <div className="main_container">
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="profile_container">
                        Contact Page ({props.user.uid})
                    </div>
                </div>
            </div>
        </div>
    </div>
);


Contact.propTypes = {
    title: PropTypes.string,
    logoutUser: PropTypes.func.isRequired,
};
Contact.defaultProps = {
    title: 'Contact',
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        logoutUser,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Contact);

