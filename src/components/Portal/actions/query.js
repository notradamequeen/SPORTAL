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

export const qApplicationDetail = 'Select Applicant_Name__c, Applicant__r.Gender__c, Applicant__r.ID_Type__c, Applicant__r.ID_Number__c, \
Applicant__r.Nationality__c, Applicant__r.Other_Nationality__c, Applicant__r.Date_of_Birth__c, Applicant__r.Race__c, \
Applicant__r.Other_Race__c, Applicant__r.Marital_Status__c, Applicant__r.Other_Marital_Status__c, Street__c, \
Block__c, City__c, Country__c, Flat_Type__c, Unit_Number__c, Applicant__r.Contact_Number__c, Applicant__r.Home_Phone__c, \
Applicant__r.Mobile_Phone__c, Applicant__r.Office_Number__c, Applicant__r.Relationship_to_Applicant__c, Applicant__r.Company__c, \
Applicant__r.Occupation__c, Applicant__r.Employment_Status__c, Applicant__r.Employment_Start_Date__c, Applicant__r.Monthly_Gross_Income__c \
From Application__c Where Name =';

export const qApplicationBeneList = "Select Name, Full_Name__c, Applying_to__r.Name from Person__c Where RecordType.Name = 'Beneficiary' AND Application__r.Name =";

export const qBeneDetail = "Select Name, Full_Name__c, ID_Type__c, ID_Number__c, Relationship_to_Applicant__c, Application_Date__c, Gender__c, Age_at_Application__c, \
Current_School__c, Race__c, Nationality__c, Marital_Status__c, Applying_to__r.Name, Application_Type__c, Referred_From__c, Referred_Date__c, Application_Status__c, \
Current_Level__c, Referring_Reason__c, Stream__c, Email_Address__c From Person__c Where Name ="

export const qApplicationHouList = "Select Name, Full_Name__c, Relationship_to_Applicant__c from Person__c Where RecordType.Name = 'Household Member' AND Application__r.Name =";

export const qFundRequestList = 'Select Name, Partner_Name__r.Name, Year__c, Period__c, Partner_Type__c, Type__c, FR_Status__c From Fund_Request__c Where Partner_Name__r.Id =';

export const qAttachment = 'Select Body, ContentType, Name From Attachment Where ParentId =';
