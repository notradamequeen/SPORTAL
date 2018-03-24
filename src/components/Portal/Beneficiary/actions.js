import React from 'react';
import swal from 'sweetalert';
import { spmfcloudFunctionUrl } from '../../../actions/salesforces';

export function getBeneficiaryDetail(id, siteToken) {
    const query = `Select Id, Name, Full_Name__c, ID_Type__c, ID_Number__c, Relationship_to_Applicant__c, 
        Application_Date__c, Gender__c, Age_at_Application__c, Approve_Exception__c,
        Current_School__r.Name, Race__c, Nationality__c, Marital_Status__c, Application__c,
        Applying_to__r.Name, Application_Type__c, Referred_From__c, Referred_Date__c, Application_Status__c,
        Current_Level__c, Referring_Reason__c, Stream__c, Email_Address__c, Religion__c, Date_of_Birth__c, 
        No_of_Receipt__c, No_of_Receipts_Approved__c, Payout_Start__c, Payout_End__c, RecordType.Name
        From Person__c Where Id='${id}'`;
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

export function getBeneficiaryReceiptList(beneficiaryId, siteToken) {
    const query = `Select Id, Status__c, Name, Issued_By__c, Scheduled_Payout_Date__c, Date_Received__c, Approved_Amount__c, Generated_From__c 
        From Receipt__c 
        Where Generated_From__c = '${beneficiaryId}' Order By Status__c, Scheduled_Payout_Date__c`;
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

/**
 * @param {*} data: Object - What field that need to be updated
 * @param {*} siteToken: String - SPMF website application token
 * return Fetch <Promise>
 */
export function changeBeneficiaryStatus(data, siteToken) {
    return fetch(`${spmfcloudFunctionUrl}/update-bene-status`, {
        mode: 'cors',
        body: JSON.stringify({
            data,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': siteToken,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
}

/**
 * This method need to be binded with main component
 * return Fetch Promise JSON
 */
export function getBeneficiaryList() {
    const query = `Select Active__c, Total_Amount_Outstanding__c, Updated_by_Application_Person__r.Name,
            Updated_by_Application_Person__r.Application__r.Applicant_Name__c, Last_Payment_Date__c, Updated_by_Application_Person__r.Application_Status__c,
            Updated_by_Application_Person__r.Full_Name__c, Updated_by_Application_Person__r.Gender__c, ID_type__c, Nationality__c, ID_Number__c,
            Other_Nationality__c, Updated_by_Application_Person__r.Date_of_Birth__c, Race__c, Other_Race__c,
            Updated_by_Application_Person__r.Email_Address__c, Updated_by_Application_Person__r.Current_Level__c, Updated_by_Application_Person__r.Stream__c,
            Updated_by_Application_Person__r.Current_School__r.Name, Updated_by_Application_Person__c, Name
            FROM Contact 
            WHERE Updated_by_Application_Person__r.Applying_to__c = '${this.props.user.loggedInUser.AccountId}'`;
    return fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({ query }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': this.props.user.siteToken.hash,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
}

export const describeBeneficiaryObject = () => (
    async (dispatch, getState) => {
        if (getState().objectInfo.Person__c.length > 0) return;
        const result = await fetch(`${spmfcloudFunctionUrl}/sobject/Person__c/describe`, {
            mode: 'cors',
            cache: 'force-cache',
            method: 'GET',
            headers: {
                'hash-token': getState().user.siteToken.hash,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
        dispatch({
            type: 'PERSON_DESCRIBE',
            payload: result.result.fields || {},
        });
    }
);

/**
 * To list all the picklist member, this function need to be binded with main component
 * @param {*} objectName : What is the ObjectName that we want to retrieve
 * @param {*} fieldName
 */
export function getPicklist(objectName, fieldName) {
    if (this === undefined) return [];
    let pickList = [];
    for (let i = 0; i < this.props.objectInfo[objectName].length; i++) {
        if (this.props.objectInfo[objectName][i].name === fieldName) pickList = this.props.objectInfo[objectName][i].picklistValues;
    }
    return pickList.map(item => (
        item.active ? <option value={item.value}>{item.label}</option> : null
    ));
}
/**
 * Save function to salesforce from beneficiary list, this function need to be binded with main component
 */
export async function save() {
    const { beneDetail } = this.state;
    const dataToSave = {
        Id: beneDetail.Id,
        Full_Name__c: beneDetail.Full_Name__c,
        ID_Type__c: beneDetail.ID_Type__c,
        ID_Number__c: beneDetail.ID_Number__c,
        Gender__c: beneDetail.Gender__c,
        Nationality__c: beneDetail.Nationality__c,
        Religion__c: beneDetail.Religion__c,
        Relationship_to_Applicant__c: beneDetail.Relationship_to_Applicant__c,
        Race__c: beneDetail.Race__c,
        Marital_Status__c: beneDetail.Marital_Status__c,
        Email_Address__c: beneDetail.Email_Address__c,
        Home_Phone__c: beneDetail.Home_Phone__c,
        Mobile_Phone__c: beneDetail.Mobile_Phone__c,
    };

    this.setState({ loading: true });
    try {
        const result = await fetch(`${spmfcloudFunctionUrl}/sobject/Person__c`, {
            mode: 'cors',
            method: 'put',
            body: JSON.stringify(dataToSave),
            cache: 'no-cache',
            headers: {
                'hash-token': this.props.user.siteToken.hash,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
        if (result.status !== 200) throw (new Error(result.message));
        swal({
            text: result.message,
            title: 'Success updating beneficary',
        });
        this.setState({ loading: false, editMode: false });
    } catch (error) {
        swal({
            text: error.toString(),
            title: 'An error occured',
            dangerMode: true,
        });
        this.setState({ loading: false });
    }
}

export default null;
