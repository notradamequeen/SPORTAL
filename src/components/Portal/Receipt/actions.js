import swal from 'sweetalert';
import { spmfcloudFunctionUrl } from '../../../actions/salesforces';

export async function getAllReceipt() {
    const query = `Select Id, Name, Application_No__c, Approved_Amount__c, Beneficiary__c, Beneficiary__r.Name, 
        Date_Approved__c, Date_Received__c, Status__c, Mode_of_Payment__c, Given_Amount__c
        from Receipt__c where Issued_By__c = '${this.props.user.loggedInUser.Account.Id}' ORDER BY Status__c ASC, LastModifiedDate DESC`;
    const json = await fetch(`${spmfcloudFunctionUrl}/query-data`, {
        mode: 'cors',
        body: JSON.stringify({
            query,
            siteToken: this.props.user.siteToken.hash,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': this.props.user.siteToken.hash,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    return json;
}

/**
 * Need to be bind with the main component
 */
export async function updateReceipt() {
    const json = await fetch(`${spmfcloudFunctionUrl}/update-receipt`, {
        mode: 'cors',
        body: JSON.stringify({
            data: {
                ...this.state.modalData,
                Status__c: 'Received by Beneficiary',
            },
            selectedReceipt: this.state.selectedReceipt,
        }),
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'hash-token': this.props.user ? this.props.user.siteToken.hash : this.props.token,
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    return json;
}
export default null;
