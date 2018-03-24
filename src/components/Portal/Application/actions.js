
import { spmfcloudFunctionUrl } from '../../../actions/salesforces';

export default null;

/**
 * This function need to be bind with main component
 * return Promise JSON
 */
export async function getApplicationList() {
    if (this === undefined) return;
    this.setState({ loading: true });
    const query = `SELECT Application__c, Application__r.Name, Application__r.Applicant_Name__c, Name, Full_Name__c,
                Application__r.No_of_Bene__c, Application__r.Date_of_Application__c, Application__r.Application_Status__c,
                Application__r.Applicant_Race__c, Application__r.Applicant_ID_Type__c, Application__r.Applicant_ID__c,
                Application__r.Applicant_Marital_Status__c, Application__r.City__c, Application__r.Block__c, Application__r.Id,
                Application__r.Street__c, Application__r.Postal__c, Application__r.Flat_Type__c, Application__r.Country__c,
                Application__r.Applicant__r.Home_Phone__c, Application__r.Applicant__r.Contact_Number__c, Application__r.Applicant__r.Mobile_Phone__c,
                Application__r.Applicant__r.Email_Address__c, Application__r.Applicant__r.Other_Marital_Status__c,
                Application__r.Applicant__r.Office_Number__c, Application__r.Applicant__r.Other_Race__c, Application__r.Applicant__r.Other_Nationality__c,
                Application__r.Applicant__r.Gender__c, Application__r.Fail_Eligibility__c, Application__r.Read_in_Portal__c
                FROM Person__c WHERE Applying_to__r.Id ='${this.props.user.loggedInUser.Account.Id}'`;
    const result = await fetch(`${spmfcloudFunctionUrl}/query-data`, {
        body: JSON.stringify({
            query,
        }),
        headers: {
            'hash-token': this.props.user.siteToken.hash,
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        
    }).then(response => response.json())
        .catch((error) => {
            throw (new Error(error));
        });
    this.setState({ applicationList: result.records, loading: false });
}

/**
 * This function need to be bind with main component
 * return Promise JSON
 */
export async function updateApplication() {

}


/**
 * This function need to be bind with main component
 * return Promise JSON
 */


export function getApplicationPersonList(applicationId, accountId, type = 'Beneficiary', siteToken) {
    let query = `Select Id, Name, Full_Name__c, Application_Status__c from Person__c
        Where RecordType.Name = '${type}' AND Application__c = '${applicationId}'`;
    if (type === 'Beneficiary') {
        query += ` AND Applying_to__c = '${accountId}'`;
    }
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
    }).then(response => response.json());
}


/**
 * Get Application Attachment
 */

export function getAllAttachment(beneListIds = [], siteToken) {
    if (beneListIds.length < 0) return {};
    const query = `Select Id, Name, Body, BodyLength, ContentType, Description From Attachment 
        Where ParentId in ('${beneListIds.join("','")}')`;
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
    }).then(response => response.json());
 }
