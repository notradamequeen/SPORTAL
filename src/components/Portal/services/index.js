import { spmfcloudFunctionUrl } from '../../../actions/salesforces';
import { qApplicationList, qBeneficiaryList, qApplicationDetail } from '../actions/query';
import swal from 'sweetalert';

export default null;

export function getApplicationDetail(key, siteToken) {
    const query = `${qApplicationDetail}'${key}'`;
    return fetch(`${spmfcloudFunctionUrl}/applications-detail`, {
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
    });
};
