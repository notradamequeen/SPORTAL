const SF_VERSION = '37.0';

/*
    Parameters
    * Request
        * composite: Identified whether this should be return as composite (Boolean Optional) 
        * url: Salesforce instance url (String Required)
        * type: chatter or chatter-me to list chatter message from any feed specified (optional)
        * method: HTTP Method DELETE, POST, PUT OR GET (optional default GET)
        * accessToken: Salesforce AccessToken (String)
        * cache: Identified when you want the request cached (Boolean).
        * id: Salesforce id (String) if you want to find specific record in salesforce
        * query: SOQL (String)
    * Sobject if you specified sobject it will ignore SOQL and retrieve specified Sobject.
    * return Promise;
*/
export async function sfRequestPromise(request, sobject = null) {
    let fullUrl = '';
    if (sobject != null) {
        fullUrl = `${request.url}/services/data/${SF_VERSION}`;
        if (request.composite === true) {
            fullUrl += '/composite/tree/';
        } else {
            fullUrl += `/sobjects/${sobject}/${(request.id ? request.id : '')}`;
        }
    } else {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/query?q=${encodeURIComponent(request.query)}`;
    }
    if (request.type === 'chatter') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feed-elements?q=${encodeURIComponent(request.query)}`;
    } else if (request.type === 'chatter-me') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feeds/news/me/feed-elements`;
    }

    const fetchConfig = {
        method: request.method || 'GET',
        headers: {
            Authorization: `Bearer ${request.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': request.cache ? 'max-age=3600' : 'no-cache',
        },
        mode: 'cors',
        timeout: 5000,
    };

    if (request.bodyParams) {
        delete request.bodyParams.Id;
        fetchConfig.body = JSON.stringify(request.bodyParams);
    }

    const promiseRequest = await fetch(fullUrl, fetchConfig)
        .then(async (response) => {
            const json = await response.json();
            if (response.status === 204) {
                return { ok: true, id: request.id };
            } else if (response.status === 500 || response.status === 400) {
                const error = new Error(`Response status: ${response.status}
                    message: ${json[0].message}
                    errorCode: ${json[0].errorCode}`);
                throw (error);
            }
            return json;
        });
    return promiseRequest;
}

export default { sfRequestPromise };
