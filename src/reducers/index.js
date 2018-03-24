import { combineReducers } from 'redux';
import user from './userReducers';
import salesforceReducers from './salesforceReducers';
import objectInfo from './objectInfoReducers';


const rootReducers = combineReducers({
    user,
    objectInfo,
    salesforce: salesforceReducers,
});

export default rootReducers;
