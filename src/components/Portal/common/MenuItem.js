import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions';


const MenuItem = (props) => {
    const pathName = props.location.pathname || '';
    return (
        <ul className="nav" id="portalNavigation">
            <li className={props.location.pathname === '/portal' ? 'active' : ''}>
                <Link to="/portal" className="menu-item">
                    <i className="fa fa-dashboard" /> Dashboard
                </Link>
            </li>
            <li className={pathName.indexOf('application') > -1 ? 'active' : ''}>
                <Link to="/portal/applications" className="menu-item">
                    <i className="fa fa-paperclip" /> Applications
                </Link>
            </li>
            <li className={pathName.indexOf('beneficiar') > -1 ? 'active' : '' }>
                <Link to="/portal/beneficiaries" className="menu-item">
                    <i className="fa fa-users" /> Beneficiaries
                </Link>
            </li>
            <li className={pathName.indexOf('receipt') > -1 ? 'active' : ''}>
                <Link to="/portal/receipt" className="menu-item">
                    <i className="fa fa-bookmark" /> Receipts
                </Link>
            </li>
            <li className={pathName.indexOf('fundrequest') > -1 ? 'active' : ''}>
                <Link to="/portal/fundrequests" className="menu-item">
                    <i className="fa fa-folder" />  Fund Requests
                </Link>
            </li>
            <li >
                <Link to="/" className="menu-item">
                    <i className="fa fa-cut" /> Terminations
                </Link>
            </li>
            <li >
                <Link to="/" className="menu-item">
                    <i className="fa fa-credit-card" /> Transfer
                </Link>
            </li>
            <li >
                <a href={null} className="menu-item" onClick={props.logout} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-sign-out" /> Logout
                </a>
            </li>
        </ul>
    );

};

MenuItem.propTypes = {
    logout: PropTypes.func.isRequired,
    location: PropTypes.object,
};

MenuItem.defaultProps = {
    location: {
        pathname: '',
    },
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        logout,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
