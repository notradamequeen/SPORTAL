import { spmfcloudFunctionUrl } from '../../../actions/salesforces';
import {
    qApplicationList,
    qBeneficiaryList,
    qFundRequestList,
    qReceiptList,
    qTerminationList,
    qTransferList } from './query';

export default null;

export const logout = () => (
    async (dispatch, getState) => {
        await fetch(`${spmfcloudFunctionUrl}/logout?token=${getState().user.siteToken.hash}`, {
            mode: 'cors',
        }).then(response => response.json());
        dispatch({
            type: 'LOGGED_OUT',
            payload: null,
        });
        setTimeout(() => window.location.reload(), 500);
    }
);

export const getApplicationList = async (key, siteToken) => {
    const query = `${qApplicationList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}/applications-list`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_APPLICATION_LIST',
            payload: json.records,
        };
    }
    return {
        type: 'GET_APPLICATION_LIST',
        payload: [],
    };
};

export const getBeneciciaryList = async (key, siteToken) => {
    const query = `${qBeneficiaryList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}/beneficiary-list`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_BENEFICIARY_LIST',
            payload: json.records,
        };
    }
    return {
        type: 'GET_BENEFICIARY_LIST',
        payload: [],
    };
};

export const getFundRequestList = async (key, siteToken) => {
    const query = `${qFundRequestList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_FUND_REQUEST_LIST',
            payload: json.records,
        };
    }
    console.log(json.records);

    swal({
        title: 'Error',
        text: 'Internal Server Error Please Contact Administrator',
    });
};

export const getReceiptList = async (key, siteToken) => {
    const query = `${qReceiptList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_RECEIPT_LIST',
            payload: json.records,
        };
    }
    return {
        type: 'GET_RECEIPT_LIST',
        payload: [],
    };
};

export const getTerminationList = async (key, siteToken) => {
    const query = `${qTerminationList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_TERMINATION_LIST',
            payload: json.records,
        };
    }
    return {
        type: 'GET_TERMINATION_LIST',
        payload: [],
    };
};

export const getTransferList = async (key, siteToken) => {
    const query = `${qTransferList}'${key}'`;
    const json = await fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    if (json.status === 200) {
        return {
            type: 'GET_TRANSFER_LIST',
            payload: json.records,
        };
    }
    console.log(json.records);

    swal({
        title: 'Error',
        text: 'Internal Server Error Please Contact Administrator',
    });
};

