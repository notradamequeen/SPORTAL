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
const spmfBackendUrl = __DEV__ ? 'http://localhost:2018' : 'http://spmf.interaktiv.sg/sf/';
const spmfUrl = __DEV__ ? 'http://localhost:8080' : 'http://spmf.interaktiv.sg/';

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
        if(!validFields.includes('false')){
            isValid = true
        }
        return isValid
    }
    if (step == 4) {
        requiredField = ['Full_Name__c', 'ID_Number__c', 'Date_of_Birth__c', 'Relationship_to_Applicant__c',
                            'Gross_Monthly_Income__c', 'Employment_Status__c', 'Occupation__c'
                        ];
        if(data.Full_Name__c !== '' && data.ID_Number__c !== '' && data.Date_of_Birth__c !== '' &&
            data.Relationship_to_Applicant__c !== '' && data.Monthly_Gross_Income__c !== ''
        ) {
            isValid = true
        }
        validFields = data.Hou.map((dataHou, idx) => {
            if (idx > 0) {
                if(dataHou.data.Monthly_Gross_Income__c === '' || dataHou.data.Monthly_Gross_Income__c === undefined) {
                    return 'false'
                }
                return 'true'
            }  
        });
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

    let i, 
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

    let weight = 0;
    for(i = 1; i < 8; i++) {
        weight += icArray[i];
    }

    let offset = (icArray[0] == "T" || icArray[0] == "G") ? 4:0;
    let temp = (offset + weight) % 11;

    let st = ["J","Z","I","H","G","F","E","D","C","B","A"];
    let fg = ["X","W","U","T","R","Q","P","N","M","L","K"];

    let theAlpha;
    if (icArray[0] == "S" || icArray[0] == "T") { theAlpha = st[temp]; }
    else if (icArray[0] == "F" || icArray[0] == "G") { theAlpha = fg[temp]; }

    return (icArray[8] === theAlpha)
 }

