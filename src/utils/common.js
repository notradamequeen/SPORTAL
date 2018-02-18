import swal from 'sweetalert';

const SF_VERSION = 'v20.0';
const RegexList = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[\w])(?=.*\d)[\w.]{8,}/,
    fullName: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    phoneNumber: /^\+\d*$/,
};

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

export function validation(step, data){
    // return true
    let requiredField = []
    let validFields = []
    let isValid = false;
        if (step == 2){
            // return true
            requiredField = ['Full_Name__c', 'ID_Number__c', 'Home_Phone__c']

            if(data[requiredField[0]] !== '' && data[requiredField[1]] !== '' && data[requiredField[2]] !== '') {
                isValid = true
            }
            return isValid
        }
        if (step == 3) {
            // return true
            requiredField = ['Full_Name__c', 'ID_Number__c', 'Date_of_Birth__c', 'Current_Level__c',
                             'Current_School__c', 'Applying_to__c'
                            ];
            validFields = data.Ben.map((dataBen) => {
                console.log(dataBen.data[requiredField[0]])
                if (dataBen.data[requiredField[0]] !== '' && dataBen.data[requiredField[0]] !== undefined && 
                    dataBen.data[requiredField[1]] !== '' && dataBen.data[requiredField[1]] !== undefined &&
                    dataBen.data[requiredField[2]] !== '' && dataBen.data[requiredField[2]] !== undefined &&
                    dataBen.data[requiredField[3]] !== '' && dataBen.data[requiredField[3]] !== undefined &&
                    dataBen.data[requiredField[4]] !== '' && dataBen.data[requiredField[4]] !== undefined &&
                    dataBen.data[requiredField[5]] !== '' && dataBen.data[requiredField[5]] !== undefined
                ){
                   return 'true' 
                } else {
                    return 'false'
                }
            });
            console.log(validFields)
            if(!validFields.includes('false')){
                isValid = true
            }
            return isValid
        }
        if (step == 4) {
            console.log('hou', step)
            console.log(data)
            requiredField = ['Full_Name__c', 'ID_Number__c', 'Date_of_Birth__c', 'Relationship_to_Applicant__c',
                             'Gross_Monthly_Income__c', 'Employment_Status__c', 'Occupation__c'
                            ];
            if(data.Full_Name__c !== '' && data.ID_Number__c !== '' && data.Date_of_Birth__c !== '' &&
               data.Relationship_to_Applicant__c !== '' && data.Monthly_Gross_Income__c !== ''
            ) {
                console.log('main', 'true')
                isValid = true
            }
            validFields = data.Hou.map((dataHou, idx) => {
                console.log('idxhou', idx)
                if (idx > 0) {
                    if(dataHou.data.Monthly_Gross_Income__c === '' || dataHou.data.Monthly_Gross_Income__c === undefined) {
                        return 'false'
                    }
                    return 'true'
                }  
            });
            console.log('houValid', validFields)
            if(validFields.includes('false')){
                isValid = false
            }
            return isValid
        }
    
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
 }

 export function regexValidate(type, value){
    if(RegexList[type].test(value)){
        return true
    } else {
        return false
    }
 }

 export function validateNRIC(str) {
    if (str.length != 9)
        return false;

    str = str.toUpperCase();

    var i, 
        icArray = [];
    for(i = 0; i < 9; i++) {
        icArray[i] = str.charAt(i);
    }

    icArray[1] = parseInt(icArray[1], 10) * 2;
    icArray[2] = parseInt(icArray[2], 10) * 7;
    icArray[3] = parseInt(icArray[3], 10) * 6;
    icArray[4] = parseInt(icArray[4], 10) * 5;
    icArray[5] = parseInt(icArray[5], 10) * 4;
    icArray[6] = parseInt(icArray[6], 10) * 3;
    icArray[7] = parseInt(icArray[7], 10) * 2;

    var weight = 0;
    for(i = 1; i < 8; i++) {
        weight += icArray[i];
    }

    var offset = (icArray[0] == "T" || icArray[0] == "G") ? 4:0;
    var temp = (offset + weight) % 11;

    var st = ["J","Z","I","H","G","F","E","D","C","B","A"];
    var fg = ["X","W","U","T","R","Q","P","N","M","L","K"];

    var theAlpha;
    if (icArray[0] == "S" || icArray[0] == "T") { theAlpha = st[temp]; }
    else if (icArray[0] == "F" || icArray[0] == "G") { theAlpha = fg[temp]; }

    return (icArray[8] === theAlpha)
 }