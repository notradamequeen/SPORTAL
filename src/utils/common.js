import swal from 'sweetalert';
import Logo from '../assets/img/spmf_logo.jpg';
import jsPDF from 'jspdf';
require('jspdf-autotable');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gentelella/build/css/custom.min.css';

const SF_VERSION = 'v20.0';
const RegexList = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[\w])(?=.*\d)[\w.]{8,}/,
    fullName: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    phoneNumber: /^\+\d*$/,
};
const spmfBackendUrl = __DEV__ ? 'http://localhost:2018' : 'http://13.229.173.240/sf/';

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
    return true
    let requiredField = []
    let validFields = []
    let isValid = false;
        if (step == 2){
            requiredField = ['Full_Name__c', 'ID_Number__c', 'Home_Phone__c']

            if(data[requiredField[0]] !== '' && data[requiredField[1]] !== '' && data[requiredField[2]] !== '') {
                isValid = true
            }
            return isValid
        }
        if (step == 3) {
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
     return true
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

export function getBase64FromImageUrl(src, outputFormat) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        img.crossOrigin = 'Anonymous';
        img.src = src;
        img.onload = function() {
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            resolve(dataURL);
        };
    });
    
}
  
export function generatePdf(data){
    console.log('genNode', data.nodeList)
    getBase64FromImageUrl(`http://localhost:8080${require('../assets/img/spmf_pdf.jpg')}`).then((url)=>{
        let eligibilityColumns = [{title: "   ", dataKey:'title'}, {title: "", dataKey:'text'}]
        let eligibilityRows = [
            {title: "   ", text: '-  Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)'},
            {title: "   ", text: '-  Family is living in a 4-room HDB flat or smaller'},
            {title: "   ", text: '-  Family has a gross per capita income (PCI) of $625/ month or less'},
            {title: "   ", text: '-  Is not concurrently receiving School Pocket Money Fund from any other STSPMF disbursing agency/school or any other similar schemes except MOE Financial Assistance Scheme'},
            {title: "   ", text: '-  Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme'},
            {title: "   ", text: '-  Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education.'},
            {title: "   ", text: '-  Student is 20 years or younger at point of application'},
        ]
        let docColumns = [{title: "   ", dataKey:'title'}, {title: "", dataKey:'text'}]
        let docRows = [
            {title: "   ", text: '-  Photocopy of student(s)’s NRIC / birth certificate'},
            {title: "   ", text: '-  Photocopy of both parents’/ guardian’s NRIC / passport'},
        ]
        let PersonalDetailColumns = ["Personal Details", '', '', '', '', ''];
        let PersonalDetailRows = [
            [""],
            ["Full Name", ":", data.Full_Name__c, "Gender", ":", data.Gender__c],
            ["ID Type", ":", "NRIC", "Nationality", ":", data.Nationality__c],
            ["ID Number", ":", data.ID_Number__c, "Other Nationality", ":", data.Other_Nationality__c],
            ["Date of Birth", ":", data.Date_of_Birth__c, "Race", ":", data.Race__c],
            ["Marital Status", ":", data.Marital_Status__c, "Other Race", ":", data.Other_Race__c],
            ["Other Marital Status", ":", data.Other_Marital_Status__c],
        ];
        let AddressColumns = ["Address", '', '', '', '', ''];
        let AddressRows = [
            [""],
            ["Postal Code", ":", data.Postal__c, "Type Of Flat", ":", data.Flat_Type__c],
            ["Street Name", ":", data.Street_Name__c, "Other Type of Flat", ":", data.Other_Flat_Type__c],
            ["Block Number", ":", data.Block_Number__c, "Country", ":", data.Country__c],
        ];
        let contactRows = [
            [""],
            ["Home Phone", ":", data.Home_Phone__c, "Mobile Phone", ":", data.Mobile_Phone__c],
            ["Email Address", ":", data.Email_Address__c]
        ]
        let tab2ColumnStyle = {
            0: {columnWidth: 100},
            1: {columnWidth: 20},
            2: {columnWidth: 120},
            3: {columnWidth: 100},
            4: {columnWidth:20},
            5: {columnWidth: 120}
        };
        let body2 = document.createElement('DIV')
        body2.id = "iframecontent"
        var x = document.createElement("IMG");
            x.setAttribute("src", url);
            x.setAttribute("width", "600");
            x.setAttribute("height", "83");
        body2.appendChild(x)
        // console.log(body2.innerHTML)
        var pdf = new jsPDF('p', 'pt', 'letter');
        let htmlSTring = '';
        // const pageBreak = `<!-- ADD_PAGE -->`
        // htmlSTring += pageBreak
        body2.innerHTML += htmlSTring
        var source = body2
        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        var margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.setFontSize(16);
            pdf.autoTable(["Eligibility Criteria"], [], {
                theme: 'plain',
                startY: 200,
            })
            pdf.autoTable(eligibilityColumns, eligibilityRows, {
                theme: 'plain',
                startY: pdf.autoTable.previous.finalY-15,
                bodyStyles: {valign: 'top'},
                styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                columnStyles: {text: {columnWidth: 'auto'}},
                drawRow: function (row, data) {
                    row.height = row.height * 1.2
                },
            })
            pdf.autoTable(["All completed STSPMF application forms must be attached with the relevant documents listed below:"], [], {
                theme: 'plain',
                startY: pdf.autoTable.previous.finalY + 20,
                drawRow: function (row, data) {
                    row.height = row.height * 1.2
                },
            })
            pdf.autoTable(docColumns, docRows, {
                theme: 'plain',
                startY: pdf.autoTable.previous.finalY-15,
                bodyStyles: {valign: 'top'},
                styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                columnStyles: {text: {columnWidth: 'auto'}},
            })
            pdf.addPage()
            pdf.autoTable(PersonalDetailColumns, PersonalDetailRows, {
                theme: 'plain',
                startY: 80,
                drawRow: function (row, data) {
                    if(row.index > 0){
                        row.height = row.height * 1.5
                    }
                },
                columnStyles: tab2ColumnStyle,
            })
            let first = pdf.autoTable.previous;
            pdf.autoTable(AddressColumns, AddressRows, {
                theme: 'plain',
                startY: first.finalY + 20,
                showHeader: 'firstPage',
                margin: {right: 107},
                drawRow: function (row, data) {
                    if(row.index > 0){
                        row.height = row.height * 1.5
                    }
                },
                columnStyles: tab2ColumnStyle,
            });
            let second = pdf.autoTable.previous;
            pdf.autoTable(["Personal Contact", '', '', '', '', ''], contactRows, {
                theme: 'plain',
                startY: second.finalY + 20,
                showHeader: 'firstPage',
                margin: {right: 107},
                drawRow: function (row, data) {
                    if(row.index > 0){
                        row.height = row.height * 1.5
                    }
                },
                columnStyles: tab2ColumnStyle,
            });
            pdf.save('Test.pdf');
        }, margins);
    });
}