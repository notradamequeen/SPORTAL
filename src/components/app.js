import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gentelella/build/css/custom.min.css';
import swal from 'sweetalert';
import propTypes from 'prop-types';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Contact from './Contact';
import Registration from './Registration';
import Dashboard from './Portal';
import ApplicationList from './Portal/Application/ApplicationList';
import BeneficiaryList from './Portal/Beneficiary/BeneficiaryList';
import { spmfcloudFunctionUrl } from '../actions/salesforces';
import { request } from 'https';


const CPrivateRoute = props => (
    <Route
        render={() => {
            if (props.currentUser.loggedInUser !== null) {
                return <props.component />;
            }
            return (<Redirect to={{
                pathname: '/login',
                state: { from: props.location},
            }}
            />);
        }}
    />
);


CPrivateRoute.propTypes = {
    component: propTypes.func.isRequired,
    location: propTypes.any.isRequired,
    currentUser: propTypes.object.isRequired,
};

const privateRouteToProps = state => ({
    currentUser: state.user,
});

const PrivateRoute = connect(privateRouteToProps)(CPrivateRoute);


class AllRoutes extends React.Component {
    constructor() {
        super();
        this.state = {
            isRobot: true,
        };
        this.recaptchaInstance = null;
        this.verifyCallback = this.verifyCallback.bind(this);
        this.onLoadCallback = this.onLoadCallback.bind(this);
        this.resetRecaptcha = this.resetRecaptcha.bind(this);
    }

    componentWillMount() {
        
    }

    componentWillUnmount() {
        
    }

    async onLoadCallback() {
        const { siteToken } = this.props.store.getState().user;
        if (siteToken === null) return;
        try {
            const result = await fetch(`${spmfcloudFunctionUrl}/validate-site-token`, {
                headers: {
                    'hash-token': siteToken.hash,
                    accept: 'application/json',
                },
                method: 'POST',
            }).then(fetchResponse => fetchResponse.json());
            if (result.tokenValid === true) {
                this.setState({
                    isRobot: false,
                });
            }
        } catch (error) {
            swal({
                title: 'Error when getting verifying token',
                text: error.toString(),
                dangerMode: true,
            });
        }
    }

    async verifyCallback(response) {
        try {
            const result = await fetch(`${spmfcloudFunctionUrl}/get-site-token`, {
                headers: {
                    'g-recaptcha-response': response,
                    accept: 'application/json',
                },
            }).then(fetchResponse => fetchResponse.json());
            this.props.store.dispatch({
                type: 'RECAPTCHA_RESPONSE',
                payload: response,
            });
            this.props.store.dispatch({
                type: 'SITE_TOKEN',
                payload: result,
            });
            this.setState({
                isRobot: false,
            });
        } catch (error) {
            swal({
                title: 'Error when getting site token',
                text: error.toString(),
                dangerMode: true,
            });
        }
       
    }

    resetRecaptcha() {
        this.recaptchaInstance.reset();
    }


    render() {
        if (this.state.isRobot === true) {
            return (
                <div className="recaptcha">
                    <img
                        src="https://www.spmf.org.sg/resources/front/template/spmf/images/logo.png"
                        alt="logo"
                        className="logo"
                        style={{
                            width: 200,
                        }}
                    />
                    <p>We need to verify that you're not a robot.</p>
                    <Recaptcha
                        ref={(e) => {
                            this.recaptchaInstance = e;
                        }}
                        sitekey="6LcdyUwUAAAAAFVIkS-asXxGYbTKKgKtqUcBYvCt"
                        size="normal"
                        render="explicit"
                        verifyCallback={this.verifyCallback}
                        onloadCallback={this.onLoadCallback}
                        expiredCallback={this.expiredCallback}
                    />
                    <br />
                    <button onClick={this.resetRecaptcha} className="btn btn-default">
                        Reset
                    </button>
                </div>
            );
        }
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/contact" component={Contact} />
                        <PrivateRoute exact path="/portal" component={Dashboard} />
                        <PrivateRoute exact path="/portal/applications" component={ApplicationList} />
                        <PrivateRoute exact path="/portal/beneficiaries" component={BeneficiaryList} />
                        <Route
                            render={(props) => {
                                window.location = `/404.html?from=${props.location.pathname}`;
                            }}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

AllRoutes.propTypes = {
    store: propTypes.object.isRequired,
};

export default AllRoutes;
