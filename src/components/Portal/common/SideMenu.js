import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

const SideMenu = props => (
    <div className="sidebar-wrapper">
        <div className="logo">
            <Link to="/portal" className="simple-text">
                Partner Portal
            </Link>
            <div>
                <center>
                    <img src={require('../../../assets/img/face-0.jpg')} alt="Face" />
                    <h6> {props.user.loggedInUser ? props.user.loggedInUser.Account.Name : ''} </h6>
                </center>
            </div>
        </div>
        <MenuItem location={props.location} />
    </div>
);


SideMenu.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
};
SideMenu.defaultProps = {
    location: {},
    user: {},
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);