import swal from 'sweetalert';
import Logo from '../assets/img/spmf_logo.jpg';
import jsPDF from 'jspdf';

require('jspdf-autotable');

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'gentelella/build/css/custom.min.css';
// import { isValidElement } from '../../../Library/Caches/typescript/2.6/node_modules/@types/react';

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
        fullUrl = `${request.url}/services/data/${SF_VERSION}${`${(request.composite ? '/composite/tree/' : '/sobjects/') + sobject}/${request.id ? request.id : ''}`}`;
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
                    return {
                        payload: json,
                        type: dispatchType,
                    };
                }
            } else {
                return {
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
        if (request.method == 'GET') {
            fullUrl = `${request.url}/services/data/${SF_VERSION}${`${(request.composite ? '/composite/tree/' : '/sobjects/') + sobject}/${request.id ? request.id : ''}`}`;
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

export function getCurrentDate() {
    const date = new Date();
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    const year = String(date.getFullYear());

    if (month.length == 1) {
        month = `0${month}`;
    }
    if (day.length == 1) {
        day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
}

export function validation(step, data) {
    let requiredField = [];
    let requiredFile = [];
    const validFields = [];
    const validFiles = [];
    const invalidFields = [];
    const invalidFiles = [];
    let isValid = false;
    if (step == 2) {
        requiredField = ['Full_Name__c', 'ID_Type__c', 'ID_Number__c', 'Email_Address__c', 'Postal__c',
            'Street__c', 'Block__c', 'Flat_Type__c', 'Date_of_Birth__c', 'Marital_Status__c', 'Gender__c',
            'Nationality__c', 'Race__c', 'Contact_Number__c',
        ];
        const validStep2 = requiredField.map((step2Field)=>{
            if (step2Field === 'Marital_Status__c' && data[step2Field] == 'Others') {
                console.log('other');
                if (data.Other_Marital_Status__c !== '' && data.Other_Marital_Status__c !== undefined) {
                    return true;
                } else {
                    invalidFields.push('Other Marital Status')
                    return false
                }
            }
            if (step2Field == 'Nationality__c' && data[step2Field] == 'Others') {
                if (data.Other_Nationality__c !== '' && data.Other_Nationality__c !== undefined) {
                    return true
                } else {
                    invalidFields.push('Other Nationality')
                    return false
                }
            }
            if (step2Field == 'Race__c' && data[step2Field] == 'Others') {
                if (data.Other_Race__c !== '' && data.Other_Race__c !== undefined) {
                    return true
                } 
                    invalidFields.push('Other Race')
                    return false
                
            }
            if (step2Field == 'Flat_Type__c' && data[step2Field] == 'Others') {
                if(data.Other_Flat_Type__c !== '' && data.Other_Flat_Type__c !== undefined) {
                    return true
                } 
                    invalidFields.push('Other Flat Type')
                    return false
                
            }
            
                if(data[step2Field] !== '' && data[step2Field] !== undefined) {
                    return true
                } 
                    invalidFields.push(step2Field.substring(0, step2Field.lastIndexOf('__c')).replace('_', ' '))
                    return false
                
                
        });
        console.log(validStep2);
        if (!validStep2.includes(false)) {
            isValid = true;
        }
        return { isValid, invalidFields };
    }
    if (step == 3) {
        requiredField = ['Full_Name__c', 'ID_Number__c', 'Date_of_Birth__c', 'Current_Level__c',
            'Current_School__c', 'Applying_to__c', 'Race__c', 'Email_Address__c',
            'Gender__c', 'Nationality__c', 'Relationship_to_Applicant__c',
        ];
        data.Ben.map((dataBen) => {
            requiredField.map((step3Field) => {
                if (dataBen.data[step3Field] !== '' && dataBen.data[step3Field] !== undefined) {
                    validFields.push('true');
                } else {
                    validFields.push('false');
                }
                console.log(validFields, step3Field, dataBen);
            });
            if (dataBen.attachment.Body !== undefined) {
                validFields.push('true');
            } else {
                validFields.push('false');
            }
        });
        console.log(validFields);
        if (!validFields.includes('false')) {
            isValid = true;
        }
        return { isValid, invalidFields };
    }
    if (step == 4) {
        requiredField = ['Full_Name__c', 'ID_Number__c', 'Date_of_Birth__c', 'Relationship_to_Applicant__c',
            'Monthly_Gross_Income__c', 'Employment_Status__c', 'Occupation__c', 'Company__c',
            'Employment_Start_Date__c'];
        requiredFile = ['file1', 'file2'];
        const EarnerCount = data.HouStatusEmployement.filter(i => i !== 'Unemployed').length;
        let validReason = true;
        if (EarnerCount <= 1) {
            const reasonField = ['Alcoholism__c', 'Chronic_Illness__c', 'Cultural_or_personal_belief__c', 'Disability__c',
                'Drug_Addiction__c', 'Gambling_Addiction__c', 'Low_Education__c', 'Social_Visit_Pass__c',
                'Temporarily_unfit_for_work__c', 'Other_Reason_Description__c'];
            if (data[reasonField[0]] === false && data[reasonField[1]] === false && data[reasonField[2]] === false &&
                data[reasonField[3]] === false && data[reasonField[4]] === false && data[reasonField[5]] === false &&
                data[reasonField[6]] === false && data[reasonField[7]] === false && data[reasonField[8]] === false &&
                data[reasonField[9]] === ''
            ) {
                validReason = false;
            }
        }
        if (data.Employment_Status__c !== 'Unemployed') {
            if (data.Full_Name__c !== '' && data.ID_Number__c !== '' && data.Date_of_Birth__c !== '' &&
                data.Relationship_to_Applicant__c !== '' && data.Monthly_Gross_Income__c !== '' &&
                data.Employment_Status__c !== '' && data.Occupation__c !== '' && data.Company__c !== '' &&
                data.Employment_Start_Date__c !== '' && data.Hou[0].attachment.file1.Body !== undefined
                && data.Hou[0].attachment.file2.Body !== undefined) {
                isValid = true;
            }
        }
        if (data.Employment_Status__c === 'Unemployed') {
            if (data.Full_Name__c !== '' && data.ID_Number__c !== '' && data.Date_of_Birth__c !== '' &&
                data.Relationship_to_Applicant__c !== '' && data.Employment_Status__c !== '') {
                isValid = true;
            }
            console.log('houunemp', isValid, validReason);
        }
        console.log('hou1valid', isValid);
        data.Hou.map((dataHou, idx) => {
            if (idx > 0) {
                if (dataHou.data.Employment_Status__c !== 'Unemployed') {
                    // check required fields
                    requiredField.map((step4Field) => {
                        if (dataHou.data[step4Field] !== '' & dataHou.data[step4Field] !== undefined) {
                            validFields.push('true');
                        } else {
                            validFields.push('false');
                            invalidFields.push({ member: idx, field: step4Field });
                        }
                    });
                    // check required files
                    requiredFile.map((step4File) => {
                        if (dataHou.attachment[step4File] !== undefined) {
                            validFiles.push('true');
                        } else {
                            validFiles.push('false');
                            invalidFiles.push({ member: idx, files: step4File });
                        }
                    });
                }
                if (dataHou.data.Employment_Status__c === 'Unemployed') {
                    // check required fields
                    requiredField.map((step4Field) => {
                        if (step4Field == 'Monthly_Gross_Income__c' || step4Field == 'Occupation__c' ||
                            step4Field == 'Company__c' || step4Field == 'Employment_Start_Date__c') {
                            validFields.push('true');
                        } else if (dataHou.data[step4Field] !== '' & dataHou.data[step4Field] !== undefined) {
                            validFields.push('true');
                        } else {
                            validFields.push('false');
                            invalidFields.push({ member: idx, field: step4Field });
                        }
                    });
                    requiredFile.map((step4File) => {
                        if (dataHou.attachment[step4File] !== undefined) {
                            validFiles.push('true');
                        } else {
                            validFiles.push('false');
                            invalidFiles.push({ member: idx, files: step4File });
                        }
                    });
                }

                // if (dataHou.data.Employment_Status__c !== "Unemployed"){
                //     if (dataHou.data.Full_Name__c !== '' && dataHou.data.Full_Name__c !== undefined &&
                //         dataHou.data.ID_Number__c !== '' && dataHou.data.ID_Number__c !== undefined &&
                //         dataHou.data.Date_of_Birth__c !== '' && dataHou.data.Date_of_Birth__c !== undefined &&
                //         dataHou.data.Relationship_to_Applicant__c !== '' && dataHou.data.Relationship_to_Applicant__c !==undefined &&
                //         dataHou.data.Monthly_Gross_Income__c !== '' && dataHou.data.Monthly_Gross_Income__c !== undefined &&
                //         dataHou.data.Employment_Status__c !== '' && dataHou.data.Employment_Status__c !== undefined &&
                //         dataHou.data.Occupation__c !== '' && dataHou.data.Occupation__c !== undefined &&
                //         dataHou.data.Company__c !== '' && dataHou.data.Company__c !== undefined &&
                //         dataHou.data.Employment_Start_Date__c !== '' && dataHou.data.Employment_Start_Date__c !== undefined &&
                //         dataHou.attachment.file1 !== undefined && dataHou.attachment.file2 !== undefined){
                //         return 'true'
                //     } else {
                //         return 'false'
                //     }
                // }
                // if(dataHou.data.Employment_Status__c === "Unemployed") {
                //     if (dataHou.data.Full_Name__c !== '' && dataHou.data.Full_Name__c !== undefined &&
                //         dataHou.data.ID_Number__c !== '' && dataHou.data.ID_Number__c !== undefined &&
                //         dataHou.data.Date_of_Birth__c !== '' && dataHou.data.Date_of_Birth__c !== undefined &&
                //         dataHou.data.Relationship_to_Applicant__c !== '' && dataHou.data.Relationship_to_Applicant__c !== undefined &&
                //         dataHou.data.Employment_Status__c !== '' && dataHou.data.Employment_Status__c !== undefined &&
                //         dataHou.attachment.file1 !== undefined && dataHou.attachment.file2 !== undefined) {
                //         return 'true'
                //     } else {
                //         return 'false'
                //     }
                // }
            }
        });
        if (!validReason || validFields.includes('false') || validFiles.includes('false')) {
            isValid = false;
        }
        return { isValid, invalidFields, invalidFiles };
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

export function regexValidate(type, value) {
    if (RegexList[type].test(value)) {
        return true;
    }
    return false;
}

export function validateNRIC(str) {
    if (str.length != 9) { return false; }

    str = str.toUpperCase();

    let i,
        icArray = [];
    for (i = 0; i < 9; i++) {
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
    for (i = 1; i < 8; i++) {
        weight += icArray[i];
    }

    const offset = (icArray[0] == 'T' || icArray[0] == 'G') ? 4 : 0;
    const temp = (offset + weight) % 11;

    const st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

    let theAlpha;
    if (icArray[0] == 'S' || icArray[0] == 'T') { theAlpha = st[temp]; } else if (icArray[0] == 'F' || icArray[0] == 'G') { theAlpha = fg[temp]; }

    return (icArray[8] === theAlpha);
}

export function getBase64FromImageUrl(src, outputFormat) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        img.crossOrigin = 'Anonymous';
        img.src = src;
        img.onload = function () {
            let dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            resolve(dataURL);
        };
    });
}

export function generatePdf(data) {
    const img1 = getBase64FromImageUrl(`${spmfUrl}${require('../assets/img/spmf_pdf.jpg')}`);
    const img2 = getBase64FromImageUrl(`${spmfUrl}${require('../assets/img/check.jpg')}`);
    Promise.all([img1, img2]).then((url) => {
        const eligibilityColumns = [{ title: '   ', dataKey: 'title' }, { title: '', dataKey: 'text' }];
        const docColumns = [{ title: '   ', dataKey: 'title' }, { title: '', dataKey: 'text' }];
        const PersonalDetailColumns = ['Personal Details', '', '', ''];
        const AddressColumns = ['Address', '', '', ''];
        const tab2ColumnStyle = {
            0: { columnWidth: 125, textColor: (77, 77, 77), fontSize: 11 },
            1: { columnWidth: 140, textColor: [5, 112, 148], fontSize: 11 },
            2: { columnWidth: 125, textColor: (77, 77, 77), fontSize: 11 },
            3: { columnWidth: 140, textColor: [5, 112, 148], fontSize: 11 },
        };
        const source = document.createElement('DIV');
        const x = document.createElement('IMG');
        x.setAttribute('src', url[0]);
        x.setAttribute('width', '600');
        x.setAttribute('height', '83');
        source.appendChild(x);
        const pdf = new jsPDF('p', 'pt', 'letter');
        const specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true;
            },
        };
        const margins = {
            top: 80, bottom: 60, left: 40, width: 522,
        };
        pdf.setTextColor(77, 77, 77);
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                width: margins.width, // max width of content on PDF
                elementHandlers: specialElementHandlers,
            },
            (dispose) => {
                pdf.autoTable(['Eligibility Criteria'], [], {
                    theme: 'plain',
                    startY: 200,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                });
                const a = 0;
                pdf.autoTable(eligibilityColumns, getData('Eligibility', null), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 15,
                    bodyStyles: { valign: 'top' },
                    styles: { fontSize: 11, overflow: 'linebreak', columnWidth: 'wrap' },
                    columnStyles: { text: { columnWidth: 'auto', textColor: (77, 77, 77) }, title: { textColor: (77, 77, 77) } },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                pdf.autoTable(['Additional criteria for students own JC,ITE or Polytechnic applying for STSPMF'], [], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 10,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                pdf.autoTable(['', ''], [['     -', 'Student is 20 years or younger at point of application']], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 20,
                    bodyStyles: { valign: 'top' },
                    styles: { fontSize: 11, overflow: 'linebreak', columnWidth: 'wrap' },
                    columnStyles: { 1: { columnWidth: 'auto', textColor: (77, 77, 77) }, title: { textColor: (77, 77, 77) } },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                pdf.autoTable(['All completed STSPMF application forms must be attached with the relevant documents listed below:'], [], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                pdf.autoTable(docColumns, getData('Doc', null), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 15,
                    bodyStyles: { valign: 'top' },
                    styles: { fontSize: 11, overflow: 'linebreak', columnWidth: 'wrap' },
                    columnStyles: { text: { columnWidth: 'auto', textColor: (77, 77, 77) } },
                });
                pdf.addPage();
                pdf.autoTable(['Application Profile'], [''], {
                    theme: 'plain',
                    startY: 60,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                });
                pdf.setLineWidth(1.5);
                pdf.line(20, pdf.autoTable.previous.finalY - 10, 600, pdf.autoTable.previous.finalY - 10);
                pdf.autoTable(PersonalDetailColumns, getData('PersonalDetail', data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 5,
                    showHeader: 'firstPage',
                    margin: { right: 107 },
                    styles: { fontSize: 11, textColor: (77, 77, 77) },
                    drawRow(row, data) {
                        row.height *= 1.3;
                    },
                    drawHeaderRow(cell, data) {
                        cell.height *= 1.5;
                    },
                    columnStyles: tab2ColumnStyle,
                });
                pdf.setLineWidth(1.5);
                pdf.line(20, pdf.autoTable.previous.finalY + 5, 600, pdf.autoTable.previous.finalY + 5);
                pdf.autoTable(AddressColumns, getData('Address', data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    showHeader: 'firstPage',
                    margin: { right: 107 },
                    styles: { fontSize: 11, textColor: (77, 77, 77) },
                    drawRow(row, data) {
                        row.height *= 1.3;
                    },
                    drawHeaderRow(cell, data) {
                        cell.height *= 1.5;
                    },
                    columnStyles: tab2ColumnStyle,
                });
                pdf.setLineWidth(1.5);
                pdf.line(20, pdf.autoTable.previous.finalY + 5, 600, pdf.autoTable.previous.finalY + 5);
                pdf.autoTable(['Personal Contact', '', '', ''], getData('Contact', data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    showHeader: 'firstPage',
                    margin: { right: 107 },
                    styles: { fontSize: 11, textColor: (77, 77, 77) },
                    drawRow(row, data) {
                        row.height *= 1.3;
                    },
                    drawHeaderRow(cell, data) {
                        cell.height *= 1.5;
                    },
                    columnStyles: tab2ColumnStyle,
                    headerStyles: { rowHeight: 20 },
                });
                pdf.addPage();
                // write Beneficiary
                pdf.autoTable(['Beneficiary List'], [''], {
                    theme: 'plain',
                    startY: 60,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                });
                for (let i = 0; i < data.Ben.length; i++) {
                    if (i == 0) {
                        pdf.setLineWidth(1.5);
                        pdf.line(20, pdf.autoTable.previous.finalY - 18, 600, pdf.autoTable.previous.finalY - 18);
                        pdf.autoTable([`Beneficiary ${i + 1}`, '', '', ''], getData('Bene', data.Ben[i], data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY - 10,
                            showHeader: 'firstPage',
                            margin: { right: 107 },
                            styles: {
                                overflow: 'linebreak', fontSize: 11, columnWidth: 'wrap', textColor: (77, 77, 77),
                            },
                            drawRow(row, data) {
                                row.height *= 1.1;
                            },
                            drawHeaderRow(cell, data) {
                                cell.height *= 1.2;
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }
                    if (i !== 0 && i < 3) {
                        pdf.setLineWidth(1.5);
                        pdf.line(20, pdf.autoTable.previous.finalY + 5, 600, pdf.autoTable.previous.finalY + 5);
                        pdf.autoTable([`Beneficiary ${i + 1}`, '', '', ''], getData('Bene', data.Ben[i], data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY + 10,
                            showHeader: 'firstPage',
                            margin: { right: 107 },
                            styles: {
                                overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                            },
                            drawRow(row, data) {
                                row.height *= 1.1;
                            },
                            drawHeaderRow(cell, data) {
                                cell.height *= 1.2;
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }
                    if (i > 2) {
                        if (i % 3 == 0) {
                            pdf.addPage();
                            pdf.autoTable([`Beneficiary ${i + 1}`, '', '', ''], getData('Bene', data.Ben[i], data), {
                                theme: 'plain',
                                startY: 60,
                                showHeader: 'firstPage',
                                margin: { right: 107 },
                                styles: {
                                    overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                                },
                                drawRow(row, data) {
                                    row.height *= 1.1;
                                },
                                drawHeaderRow(cell, data) {
                                    cell.height *= 1.2;
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        } else {
                            pdf.autoTable([`Beneficiary ${i + 1}`, '', '', ''], getData('Bene', data.Ben[i], data), {
                                theme: 'plain',
                                startY: pdf.autoTable.previous.finalY + 10,
                                showHeader: 'firstPage',
                                margin: { right: 107 },
                                styles: {
                                    overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                                },
                                drawRow(row, data) {
                                    if (row.index > 0) {
                                        row.height *= 1.1;
                                    }
                                },
                                drawHeaderRow(cell, data) {
                                    cell.height *= 1.2;
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        }
                    }
                }
                const endOfBen = pdf.autoTable.previous.finalY;
                // write Houshold Main Applicant
                // same page with last bene
                if (endOfBen < 445) {
                    console.log('houpdf', pdf.autoTable.previous.finalY);
                    pdf.autoTable(['Household Member List'], [''], {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY + 20,
                        styles: { fontSize: 13, textColor: [5, 112, 148] },
                    });
                    pdf.setLineWidth(1.5);
                    pdf.line(20, pdf.autoTable.previous.finalY - 18, 600, pdf.autoTable.previous.finalY - 18);
                    pdf.autoTable(['Main Applicant', '', '', ''], getData('Hou', { data, attachment: data.Hou[0].attachment }), {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY - 10,
                        showHeader: 'firstPage',
                        margin: { right: 107 },
                        styles: {
                            overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                        },
                        drawRow(row, data) {
                            row.height *= 1.1;
                        },
                        drawHeaderRow(cell, data) {
                            cell.height *= 1.2;
                        },
                        columnStyles: tab2ColumnStyle,
                    });
                }
                // new page
                if (endOfBen > 445.12) {
                    pdf.addPage();
                    pdf.autoTable(['Household Member List'], [''], {
                        theme: 'plain',
                        startY: 60,
                        styles: { fontSize: 13, textColor: [5, 112, 148] },
                    });
                    pdf.setLineWidth(1.5);
                    pdf.line(20, pdf.autoTable.previous.finalY - 18, 600, pdf.autoTable.previous.finalY - 18);
                    pdf.autoTable(['Main Applicant', '', '', '', '', ''], getData('Hou', { data, attachment: data.Hou[0].attachment }), {
                        theme: 'plain',
                        startY: pdf.autoTable.previous.finalY - 10,
                        showHeader: 'firstPage',
                        margin: { right: 107 },
                        styles: {
                            overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                        },
                        drawRow(row, data) {
                            row.height *= 1.2;
                        },
                        drawHeaderRow(cell, data) {
                            cell.height *= 1.4;
                        },
                        columnStyles: tab2ColumnStyle,
                    });
                }
                // write hou member
                for (let i = 1; i < data.Hou.length; i++) {
                    if (i == data.Hou.length - 1) {
                        if (pdf.autoTable.previous.finalY + 146 > 615) {
                            pdf.addPage();
                            pdf.autoTable([`Member ${i + 1}`, '', '', ''], getData('Hou', data.Hou[i]), {
                                theme: 'plain',
                                startY: 60,
                                showHeader: 'firstPage',
                                margin: { right: 107 },
                                styles: {
                                    overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                                },
                                drawRow(row, data) {
                                    row.height *= 1.1;
                                },
                                drawHeaderRow(cell, data) {
                                    cell.height *= 1.2;
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        } else {
                            pdf.setLineWidth(1.5);
                            pdf.line(20, pdf.autoTable.previous.finalY + 10, 600, pdf.autoTable.previous.finalY + 10);
                            pdf.autoTable([`Member ${i + 1}`, '', '', ''], getData('Hou', data.Hou[i]), {
                                theme: 'plain',
                                startY: pdf.autoTable.previous.finalY + 20,
                                showHeader: 'firstPage',
                                margin: { right: 107 },
                                styles: {
                                    overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                                },
                                drawRow(row, data) {
                                    row.height *= 1.1;
                                },
                                drawHeaderRow(cell, data) {
                                    cell.height *= 1.2;
                                },
                                columnStyles: tab2ColumnStyle,
                            });
                        }
                    } else if (pdf.autoTable.previous.finalY + 215 > 689) {
                        pdf.addPage();
                        pdf.autoTable([`Member ${i + 1}`, '', '', ''], getData('Hou', data.Hou[i]), {
                            theme: 'plain',
                            startY: 60,
                            showHeader: 'firstPage',
                            margin: { right: 107 },
                            styles: {
                                overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                            },
                            drawRow(row, data) {
                                row.height *= 1.1;
                            },
                            drawHeaderRow(cell, data) {
                                cell.height *= 1.2;
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    } else {
                        pdf.setLineWidth(1.5);
                        pdf.line(20, pdf.autoTable.previous.finalY + 10, 600, pdf.autoTable.previous.finalY + 10);
                        pdf.autoTable([`Member ${i + 1}`, '', '', ''], getData('Hou', data.Hou[i]), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY + 20,
                            showHeader: 'firstPage',
                            margin: { right: 107 },
                            styles: {
                                overflow: 'linebreak', columnWidth: 'wrap', fontSize: 11, textColor: (77, 77, 77),
                            },
                            drawRow(row, data) {
                                row.height *= 1.1;
                            },
                            drawHeaderRow(cell, data) {
                                cell.height *= 1.2;
                            },
                            columnStyles: tab2ColumnStyle,
                        });
                    }

                    console.log(i, pdf.autoTable.previous.finalY);
                }

                // Reason Reason/s for not having an income earner / Having one income earner
                if (data.HouStatusEmployement.filter(i => i !== 'Unemployed').length <= 1) {
                    if (pdf.autoTable.previous.finalY < 720) {
                        pdf.autoTable(['Reason Reason/s for not having an income earner / Having one income earner'], [''], {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY + 20,
                            styles: { fontSize: 13, textColor: [5, 112, 148] },
                        });
                        pdf.setLineWidth(1.5);
                        pdf.line(20, pdf.autoTable.previous.finalY - 20, 600, pdf.autoTable.previous.finalY - 20);
                        pdf.autoTable(['', '', '', '', '', ''], getData('Reason', data), {
                            theme: 'plain',
                            startY: pdf.autoTable.previous.finalY - 35,
                            showHeader: 'firstPage',
                            margin: { right: 107 },
                            drawRow(row, data) {
                                if (row.index > 0) {
                                    row.height *= 1.2;
                                }
                            },
                            styles: {
                                overflow: 'linebreak', columnWidth: 'wrap', textColor: (77, 77, 77), fontSize: 11,
                            },
                            columnStyles: {
                                0: { columnWidth: 40, textColor: (77, 77, 77) },
                                1: { columnWidth: 20, textColor: (77, 77, 77) },
                                2: { columnWidth: 'auto', textColor: [5, 112, 148] },
                                3: { columnWidth: 120, textColor: (77, 77, 77) },
                                4: { columnWidth: 20, textColor: (77, 77, 77) },
                                5: { columnWidth: 120, textColor: (77, 77, 77) },
                            },
                        });
                    }
                }

                const DeclarationColumns = [{ title: '', dataKey: 'number' }, { title: '', dataKey: 'text' }];
                const MediaCoverageColumns = [{ title: '', dataKey: 'number' }, { title: '', dataKey: 'text' }];
                // new Page Agreement
                pdf.addPage();
                // Agreement Title
                pdf.autoTable(['Agreement'], [''], {
                    theme: 'plain',
                    startY: 60,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                });
                // Declaration of content title
                pdf.autoTable(['Declaration of consent'], [], {
                    styles: { textColor: 45 },
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 8,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                });
                // Declaration of content title content
                pdf.autoTable(DeclarationColumns, getData('Declaration', data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 15,
                    bodyStyles: { valign: 'top' },
                    styles: {
                        overflow: 'linebreak', columnWidth: 'wrap', textColor: (77, 77, 77), fontSize: 11,
                    },
                    columnStyles: { text: { columnWidth: 'auto', textColor: (77, 77, 77), fonstSize: 11 } },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                // Media COverage title
                pdf.autoTable(['MEDIA COVERAGE'], [], {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY + 20,
                    styles: { fontSize: 13, textColor: [5, 112, 148] },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                // Media Coverage Content
                pdf.autoTable(MediaCoverageColumns, getData('MediaCoverage', data), {
                    theme: 'plain',
                    startY: pdf.autoTable.previous.finalY - 15,
                    bodyStyles: { valign: 'top' },
                    styles: { overflow: 'linebreak', columnWidth: 'wrap' },
                    columnStyles: { text: { columnWidth: 'auto', textColor: (77, 77, 77), fontSize: 11 } },
                    drawRow(row, data) {
                        row.height *= 1.2;
                    },
                });
                pdf.save('SPMF_Application_Form.pdf');
            }, margins,
        );
    });
}

export function getData(type, data, datamap = null) {
    const newData = [];
    if (type == 'Eligibility') {
        newData.push(
            { title: '     -', text: 'Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)' },
            { title: '     -', text: 'Family is living in a 4-room HDB flat or smaller' },
            { title: '     -', text: 'Family has a gross per capita income (PCI) of $625/ month or less' },
            { title: '     -', text: 'Student is receiving full-time formal education in a mainstream primary/ secondary/ mixed level/ Junior College/ Centralized institute; Independent; SPED; Institutes of Technical Education; Polytechnic; Specialised; Specialized Independent; MOE-designated full-time Madrasahs and Mountbatten Vocational School' },
            { title: '     -', text: 'Is not concurrent receiving STSPMF or other similar monthly school pocket money schemes (Note that applicant under the MOE Financial Assistance Scheme are eligible)' },
            { title: '     -', text: 'Is currently not receiving  STSPMF and has not been a STSPMF beneficiary for 24 months for the whole schooling years of primary and secondary school and 48 months for post-secondary school.[Note: This does not refer to students who are currently receiving fund through their schools and wish to continue receiving fund, subjected to their eligibility]' },
            // {title: "     -", text: 'Student is 20 years or younger at point of application'},
        );
    }
    if (type == 'Doc') {
        newData.push(
            { title: '     -', text: 'Soft copy of student(s)’s NRIC / birth certificate' },
            { title: '     -', text: 'Soft copy of both parents’/ guardian’s NRIC / passport' },
            { title: '     -', text: 'Latest documentary evidence of gross household income of <b>every single member of the household</b> e.g.: latest pay slips and  CPF statements for the past 15 months (My Contribution, My Statement and Transaction History) or income declaration**iIn the absence of evidence indicating household income, please fill up the income declarations from in Annex B STSPMF reserves the right to reject the application if any of the supporting documents is not submitted' },
        );
    }
    if (type == 'PersonalDetail') {
        newData.push(
            // [""],
            ['Full Name', data.Full_Name__c, 'Gender', data.Gender__c],
            ['ID Type', 'NRIC', 'Nationality', data.Nationality__c],
            ['ID Number', data.ID_Number__c, 'Other Nationality', data.Other_Nationality__c],
            ['Date of Birth', data.Date_of_Birth__c, 'Race', data.Race__c],
            ['Marital Status', data.Marital_Status__c, 'Other Race', data.Other_Race__c],
            ['Other Marital Status', data.Other_Marital_Status__c],
        );
    }
    if (type == 'Address') {
        newData.push(
            // [""],
            ['Postal Code', data.Postal__c, 'Type Of Flat', data.Flat_Type__c],
            ['Street Name', data.Street_Name__c, 'Other Type of Flat', data.Other_Flat_Type__c],
            ['Block Number', data.Block_Number__c, 'Country', data.Country__c],
            ['Unit Number/House Number', data.Unit_Number__c],
        );
    }
    if (type == 'Contact') {
        newData.push(
            // [""],
            ['Contact Number', data.Contact_Number__c, 'Mobile Phone', data.Mobile_Phone__c],
            ['Home Phone', data.Home_Phone__c, 'Office Phone', data.Office_Number__c],
            ['Email Address', data.Email_Address__c],
        );
    }
    if (type == 'Bene') {
        newData.push(
            ['Name', data.data.Full_Name__c, 'NRIC', data.data.ID_Number__c],
            ['Date of Birth', data.data.Date_of_Birth__c, 'Race', data.data.Race__c],
            ['Gender', data.data.Gender__c, 'Nationality', data.data.Nationality__c],
            ['School', datamap.schoolMap[data.data.Current_School__c], 'Current Level', data.data.Current_Level__c],
            ['Stream', data.data.Stream__c, 'Applaying to', datamap.schoolMap[data.data.Applying_to__c]],
            ['Email', data.data.Email_Address__c, 'Relationship to Applicant', data.data.Relationship_to_Applicant__c],
            ['NRIC Uploaded File', data.attachment.Name],
        );
    }
    if (type == 'Hou') {
        newData.push(
            ['Name', data.data.Full_Name__c, 'NRIC', data.data.ID_Number__c],
            ['Date of Birth', data.data.Date_of_Birth__c, 'Race', data.data.Race__c],
            ['Gender', data.data.Gender__c, 'Nationality', data.data.Nationality__c],
            ['Relationship to Applicant', data.data.Relationship_to_Applicant__c, 'Gross Monthly Income', data.data.Monthly_Gross_Income__c],
            ['Employment Status', data.data.Employment_Status__c, 'Employment Start Date', data.data.Employment_Start_Date__c],
            ['Occupation', data.data.Occupation__c, 'Company', data.data.Company__c],
            ['NRIC Uploaded File', data.attachment.file1 ? data.attachment.file1.Name : '', 'Income Statement Receipt', data.attachment.file2 ? data.attachment.file2.Name : ''],
            ['Payslip Uploaded File', data.attachment.file3 ? data.attachment.file3.Name : ''],
        );
    }
    if (type == 'Declaration') {
        const beneficiaries = [];
        data.Ben.map((benData) => {
            beneficiaries.push(benData.data.Full_Name__c);
        });
        newData.push(
            { number: '      1.', text: `I, ${data.Full_Name__c}, I/C No ${data.ID_Number__c}, declare that [my child/children/ward (s)]\ is/are currently NOT receiving The Straits Times School Pocket Money Fund (STSPMF) from any other STSPMF disbursing agency/school and have not applied for STSPMF at another disbursing agency/school.` },
            { number: '      2.', text: `I declare that ${beneficiaries.toString()} is/are NOT receiving other similar monthly pocket money schemes excluding MOE FAS.` },
            { number: '      3.', text: 'I acknowledge that for the purpose of facilitating my application for the STSPMF, that is administered by the STSPMF through disbursing agencies and schools,' },
            {
                number: '        ', text: 'a) any and all agencies and schools that have any of my prior financial assistance or social assistance records \
     may share the relevant information with STSPMF.',
            },
            {
                number: '        ', text: 'b) that the record of this application, if approved, may be shared with STSPMF Trustees, the school and any \
        agency or persons authorised by The Straits Times School Pocket Money Fund for the purpose of rendering \
    me or assessing my eligibility for financial or other assistance in future occasions; or for research studies \
          in which I, as a specific individual, shall not be identified; or for any other purpose prescribed or permitted \
         under Singapore law..',
            },
            { number: '      4.', text: 'I acknowledge that the information I have provided is accurate. I understand that [my children / my ward(s)*] data will be stored in the electronic Case Management System (and in future, any replacement system developed by STSPMF) and consent for the data to be shared with STSPMF and across other agencies for analysis and enhancement of service delivery.' },
            { number: '      5.', text: 'I am aware that the disbursing agency and/or STSPMF has the right to recover in full the STSPMF that was given to me, if I have provided inaccurate information, or withheld any relevant information from the school.' },
            { number: '      6.', text: 'I am aware that the STSPMF assistance is given for the benefit of [my child/ children/ ward(s)], for use as pocket money in school.' },
        );
    }
    if (type == 'MediaCoverage') {
        newData.push({ number: '        ', text: `This section seeks the consent of the STSPMF applicant to be featured and interviewed for articles on STSPMF. I, ${data.Full_Name__c}, NRIC No ${data.ID_Number__c} to my Family/me being featured.` });
    }
    if (type == 'Reason') {
        data.Alcoholism__c && newData.push(['', '-', 'Alcoholism']);
        data.Chronic_Illness__c && newData.push(['', '-', 'Choronic Illness']);
        data.Cultural_or_personal_belief__c && newData.push(['', '-', 'Cultural or Personal Beliefe']);
        data.Disability__c && newData.push(['', '-', 'Disability']);
        data.Drug_Addiction__c && newData.push(['', '-', 'Drug Addiction']);
        data.Gambling_Addiction__c && newData.push(['', '-', 'Gambling Addiction']);
        data.Low_Education__c && newData.push(['', '-', 'Low Education']);
        data.Social_Visit_Pass__c && newData.push(['', '-', 'Social Visit Pass']);
        data.Temporarily_unfit_for_work__c && newData.push(['', '-', 'Temporarily Unit for Work']);
        data.Other_Reason_Description__c !== '' && newData.push(['', '-', data.Other_Reason_Description__c]);
    }
    return newData;
}


