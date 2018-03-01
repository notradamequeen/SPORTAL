import {
    q_POSTAL_CODE_RECORD,
    q_SCHOLL_LIST,
    q_APPLYING_TO,
    q_RECORD_TYPE
} from './query';
import { sfRequestSync, sfRequest } from '../utils/common';
const spmfcloudFunctionUrl = __DEV__ ? 'http://localhost:2018' : 'https://spmf.interaktiv.sg/sf/';
const SF_VERSION = 'v20.0';

export function getSalesforceToken(callback) {
    return async (dispatch, getState) => {
        const url = `${spmfcloudFunctionUrl}/salesforce-token`;
        const json = await fetch(url, {
            method: 'GET',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // Authorization: `Bearer ${token}`,
                'Accepted': 'application/json',
                // mode: 'cors',
            },
            cache: 'default',
        }).then(response => response.json()).then(responseData => {
            localStorage.setItem("tokensf", responseData.accessToken);
            dispatch({
                type: 'SALESFORCE_TOKEN',
                payload: responseData,
            });
        })
        
        // if (typeof callback === 'function') callback();
    };
}


export function getPostalCodeRecord(callback) {
    return async (dispatch, getState) => {
        let fullUrl = ''
        const salesforceToken = getState().salesforce.token;
        if(salesforceToken !== null) {
            fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/query/?q=${encodeURIComponent(q_POSTAL_CODE_RECORD)}`   
        }
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            timeout: 5000,
        };
        const json = await fetch(fullUrl, fetchConfig).then(response => response.json()).catch((err) => {
                                dispatch({ type: 'TOGGLE_LOADING' });
                                setTimeout(() => null, 0);
                                swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
                            }).then(responseData => {
                                dispatch({ type: 'TOGGLE_LOADING' });
                                if (responseData.length > 0) {
                                    if (responseData[0].errorCode) {
                                        swal('Error occured', `An Error occured "${responseData[0].errorCode} - ${responseData[0].message} - ${sobject}".`);
                                    } else {
                                        dispatch({
                                            payload: responseData,
                                            type: 'POSTAL_CODE_RECORD',
                                        });
                                    }
                                } else {
                                    dispatch({
                                        payload: responseData,
                                        type: 'POSTAL_CODE_RECORD',
                                    });
                                }
                            });
    }
}

export function getSchoolList(callback) {
    return async (dispatch, getState) => {
        let fullUrl = ''
        const salesforceToken = getState().salesforce.token;
        if(salesforceToken !== null) {
            fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/query/?q=${encodeURIComponent(q_SCHOLL_LIST)}`   
        }
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            timeout: 5000,
        };
        await fetch(fullUrl, fetchConfig).then(response => response.json()).catch((err) => {
            dispatch({ type: 'TOGGLE_LOADING' });
            setTimeout(() => null, 0);
            swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
        }).then(responseData => {
            dispatch({ type: 'TOGGLE_LOADING' });
            if (responseData.length > 0) {
                if (responseData[0].errorCode) {
                    swal('Error occured', `An Error occured "${responseData[0].errorCode} - ${responseData[0].message} - ${sobject}".`);
                } else {
                    dispatch({
                        payload: responseData,
                        type: 'SCHOOL_LIST',
                    });
                }
            } else {
                dispatch({
                    payload: responseData,
                    type: 'SCHOOL_LIST',
                });
            }
        });
    }
}

export function getApplyingToList(callback) {
    return async (dispatch, getState) => {
        let fullUrl = ''
        const salesforceToken = getState().salesforce.token;
        if(salesforceToken !== null) {
            fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/query/?q=${encodeURIComponent(q_APPLYING_TO)}`   
        }
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            timeout: 5000,
        };
        await fetch(fullUrl, fetchConfig).then(response => response.json()).catch((err) => {
            dispatch({ type: 'TOGGLE_LOADING' });
            setTimeout(() => null, 0);
            swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
        }).then(responseData => {
            dispatch({ type: 'TOGGLE_LOADING' });
            if (responseData.length > 0) {
                if (responseData[0].errorCode) {
                    swal('Error occured', `An Error occured "${responseData[0].errorCode} - ${responseData[0].message} - ${sobject}".`);
                } else {
                    dispatch({
                        payload: responseData,
                        type: 'APPLYING_TO_LIST',
                    });
                }
            } else {
                dispatch({
                    payload: responseData,
                    type: 'APPLYING_TO_LIST',
                });
            }
        });
    }
}

export const getRecordType = () => (
    (dispatch, getState) => {
        // if (getState().currentUser === null) return;
        const salesforceToken = getState().salesforce.token;
        const recordType = getState().salesforce.recordType;
        sfRequest(null, {
            method: 'GET',
            url: salesforceToken.instanceUrl,
            id: 'describe',
            accessToken: salesforceToken.accessToken,
            query: q_RECORD_TYPE,
        },dispatch, 'RECORD_TYPE')
    }
);



export function getApplicationField(salesforceToken){
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/Application__c/describe`;
    const fetchConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        timeout: 5000,
    };
    return fetch(fullUrl, fetchConfig).then((response) => response.json())
};

export function getPersonField(salesforceToken){
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/Person__c/describe`;
    const fetchConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        timeout: 5000,
    };
    return fetch(fullUrl, fetchConfig).then((response) => response.json())
};

export const createApplication = data => {
    (dispatch, getState) => {
        const salesforceToken = getState().salesforce.token;
        sfRequest('Application__c', {
            method: 'POST',
            url: salesforceToken.instanceUrl,
            id: 'describe',
            accessToken: salesforceToken.accessToken,
            bodyParams: data,
        }, ({ type, payload }) => {
            if (type === 'CREATE_APPLICATION') {
                console.log(payload)
                dispatch({ type, payload });
            } else {
                console.log(payload)
                dispatch({ type, payload });
            }
        }, 'CREATE_APPLICATION');
    }
}

export function retrieveObject(sobjects, id, salesforceToken){
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}`;
    const fetchConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        timeout: 5000,
    };
    return fetch(fullUrl, fetchConfig).then((response) => response.json())
}

export function saveObject(sobjects, data, salesforceToken) {
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}/`;
    const fetchConfig = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(data),
        timeout: 5000,
    };
    return fetch(fullUrl, fetchConfig).then((response) => response.json());
}

export function updateObject(sobjects, id, data, salesforceToken) {
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}/${id}`;
    const fetchConfig = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(data),
        timeout: 5000,
    };
    return fetch(fullUrl, fetchConfig).then((response) => response.json());
}