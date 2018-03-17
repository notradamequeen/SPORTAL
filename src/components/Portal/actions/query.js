export const qApplicationList = 'SELECT Application__r.Name, Application__r.Applicant_Name__c, \
Application__r.No_of_Bene__c, Application__r.Date_of_Application__c, Application__r.Application_Status__c, \
Application__r.Applicant_Race__c, Application__r.Applicant_ID_Type__c, Application__r.Applicant_ID__c, \
Application__r.Applicant_Marital_Status__c, Application__r.City__c, Application__r.Block__c, \
Application__r.Street__c, Application__r.Postal__c, Application__r.Flat_Type__c, Application__r.Country__c, \
Application__r.Applicant__r.Home_Phone__c, Application__r.Applicant__r.Contact_Number__c, Application__r.Applicant__r.Mobile_Phone__c, \
Application__r.Applicant__r.Email_Address__c, Application__r.Applicant__r.Other_Marital_Status__c, \
Application__r.Applicant__r.Office_Number__c, Application__r.Applicant__r.Other_Race__c, Application__r.Applicant__r.Other_Nationality__c, \
Application__r.Applicant__r.Gender__c \
FROM Person__c WHERE Applying_to__r.Id =';

export const qBeneficiaryList = 'Select Active__c, Total_Amount_Outstanding__c, Updated_by_Application_Person__r.Name, \
Updated_by_Application_Person__r.Application__r.Applicant_Name__c, Last_Payment_Date__c, \
Updated_by_Application_Person__r.Full_Name__c, Updated_by_Application_Person__r.Gender__c, ID_type__c, Nationality__c, ID_Number__c, \
Other_Nationality__c, Updated_by_Application_Person__r.Date_of_Birth__c, Race__c, Other_Race__c, \
Updated_by_Application_Person__r.Email_Address__c, Updated_by_Application_Person__r.Current_Level__c, Updated_by_Application_Person__r.Stream__c, \
Updated_by_Application_Person__r.Current_School__r.Name FROM Contact WHERE Updated_by_Application_Person__r.Applying_to__r.Id =';
