import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const CPrivateRoute = props => (
    <Route
        render={() => {
            if (props.currentUser.loggedInUser !== null) {
                return (
                    <Route component={props.component} path={props.path} exact>
                        {props.children}
                    </Route>
                );
            }
            return (<Redirect to={{
                pathname: '/login',
                state: { from: props.location },
            }}
            />);
        }}
    />
);


CPrivateRoute.propTypes = {
    children: PropTypes.any,
    currentUser: PropTypes.object,
};
CPrivateRoute.defaultProps = {
    children: null,
    currentUser: {},
};

const privateRouteToProps = state => ({
    currentUser: state.user,
});

const PrivateRoute = connect(privateRouteToProps)(CPrivateRoute);

