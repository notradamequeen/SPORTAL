export const q_POSTAL_CODE_RECORD = 'SELECT Name, LastModifiedById, LastModifiedBy.Name, \
CreatedById, CreatedBy.Name, OwnerId, Owner.Name, Address_Type__c, Block__c, \
Building_Name__c, Country__c, Street__c from Postal_Code__c'

export const q_POSTAL_CODE_RECORD_CONDT = 'SELECT Name, LastModifiedById, LastModifiedBy.Name, \
CreatedById, CreatedBy.Name, OwnerId, Owner.Name, Address_Type__c, Block__c, \
Building_Name__c, Country__c, Street__c from Postal_Code__c WHERE Name LIKE '

export const q_SCHOLL_LIST = "SELECT Name, Id, Partner_SubType__c FROM Account WHERE Partner_Type__c = 'School'"
export const q_APPLYING_TO = "SELECT Name, Id, Partner_SubType__c FROM Account WHERE RecordType.Name = 'School/DA'"
export const q_RECORD_TYPE = "SELECT Name, Id FROM RecordType"

export const q_APPLICATION_IDS = "SELECT Application__r.Name, Application__r.Applicant_Name__c, \
Application__r.No_of_Bene__c, Application__r.Date_of_Application__c, Application__r.Application_Status__c, \
Application__r.Applicant_Race__c, Application__r.Applicant_ID_Type__c, Application__r.Applicant_ID__c, \
Application__r.Applicant_Marital_Status__c, Application__r.City__c, Application__r.Block__c, \
Application__r.Street__c, Application__r.Postal__c, Application__r.Flat_Type__c, Application__r.Country__c, \
Application__r.Applicant__r.Home_Phone__c, Application__r.Applicant__r.Contact_Number__c, Application__r.Applicant__r.Mobile_Phone__c, \
Application__r.Applicant__r.Email_Address__c, Application__r.Applicant__r.Other_Marital_Status__c, \
Application__r.Applicant__r.Office_Number__c, Application__r.Applicant__r.Other_Race__c, Application__r.Applicant__r.Other_Nationality__c, \
Application__r.Applicant__r.Gender__c \
FROM Person__c WHERE Applying_to__r.Id = "

export const q_APPLICATION_DATA = "Select Full_Name__c, Gender__c, ID_type__c, Nationality__c, ID_Number__c, \
Other_Nationality__c, Date_of_Birth__c, Race__c, Marital_Status__c, Other_Race__c, Other_Marital_Status__c, \
Email_Address__c, Contact_Number__c, Home_Phone__c, Mobile_Phone__c FROM Person__c WHERE Main_Applicant__c = True AND Application__r.Name In "


export const q_BENE_DATA = "Select Full_Name__c, Gender__c, ID_type__c, Nationality__c, ID_Number__c, \
Other_Nationality__c, Date_of_Birth__c, Race__c, Marital_Status__c, Other_Race__c, Other_Marital_Status__c, \
Email_Address__c, Contact_Number__c, Home_Phone__c, Mobile_Phone__c FROM Person__c WHERE RecordType.Name = 'Beneficiary' AND Application__r.Name In "