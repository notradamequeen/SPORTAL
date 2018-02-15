import {
    q_POSTAL_CODE_RECORD,
    q_SCHOLL_LIST,
    q_RECORD_TYPE
} from './query';
import { sfRequestSync, sfRequest } from '../utils/common';
const spmfcloudFunctionUrl = __DEV__ ? 'http://localhost:2018' : 'http://13.229.173.240/sf/';
const SF_VERSION = 'v20.0';

export function getSalesforceToken(callback) {
    return async (dispatch, getState) => {
        // if (getState().CurrentUser === null) return;
        // const token = await getState().CurrentUser.getIdToken();
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


export const getPostalCodeRecord = () => (
    (dispatch, getState) => {
        // if (getState().currentUser === null) return;
        const salesforceToken = getState().salesforce.token;
        const postalCodeRecords = getState().salesforce.postalCodeRecords;
        sfRequest(null, {
            method: 'GET',
            url: salesforceToken.instanceUrl,
            id: 'describe',
            accessToken: salesforceToken.accessToken,
            query: q_POSTAL_CODE_RECORD,
        },dispatch, 'POSTAL_CODE_RECORD')
    }
);

export const getSchoolList = () => (
    (dispatch, getState) => {
        // if (getState().currentUser === null) return;
        const salesforceToken = getState().salesforce.token;
        const schoolList = getState().salesforce.schoolList;
        sfRequest(null, {
            method: 'GET',
            url: salesforceToken.instanceUrl,
            id: 'describe',
            accessToken: salesforceToken.accessToken,
            query: q_SCHOLL_LIST,
        },dispatch, 'SCHOOL_LIST')
    }
);

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