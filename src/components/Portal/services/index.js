import { spmfcloudFunctionUrl } from '../../../actions/salesforces';
import {
    qApplicationDetail,
    qBeneDetail,
    qApplicationBeneList,
    qApplicationHouList,
    qAttachment } from '../actions/query';
import swal from 'sweetalert';

export default null;

export function getApplicationDetail(key, siteToken) {
    const query = `${qApplicationDetail}'${key}'`;
    return fetch(`${spmfcloudFunctionUrl}/application-detail`, {
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
export function getApplicationBeneList(key, siteToken) {
    const query = `${qApplicationBeneList}'${key}'`;
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
