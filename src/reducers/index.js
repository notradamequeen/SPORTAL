import { combineReducers } from 'redux';
import firebaseReducers from './firebaseReducers';
import salesforceReducers from './salesforceReducers';


const rootReducers = combineReducers({
    user: firebaseReducers,
    salesforce: salesforceReducers,
});

export default rootReducers;