export function getBase64FromImageUrl(src, outputFormat) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        let canvas = document.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
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
    const img1 = getBase64FromImageUrl(`${spmfUrl}${require('../assets/img/spmf_pdf.jpg')}`)
    const img2 = getBase64FromImageUrl(`${spmfUrl}${require('../assets/img/check.jpg')}`)
    Promise.all([img1, img2]).then((url)=>{
        let eligibilityColumns = [{title: "   ", dataKey:'title'}, {title: "", dataKey:'text'}]
        let docColumns = [{title: "   ", dataKey:'title'}, {title: "", dataKey:'text'}]
        let PersonalDetailColumns = ["Personal Details", '', '', '', '', ''];
        let AddressColumns = ["Address", '', '', '', '', ''];
        let tab2ColumnStyle = {
            0: {columnWidth: 120, textColor: (77, 77, 77)},
            1: {columnWidth: 20, textColor: (77, 77, 77)},
            2: {columnWidth: 120, textColor: (77, 77, 77)},
            3: {columnWidth: 120, textColor: (77, 77, 77)},
            4: {columnWidth:20, textColor: (77, 77, 77)},
            5: {columnWidth: 120, textColor: (77, 77, 77)}
        };
        let source = document.createElement('DIV')
        let x = document.createElement("IMG");
        x.setAttribute("src", url[0]);
        x.setAttribute("width", "600");
        x.setAttribute("height", "83");
        source.appendChild(x)
        let pdf = new jsPDF('p', 'pt', 'letter');
        let specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        let margins = {top: 80, bottom: 60, left: 40, width: 522};
        pdf.setTextColor(77, 77, 77);
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
            function (dispose) {
                pdf.autoTable(["Eligibility Criteria"], [], {
                    theme: 'plain',
                    startY: 200,
                    styles: { textColor: (77, 77, 77) }
                })
                let a = 0;
                pdf.autoTable(eligibilityColumns, getData("Eligibility", null), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY-15,
                    bodyStyles: {valign: 'top'},
                    styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                    columnStyles: {text: {columnWidth: 'auto', textColor: (77, 77, 77)}, title: {textColor: (77, 77, 77)} },
                    drawRow: function (row, data) {
                        row.height = row.height * 1.2
                    },
                })
                pdf.autoTable(["All completed STSPMF application forms must be attached with the relevant documents listed below:"], [], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    styles: {textColor: (77, 77, 77)},
                    drawRow: function (row, data) {
                        row.height = row.height * 1.2
                    },
                })
                pdf.autoTable(docColumns, getData("Doc", null), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY-15,
                    bodyStyles: {valign: 'top'},
                    styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                    columnStyles: {text: {columnWidth: 'auto', textColor: (77, 77, 77)}},
                })
                pdf.addPage()
                pdf.autoTable(["Application Profile"], [""], {
                    theme: 'plain',
                    startY: 60,
                    styles : {fontSize: 13, textColor: (77, 77, 77)}
                })
                pdf.setLineWidth(1.5)
                pdf.line(20, pdf.autoTable.previous.finalY-10, 600, pdf.autoTable.previous.finalY-10)
                pdf.autoTable(PersonalDetailColumns, getData("PersonalDetail", data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 5,
                    styles: {textColor: (77, 77, 77)},
                    drawRow: function (row, data) {
                        if(row.index > 0){
                            row.height = row.height * 1.5
                        }
                    },
                    columnStyles: tab2ColumnStyle,
                })
                pdf.setLineWidth(1.5)
                pdf.line(20, pdf.autoTable.previous.finalY+5, 600, pdf.autoTable.previous.finalY+5)
                pdf.autoTable(AddressColumns, getData("Address", data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    showHeader: 'firstPage',
                    margin: {right: 107},
                    styles: {textColor: (77, 77, 77)},
                    drawRow: function (row, data) {
                        if(row.index > 0){
                            row.height = row.height * 1.5
                        }
                    },
                    columnStyles: tab2ColumnStyle,
                });
                pdf.setLineWidth(1.5)
                pdf.line(20, pdf.autoTable.previous.finalY+5, 600, pdf.autoTable.previous.finalY+5)
                pdf.autoTable(["Personal Contact", '', '', '', '', ''], getData("Contact", data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    showHeader: 'firstPage',
                    margin: {right: 107},
                    styles: {textColor: (77, 77, 77)},
                    drawRow: function (row, data) {
                        if(row.index > 0){
                            row.height = row.height * 1.5
                        }
                    },
                    // addPageContent: function() {
                    //     pdf.setLineWidth(1)
                    //     pdf.line(20, 10, 200, 10);
                        
                    // },
                    columnStyles: tab2ColumnStyle,
                });
                pdf.addPage()
                // write Beneficiary
                pdf.autoTable(["Beneficiary List"], [""], {
                    theme: 'plain',
                    startY: 60,
                    styles : {fontSize: 13, textColor: (77, 77, 77)}
                });
                for (let i=0; i < data.Ben.length; i++){
                    if(i == 0){
                        pdf.setLineWidth(1.5)
                        pdf.line(20, pdf.autoTable.previous.finalY-18, 600, pdf.autoTable.previous.finalY-18)
                        pdf.autoTable([`Beneficiary - ${i+1}`, '', '', '', '', ''], getData('Bene', data.Ben[i].data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY - 10,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            styles: {textColor: (77, 77, 77)},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }
                    if (i !== 0 && i < 4){
                        pdf.setLineWidth(1.5)
                        pdf.line(20, pdf.autoTable.previous.finalY+5, 600, pdf.autoTable.previous.finalY+5)
                        pdf.autoTable([`Beneficiary - ${i+1}`, '', '', '', '', ''], getData('Bene', data.Ben[i].data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY+10,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            styles: {textColor: (77, 77, 77)},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }
                    if (i > 3) {
                        if ((i+1) % 5 == 0) {
                            pdf.addPage()
                            pdf.autoTable([`Beneficiary - ${i+1}`, '', '', '', '', ''], getData('Bene', data.Ben[i].data), {
                                theme: 'plain',
                                startY: 60,
                                showHeader: 'firstPage',
                                margin: {right: 107},
                                styles: {textColor: (77, 77, 77)},
                                drawRow: function (row, data) {
                                    if(row.index > 0){
                                        row.height = row.height * 1.2
                                    }
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        } else {
                            pdf.autoTable([`Beneficiary - ${i+1}`, '', '', '', '', ''], getData('Bene', data.Ben[i].data), {
                                theme: 'plain',
                                startY: pdf.autoTable.previous.finalY+10,
                                showHeader: 'firstPage',
                                margin: {right: 107},
                                styles: {textColor: (77, 77, 77)},
                                drawRow: function (row, data) {
                                    if(row.index > 0){
                                        row.height = row.height * 1.2
                                    }
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        }
                    }
                    
                }
                let endOfBen = pdf.autoTable.previous.finalY
                // write Houshold Member
                if (endOfBen < 483.1) {
                    console.log("houpdf")
                    pdf.autoTable(["Household Member List"], [""], {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY + 40,
                        styles : {fontSize: 13, textColor: (77, 77, 77),}
                    });
                    pdf.setLineWidth(1.5)
                    pdf.line(20, pdf.autoTable.previous.finalY-18, 600, pdf.autoTable.previous.finalY-18)
                    pdf.autoTable([`Main Applicant`, '', '', '', '', ''], getData('Hou', data), {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY - 10,
                        showHeader: 'firstPage',
                        margin: {right: 107},
                        styles: {textColor: (77, 77, 77)},
                        drawRow: function (row, data) {
                            if(row.index > 0){
                                row.height = row.height * 1.2
                            }
                        },
                        columnStyles: tab2ColumnStyle,
                    });
                } 
                if (endOfBen > 483.1) {
                    pdf.addPage();
                    pdf.autoTable(["Household Member List"], [""], {
                        theme: 'plain',
                        startY: 60,
                        styles : {fontSize: 13, textColor: (77, 77, 77)},
                    });
                    pdf.setLineWidth(1.5)
                    pdf.line(20, pdf.autoTable.previous.finalY-18, 600, pdf.autoTable.previous.finalY-18)
                    pdf.autoTable([`Main Applicant`, '', '', '', '', ''], getData('Hou', data), {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY - 10,
                        showHeader: 'firstPage',
                        margin: {right: 107},
                        styles: {textColor: (77, 77, 77)},
                        drawRow: function (row, data) {
                            if(row.index > 0){
                                row.height = row.height * 1.2
                            }
                        },
                        columnStyles: tab2ColumnStyle,
                    });
                    pdf.line(10, pdf.autoTable.previous.finalY + 10, 200, pdf.autoTable.previous.finalY)
                    pdf.setLineWidth(0.5);
                }
                let endOfMainApplicant = pdf.autoTable.previous.finalY
                // Reason Reason/s for not having an income earner / Having one income earner
                if (data.Hou.length == 1) {
                    if (endOfMainApplicant > 720){
                        pdf.addPage();
                        pdf.autoTable(["Reason Reason/s for not having an income earner / Having one income earner"], [""], {
                            theme: 'plain',
                            startY: 60,
                            styles : {fontSize: 13, textColor: (77, 77, 77)}
                        });
                        pdf.autoTable(['', '', '', '', '', ''], getData('Reason', data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY - 8,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            styles: {textColor: (77, 77, 77), fontSize: 11},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    } 
                    if (endOfMainApplicant  < 720){
                        pdf.autoTable(["Reason Reason/s for not having an income earner / Having one income earner"], [""], {
                            theme: 'plain',
                            startY: endOfMainApplicant + 20 ,
                            styles : {fontSize: 13, textColor: (77, 77, 77)}
                        });
                        pdf.setLineWidth(1.5)
                        pdf.line(20, pdf.autoTable.previous.finalY - 20, 600, pdf.autoTable.previous.finalY - 20)
                        pdf.autoTable(['', '', '', '', '', ''], getData('Reason', data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY - 35,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            styles: {fontSize: 11},
                            columnStyles: {
                                0: {columnWidth: 40, textColor: (77, 77, 77)},
                                1: {columnWidth: 20, textColor: (77, 77, 77)},
                                2: {columnWidth: 120, textColor: (77, 77, 77)},
                                3: {columnWidth: 120, textColor: (77, 77, 77)},
                                4: {columnWidth:20, textColor: (77, 77, 77)},
                                5: {columnWidth: 120, textColor: (77, 77, 77)}
                            },
                        });
                    }
                    
                }
                for (let i=1; i< data.Hou.length; i ++){
                    if (pdf.autoTable.previous.finalY + 146 > 680){
                        pdf.addPage()
                        pdf.autoTable([`Householed Member - ${i + 1}`, '', '', '', '', ''], getData('Hou', data.Hou[i].data), {
                            theme: 'plain',
                            startY: 60,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            styles: {textColor: (77, 77, 77)},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    } else {
                        pdf.setLineWidth(1.5)
                        pdf.line(20, pdf.autoTable.previous.finalY + 10, 600, pdf.autoTable.previous.finalY + 10)
                        pdf.autoTable([`Householed Member - ${i+1}`, '', '', '', '', ''], getData('Hou', data.Hou[i].data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY + 20,
                            showHeader: 'firstPage',
                            margin: {right: 107},
                            styles: {textColor: (77, 77, 77)},
                            drawRow: function (row, data) {
                                if(row.index > 0){
                                    row.height = row.height * 1.2
                                }
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }
                }
                const DeclarationColumns = [{title:"", dataKey: "number"},{title: "", dataKey:"text"}]
                const MediaCoverageColumns = [{title:"", dataKey: "number"},{title: "", dataKey:"text"}]
                pdf.addPage();
                pdf.autoTable(["Agreement"], [""], {
                    theme: 'plain',
                    startY: 60,
                    styles : {fontSize: 13, textColor: (77, 77, 77)}
                });
                pdf.autoTable(["Declaration of consent"], [], {
                    styles: { textColor: 45,},
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY-8,
                })
                pdf.autoTable(DeclarationColumns, getData("Declaration",data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY-15,
                    bodyStyles: {valign: 'top'},
                    styles: {overflow: 'linebreak', columnWidth: 'wrap', textColor: 45,},
                    columnStyles: {text: {columnWidth: 'auto', textColor: (77, 77, 77)}},
                    drawRow: function (row, data) {
                        row.height = row.height * 1.2
                    },
                })
                pdf.autoTable(["MEDIA COVERAGE"], [], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    styles: {textColor: (77, 77, 77)},
                    drawRow: function (row, data) {
                        row.height = row.height * 1.2
                    },
                })
                pdf.autoTable(MediaCoverageColumns, getData("MediaCoverage",data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY-15,
                    bodyStyles: {valign: 'top'},
                    styles: {overflow: 'linebreak', columnWidth: 'wrap'},
                    columnStyles: {text: {columnWidth: 'auto', textColor: (77, 77, 77)}},
                    drawRow: function (row, data) {
                        row.height = row.height * 1.2
                    },
                })
                let images = []
                pdf.autoTable(["", "", ""], ["", "", ""], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 30,
                    bodyStyles: {rowHeight: 30},
                    drawCell: function(cell, opts) {
                        if (opts.column.dataKey === 1) {
                            images.push({
                            elem: url[1],
                            x: cell.textPos.x,
                            y: cell.textPos.y
                            });
                        }
                    },
                    // addPageContent: function() {
                    //     // pdf.addImage(images[0].elem, images[0].x, images[0].y, 15, 15);
                    //     // pdf.setFontType("bold");
                    //     // pdf.setFontSize(13);
                    //     // pdf.setTextColor(77, 77, 77);
                    //     // pdf.text("I Aggree and Submit", images[0].x + 25, images[0].y + 12);
                    // }
                })
                pdf.save('SPMF_Application_Form.pdf');
            }, margins);
    });
}

export function getData(type, data) {
    let newData = []
    if (type == "Eligibility") {
        newData.push(
            {title: "   ", text: '-  Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)'},
            {title: "   ", text: '-  Family is living in a 4-room HDB flat or smaller'},
            {title: "   ", text: '-  Family has a gross per capita income (PCI) of $625/ month or less'},
            {title: "   ", text: '-  Is not concurrently receiving School Pocket Money Fund from any other STSPMF disbursing agency/school or any other similar schemes except MOE Financial Assistance Scheme'},
            {title: "   ", text: '-  Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme'},
            {title: "   ", text: '-  Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education.'},
            {title: "   ", text: '-  Student is 20 years or younger at point of application'},
        )
    }
    if (type == "Doc") {
        newData.push(
            {title: "   ", text: '-  Photocopy of student(s)’s NRIC / birth certificate'},
            {title: "   ", text: '-  Photocopy of both parents’/ guardian’s NRIC / passport'},
        )
    }
    if (type == "PersonalDetail"){
        newData.push(
            [""],
            ["Full Name", ":", data.Full_Name__c, "Gender", ":", data.Gender__c],
            ["ID Type", ":", "NRIC", "Nationality", ":", data.Nationality__c],
            ["ID Number", ":", data.ID_Number__c, "Other Nationality", ":", data.Other_Nationality__c],
            ["Date of Birth", ":", data.Date_of_Birth__c, "Race", ":", data.Race__c],
            ["Marital Status", ":", data.Marital_Status__c, "Other Race", ":", data.Other_Race__c],
            ["Other Marital Status", ":", data.Other_Marital_Status__c],
        )
    }
    if(type == "Address"){
        newData.push(
            [""],
            ["Postal Code", ":", data.Postal__c, "Type Of Flat", ":", data.Flat_Type__c],
            ["Street Name", ":", data.Street_Name__c, "Other Type of Flat", ":", data.Other_Flat_Type__c],
            ["Block Number", ":", data.Block_Number__c, "Country", ":", data.Country__c],
        )
    }
    if (type == "Contact") {
        newData.push(
            [""],
            ["Home Phone", ":", data.Home_Phone__c, "Mobile Phone", ":", data.Mobile_Phone__c],
            ["Email Address", ":", data.Email_Address__c]
        )
    }
    if (type == "Bene") {
        newData.push(
            ["Name", ":", data.Full_Name__c, "NRIC", ":", data.ID_Number__c],
            ["Email", ":", data.Email_Address__c, "Date of Birth", ":", data.Date_of_Birth__c],
            ["School", ":", data.Current_School__c, "Current Level", ":", data.Current_Level__c],
            ["Stream", ":", data.Stream__c, "Applaying to", ":", data.Applying_to__c],
        );
    }
    if (type == "Hou") {
        newData.push(
            ["Name", ":", data.Full_Name__c, "NRIC", ":", data.ID_Number__c],
            ["Date of Birth", ":", data.Date_of_Birth__c, "Relationship to Applicant", ":", data.Relationship_to_Applicant__c, ],
            ["Gross Monthly Income", ":", data.Monthly_Gross_Income__c, "Employment Status", ":", data.Employment_Status__c],
            ["Occupation", ":", data.Occupation__c, "Company", ":", data.Company__c],
            ["Employment Start Date", ":", data.Employment_Start_Date__c, "Employment End Date", ":", data.Employment_End_Date__c],
        );
    }
    if (type == "Declaration"){
        let beneficiaries = []
        data.Ben.map((benData)=>{
            beneficiaries.push(benData.data.Full_Name__c)
        })
        newData.push(
            {number: "      1.", text: `I, ${data.Full_Name__c}, I/C No ${data.ID_Number__c}, declare that [my child/children/ward (s)]\ is/are currently NOT receiving The Straits Times School Pocket Money Fund (STSPMF) from any other STSPMF disbursing agency/school and have not applied for STSPMF at another disbursing agency/school.`
            },
            {number: "      2.", text: `I declare that ${beneficiaries.toString()} is/are NOT receiving other similar monthly pocket money schemes excluding MOE FAS.`
            },
            {number: "      3.", text: "I acknowledge that for the purpose of facilitating my application for the STSPMF, that is administered by the STSPMF through disbursing agencies and schools,"
            },
            {number: "        ", text: "a) any and all agencies and schools that have any of my prior financial assistance or social assistance records \
     may share the relevant information with STSPMF."
            },
            {number: "        ", text: "b) that the record of this application, if approved, may be shared with STSPMF Trustees, the school and any \
        agency or persons authorised by The Straits Times School Pocket Money Fund for the purpose of rendering \
    me or assessing my eligibility for financial or other assistance in future occasions; or for research studies \
          in which I, as a specific individual, shall not be identified; or for any other purpose prescribed or permitted \
         under Singapore law.."
            },
            {number: "      4.", text: "I acknowledge that the information I have provided is accurate. I understand that [my children / my ward(s)*] data will be stored in the electronic Case Management System (and in future, any replacement system developed by STSPMF) and consent for the data to be shared with STSPMF and across other agencies for analysis and enhancement of service delivery."      
            },
            {number: "      5.", text: "I am aware that the disbursing agency and/or STSPMF has the right to recover in full the STSPMF that was given to me, if I have provided inaccurate information, or withheld any relevant information from the school."      
            },
            {number: "      6.", text: "I am aware that the STSPMF assistance is given for the benefit of [my child/ children/ ward(s)], for use as pocket money in school."      
            },
        )
    }
    if (type == "MediaCoverage") {
        newData.push(
            {number: "        ", text: `This section seeks the consent of the STSPMF applicant to be featured and interviewed for articles on STSPMF. I, ${data.Full_Name__c}, NRIC No ${data.ID_Number__c} to my Family/me being featured.`},
        )
    }
    if (type == "Reason"){
        data.Alcoholism__c && newData.push(["", "-","Alcoholism"])
        data.Chronic_Illness__c && newData.push(['', "-","Choronic Illness"])
        data.Cultural_or_personal_belief__c && newData.push(["-","Choronic Illness"])
        data.Disability__c && newData.push(['', "-","Disability"])
        data.Drug_Addiction__c && newData.push(['', "-","Drug Addiction"])
        data.Gambling_Addiction__c && newData.push(['', "-","Gambling Addiction"])
        data.Low_Education__c && newData.push(['', "-","Low Education"])
        data.Social_Visit_Pass__c && newData.push(['', "-","Social Visit Pass"])
        data.Temporarily_unfit_for_work__c && newData.push(['', "-","Temporarily Unit for Work"])
        data.Other_Reason_Description__c !== '' && newData.push(['', "-", data.Other_Reason_Description__c])
        
    }
    return newData
}