import { spmfcloudFunctionUrl } from '../../../actions/salesforces';
import { qApplicationList, qBeneficiaryList } from './query';
import swal from 'sweetalert';

export default null;

export const logout = () => ({
    type: 'LOGGED_OUT',
    payload: null,
});

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
    console.log(json.records);

    swal({
        title: 'USER NOT FOUND',
        text: 'Your username or password combination is wrong.',
    });
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

    swal({
        type: 'warning',
        title: 'Connection To salesforce Failed',
    });
};
