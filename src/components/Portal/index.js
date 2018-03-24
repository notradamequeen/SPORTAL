import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SideMenu from './common/SideMenu';
import '../../assets/css/themify-icons.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/paper-dashboard.css';
import ApplicationList from './Application/ApplicationList';
import BeneficiaryList from './Beneficiary/BeneficiaryList';
import BeneficiaryDetail from './Beneficiary/BeneficiaryDetail';
import FundRequestList from './FundRequest/FundRequestList';
import ApplicationDetail2 from './Application/ApplicationDetail2';
import Dashboard from './Dashboard';
import Receipt from './Receipt';
import TopMenu from './common/TopMenu';


const ParentLayout = (props) => {
    
    if (props.currentUser.loggedInUser === null) {
        return (<Redirect to={{
            pathname: '/login',
            state: { from: props.location },
        }}
        />);
    }
    return (
        <div className="wrapper">
            <div className="sidebar" data-background-color="white" data-active-color="danger">
                <SideMenu location={props.location} />
            </div>
            <div className="main-panel">
                <TopMenu title="SPMF Partner Portal" user={props.currentUser} location={props.location} />
                <div className="content">
                    <div className="container-fluid">
                        <TransitionGroup>
                            <CSSTransition key={props.location.key} classNames="fade" timeout={300}>
                                <Switch location={props.location}>
                                    <Route exact path="/portal/" component={Dashboard}/>
                                    <Route path="/portal/applications" component={ApplicationList} />
                                    <Route path="/portal/application/:applicantionId" component={ApplicationDetail2} />
                                    <Route path="/portal/beneficiary/:id" component={BeneficiaryDetail} />
                                    <Route path="/portal/beneficiaries" component={BeneficiaryList} />
                                    <Route path="/portal/fundrequests" component={FundRequestList} />
                                    <Route path="/portal/receipt" component={Receipt} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};


ParentLayout.propTypes = {
    location: PropTypes.object,
    currentUser: PropTypes.object,
};
ParentLayout.defaultProps = {
    location: {},
    currentUser: null,
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    currentUser: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(ParentLayout);
