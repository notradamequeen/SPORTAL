import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../../assets/css/portal.css';


class MenuItem extends React.Component {

    render () {
        return (
            <div className="col-md-12 menu-item">
                <ul className="nav">
                    <li className="active">
                        <a href="#" className="menu-item">
                            <i className="fa fa-dashboard"></i>
                            Dashboard
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i> Applications
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i> Beneficiaries
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i> Receipts
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i>  Fund Requests
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i> Terminations
                        </a>
                    </li>
                    <li >
                        <a href="#" className="menu-item">
                            <i className="fa fa-list-ul"></i> Transfer
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

MenuItem.propTypes = {
    title: PropTypes.string,
};
MenuItem.defaultProps = {
    title: 'Hello World',
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);