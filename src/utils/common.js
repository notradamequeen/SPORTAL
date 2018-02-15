import swal from 'sweetalert';

const SF_VERSION = 'v20.0';


export function sfRequestSync(sobject, request) {
    let fullUrl = '';
    if (sobject != null) {
        fullUrl = `${request.url}/services/data/${SF_VERSION}${(request.composite ? '/composite/tree/' : '/sobjects/') + sobject + '/' + (request.id ? request.id : '')}`;
    } else {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/query/?q=${encodeURIComponent(request.query)}`;
    }
    if (request.type === 'chatter') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feed-elements?q=${encodeURIComponent(request.query)}`;
    } else if (request.type === 'chatter-me') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feeds/news/me/feed-elements`;
    }

    const fetchConfig = {
        method: request.method,
        headers: {
            Authorization: `Bearer ${request.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Cache-Control': request.cache ? 'max-age=3600' : 'no-cache',
        },
        timeout: 5000,
    };

    if (request.bodyParams) {
        // fetchConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        delete request.bodyParams.Id;
        fetchConfig.body = JSON.stringify(request.bodyParams);
        // console.log(fetchConfig.body)
    }
    fetch(fullUrl, fetchConfig)
        .then((response) => {
            setTimeout(() => null, 0);
            if (response.status === 204) {
                return { ok: true, id: request.id };
            }
            return Promise.resolve(response.json());
        }).catch((err) => {
            swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
        })
        .then((json) => {
            if (json.length > 0) {
                if (json[0].errorCode) {
                    swal('Error occured', `An Error occured "${json[0].errorCode} - ${json[0].message} - ${sobject}".`);
                } else {
                    return{
                        payload: json,
                        type: dispatchType,
                    }
                }
            } else {
                return{
                    payload: json,
                    type: dispatchType,
                };
            }
        });
}

export function sfRequest(sobject, request, dispatch, dispatchType) {
    dispatch({ type: 'TOGGLE_LOADING' });
    let fullUrl = '';
    if (sobject != null) {
        if(request.method == 'GET') {
            fullUrl = `${request.url}/services/data/${SF_VERSION}${(request.composite ? '/composite/tree/' : '/sobjects/') + sobject + '/' + (request.id ? request.id : '')}`;
        }
        if (request.method == 'POST') {
            fullUrl = `${request.url}/services/data/${SF_VERSION}/sobjects/${sobject}/`;
        }
    } else {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/query/?q=${encodeURIComponent(request.query)}`;
    }
    if (request.type === 'chatter') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feed-elements?q=${encodeURIComponent(request.query)}`;
    } else if (request.type === 'chatter-me') {
        fullUrl = `${request.url}/services/data/${SF_VERSION}/chatter/feeds/news/me/feed-elements`;
    }

    const fetchConfig = {
        method: request.method,
        headers: {
            Authorization: `Bearer ${request.accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': request.cache ? 'max-age=3600' : 'no-cache',
        },
        timeout: 5000,
    };

    if (request.bodyParams) {
        // fetchConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        delete request.bodyParams.Id;
        fetchConfig.body = JSON.stringify(request.bodyParams);
        // console.log(fetchConfig.body)
    }
    fetch(fullUrl, fetchConfig)
        .then((response) => {
            setTimeout(() => null, 0);
            if (response.status === 204) {
                return { ok: true, id: request.id };
            }
            return response.json();
        }).catch((err) => {
            dispatch({ type: 'TOGGLE_LOADING' });
            setTimeout(() => null, 0);
            swal('Error occured', `Connection to salesforce currently can't be established, ${err.message}.`);
        })
        .then((json) => {

            dispatch({ type: 'TOGGLE_LOADING' });
            
            if (json.length > 0) {
                if (json[0].errorCode) {
                    swal('Error occured', `An Error occured "${json[0].errorCode} - ${json[0].message} - ${sobject}".`);
                } else {
                    dispatch({
                        payload: json,
                        type: dispatchType,
                    });
                }
            } else {
                dispatch({
                    payload: json,
                    type: dispatchType,
                });
            }
        });
}

export function getCurrentDate(){
    const date = new Date()
    let day = String(date.getDate());
    let month = String(date.getMonth()+1);
    const year = String(date.getFullYear());

    if (month.length == 1){
        month = '0' + month
    }
    if (day.length == 1){
        day = '0' + day
    }

    return year + '-' + month + '-' + day 
}