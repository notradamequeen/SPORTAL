import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import PropTypes from 'prop-types';




const TopMenu = props => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header" style={{ backgroundColor: 'transparent' }}>
                <button type="button" className="navbar-toggle">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar bar1" />
                    <span className="icon-bar bar2" />
                    <span className="icon-bar bar3" />
                </button>
                <h3>{props.title}</h3>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/portal" className="baloon_profile">
                            <div className="bg-inverse text-black">
                                <i className="fa fa-2x fa-cog" />
                                <p style={{ marginLeft: 20 }}>{props.user.loggedInUser.Name} - {props.user.loggedInUser.Email} - {props.user.loggedInUser.Partner_Authority__c}</p>
                            </div>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
);

TopMenu.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    location: PropTypes.object,
};

TopMenu.defaultProps = {
    title: '',
    location: {},
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
