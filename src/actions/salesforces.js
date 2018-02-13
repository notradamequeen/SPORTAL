import {
    q_POSTAL_CODE_RECORD,
    q_SCHOLL_LIST
} from './query';
import { sfRequestSync, sfRequest } from '../utils/common';
const spmfcloudFunctionUrl = __DEV__ ? 'http://localhost:2018' : 'http://13.229.173.240/sf/';

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



export const getPersonField = () => (
    (dispatch, getState) => {
        const salesforceToken = getState().salesforce.token;
        const personField = getState().salesforce.personField;
        if (new Date().getTime() - personField.retrievedAt > 60 * 60 * 1000) {
            sfRequest('Person__c', {
                method: 'GET',
                url: salesforceToken.instanceUrl,
                id: 'describe',
                accessToken: salesforceToken.accessToken,
            }, ({ type, payload }) => {
                if (type === 'PERSON_FIELD') {
                    const fields = payload.fields;
                    fields.sort((a, b) => {
                        if (a.label.toUpperCase() < b.label.toUpperCase()) return -1;
                        if (a.label.toUpperCase() > b.label.toUpperCase()) return 1;
                        return 0;
                    });
                    dispatch({ type, payload: fields });
                } else {
                    dispatch({ type, payload });
                }
            }, 'PERSON_FIELD');
        }
    }
);

export function getPersonFields(salesforceToken){
    const SF_VERSION = 'v20.0';
    const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/Person__c/describe/`;
    const fetchConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${salesforceToken.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        timeout: 5000,
    };
    fetch(fullUrl, fetchConfig).then((response) => {
        if (response.status === 204) {
            return { ok: true, id: request.id };
        }
        return response.json();
    })
    // .catch((err) => {
    //     swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
    // })
    // .then((json) => {
    //     if (json.length > 0) {
    //         if (json[0].errorCode) {
    //             swal('Error occured', `An Error occured "${json[0].errorCode} - ${json[0].message} - ${sobject}".`);
    //         } else {
    //             return json
    //         }
    //     } else {
    //         return json
    //     }
    // });
};