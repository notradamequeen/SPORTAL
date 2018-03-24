import { spmfcloudFunctionUrl } from '../../../actions/salesforces';
import {
    qApplicationDetail,
    qBeneDetail,
    qApplicationDetail2,
    qApplicationBeneList,
    qApplicationHouList,
    qAttachment,
    qBeneReceiptList } from '../actions/query';


export default null;

export function getBeneDetail(key, siteToken) {
    const query = `${qBeneDetail}'${key}'`;
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
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
}

export function getApplicationHouList(key, siteToken) {
    const query = `${qApplicationHouList}'${key}'`;
    console.log(query);
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
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
}

export function getApplicationDetail(key, siteToken) {
    const query = qApplicationDetail(key);
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    });
}

export function getAttachment(key, siteToken) {
    const query = `${qAttachment}'${key}'`;
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
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
}
export function getAttachmentStream(key, siteToken) {
    return fetch(`${spmfcloudFunctionUrl}/attachment`, {
        mode: 'cors',
        body: JSON.stringify({
            attachmentId: key,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    });
}

export function getBeneReceiptList(key, siteToken) {
    const query = `${qBeneReceiptList}'${key}'`;
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
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
}

export function submitVerifyBene(data, siteToken) {
    return fetch(`${spmfcloudFunctionUrl}/update-bene-status`, {
        mode: 'cors',
        body: JSON.stringify({
            data,
            siteToken,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    });
}
