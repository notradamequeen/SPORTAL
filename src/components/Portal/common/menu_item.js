import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions';
import '../../../assets/css/portal.css';


class MenuItem extends React.Component {
    render() {
        return (
            <div className="col-md-12 menu-item">
                <ul className="nav">
                    <li className="active">
                        <a href="/portal" className="menu-item">
                            <i className="fa fa-dashboard" />
                            Dashboard
                        </a>
                    </li>
                    <li >
                        <a href="/portal/applications" className="menu-item">
                            <i className="fa fa-list-ul" /> Applications
                        </a>
                    </li>
                    <li >
                        <a href="/portal/beneficiaries" className="menu-item">
                            <i className="fa fa-list-ul" /> Beneficiaries
                        </a>
                    </li>
                    <li >
                        <a href="/portal/receipts" className="menu-item">
                            <i className="fa fa-list-ul" /> Receipts
                        </a>
                    </li>
                    <li>
                        <a href="/portal/fundrequests" className="menu-item">
                            <i className="fa fa-list-ul" />  Fund Requests
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul" /> Terminations
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul" /> Transfer
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item" onClick={this.props.logout}>
                            <i className="fa fa-list-ul" /> Logout
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

MenuItem.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
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
