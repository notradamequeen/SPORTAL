import { combineReducers } from 'redux';
import user from './userReducers';
import salesforceReducers from './salesforceReducers';


const rootReducers = combineReducers({
    user,
    salesforce: salesforceReducers,
});

export default rootReducers;
