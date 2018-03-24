import { spmfcloudFunctionUrl } from '../../../actions/salesforces';

export async function getAllFundRequest(partnerId, siteToken) {
    const query = `Select Id, Name, Year__c, Period__c, Partner_Name__r.Name, Projection_Amount_Pri_Sec__c,
        FR_Status__c
        from Fund_Request__c where Partner_Name__c = '${partnerId}' ORDER BY Fr_Status__c`;
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({ query }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
}


export async function getFundRequestDetail(id) {
    const result = await sfRequestPromise({
        id,
        cache: false,
        method: 'get',
    }, 'Fund_Request__c');
    return result;
}
