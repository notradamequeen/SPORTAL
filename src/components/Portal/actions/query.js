export const qApplicationList = 'SELECT Application__r.Name, Application__r.Applicant_Name__c, \
Application__r.No_of_Bene__c, Application__r.Date_of_Application__c, Application__r.Application_Status__c, \
Application__r.Applicant_Race__c, Application__r.Applicant_ID_Type__c, Application__r.Applicant_ID__c, \
Application__r.Applicant_Marital_Status__c, Application__r.City__c, Application__r.Block__c, Application__r.Id, \
Application__r.Street__c, Application__r.Postal__c, Application__r.Flat_Type__c, Application__r.Country__c, \
Application__r.Applicant__r.Home_Phone__c, Application__r.Applicant__r.Contact_Number__c, Application__r.Applicant__r.Mobile_Phone__c, \
Application__r.Applicant__r.Email_Address__c, Application__r.Applicant__r.Other_Marital_Status__c, \
Application__r.Applicant__r.Office_Number__c, Application__r.Applicant__r.Other_Race__c, Application__r.Applicant__r.Other_Nationality__c, \
Application__r.Applicant__r.Gender__c, Application__r.Fail_Eligibility__c, Application__r.Read_in_Portal__c \
FROM Person__c WHERE Applying_to__r.Id =';

export const qBeneficiaryList = 'Select Active__c, Total_Amount_Outstanding__c, Updated_by_Application_Person__r.Name, \
Updated_by_Application_Person__r.Application__r.Applicant_Name__c, Last_Payment_Date__c, Updated_by_Application_Person__r.Application_Status__c, \
Updated_by_Application_Person__r.Full_Name__c, Updated_by_Application_Person__r.Gender__c, ID_type__c, Nationality__c, ID_Number__c, \
Other_Nationality__c, Updated_by_Application_Person__r.Date_of_Birth__c, Race__c, Other_Race__c, \
Updated_by_Application_Person__r.Email_Address__c, Updated_by_Application_Person__r.Current_Level__c, Updated_by_Application_Person__r.Stream__c, \
Updated_by_Application_Person__r.Current_School__r.Name FROM Contact WHERE Updated_by_Application_Person__r.Applying_to__r.Id =';


export const qApplicationDetail = id => `Select Id, Name, Applicant_Name__c, Applicant__r.Name, Applicant_Id_Type__c, Applicant_Id__c,
Applicant_Marital_Status__c, Applicant_Race__c, Applicant_PDPA__c, Date_of_Application__c, Application_Type__c, Application_Status__c,
Source_of_Application__c, Fail_Flat_Type__c, Fail_Per_Cap_Income__c, Fail_Bene_Requirement__c, Total_number_of_household_members__c,
No_of_dependent_youth_children__c, No_of_Bene__c, Approved_Bene__c, Alcoholism__c, Chronic_Illness__c, Cultural_or_personal_belief__c,
Disability__c, Low_Education__c, Gambling_Addiction__c, Temporarily_unfit_for_work__c, Other_Reason__c, Other_Reason_Description__c,
Total_income_earners__c, Total_Monthly_Gross_Income__c, Calculated_per_capita_income__c, Declaration_Completed__c, Media_Coverage_consent__c,
Other_Source_of_Income__c From Application__c Where Id='${id}'`;

export const qApplicationBeneList = "Select Id, Name, Full_Name__c, Applying_to__r.Name, Application_Status__c from Person__c Where RecordType.Name = 'Beneficiary' AND Application__r.Name =";

export const qBeneDetail = "Select Id, Name, Full_Name__c, ID_Type__c, ID_Number__c, Relationship_to_Applicant__c, Application_Date__c, Gender__c, Age_at_Application__c, \
Current_School__r.Name, Race__c, Nationality__c, Marital_Status__c, Applying_to__r.Name, Application_Type__c, Referred_From__c, Referred_Date__c, Application_Status__c, \
Current_Level__c, Referring_Reason__c, Stream__c, Email_Address__c, Religion__c, Date_of_Birth__c, No_of_Receipt__c, No_of_Receipts_Approved__c, Payout_Start__c, Payout_End__c From Person__c Where Name="

export const qApplicationHouList = "Select Id, Name, Full_Name__c, Relationship_to_Applicant__c, main_Applicant__c from Person__c Where RecordType.Name = 'Household Member' AND Application__r.Name =";

export const qFundRequestList = 'Select Name, Partner_Name__r.Name, Year__c, Period__c, Partner_Type__c, Type__c, FR_Status__c From Fund_Request__c Where Partner_Name__r.Id =';

export const qFundRequestDetail = 'Select Name, Partner_Name__c, Year__c, Period__c, Rate_Post_Sec__c, Rate_Primary__c, Rate_Secondary__c, \
Variation__c, Total_Moderated_Amt__c, Record_Type__c, FR_Status__c, Partner_Type__c, Partner_Subtype__c, Type__c, Mode_of_Payment__c, \
Projection_From__c, Projection_To__c, Projected_No_of_Post_Sec_Benes__c, Total_Post_Sec_Receipts__c, Total_Project_No_of_Benes__c, \
Projection_Amount_Post_Sec__c, Projection_Accuracy_P__c, Actual_No_of_Post_Sec_Benes__c, Total_No_of_Actual_Benes__c, \
Request_Amount_Post_Sec__c, SPMF_Moderated_Amount_Post_Sec__c, Bank_Balance_Post_Sec__c, Mod_Amt_Less_A_C_Bal_Post_SecF__c, \
Disbursed_Amount_Post_Sec__c, Approved_Amount_Post_Sec__c, Available_amount_Post_Sec__c From Fund_Request__c Where Name =';

export const qAttachment = 'Select Id, Body, ContentType, Name, ParentId From Attachment Where ParentId =';

export const qBeneReceiptList = 'Select Name, Issued_By__c, Approved_Amount__c, Generated_From__c From Receipt__c Where Generated_From__r.Name ='

export const qReceiptList = 'Select Name, Application_No__c, Issued_By__c, Approved_Amount__c, Given_Amount__c, Beneficiary__c, Status__c \
From Receipt__c Where Issued_By__r.Id =';

export const qReceiptDetail = 'Select Name, Application_No__c, Issued_By__c, Approved_Amount__c, Given_Amount__c, Fund_Request_Item__c, \
Generated_From__c, Mode_of_Payment__c, Cheque_Transaction_No__c, Status__c, For_Level__c, Date_Approved__c, Date_Requested__c, Date_Disbursed__c, \
Scheduled_Payout_Date__c, Date_Received__c From Receipt__c Where Name =';

export const qTerminationList = 'Select Name, Terminated_by_Partner__c, Termination_Date__c, Termination_Status__c, Terminating_Beneficary__c \
From Termination__c Where Terminated_by_Partner__r.Id ='

export const qTerminationDetail = 'Select Name, Terminated_by_Partner__c, Termination_Date__c, Termination_Status__c, Terminating_Beneficary__c, \
Reason_for_Termination__c From Termination__c Where Name =';

export const qTransferList = 'Select Name, Bene_Contact__c, Transferor__c, Transferee__c, Request_Date__c, Transfer_Status__c \
From Transfer__c Where Transferee__r.Id ='

export const qTransferDetail = 'Select Name, Bene_Contact__c, Transferor__c, Transferee__c, Request_Date__c, Transfer_Status__c, \
Current_School__c, Date_Approved_by_Transferor__c, Effective_Date__c, Remarks__c From Transfer__c Where Name =';