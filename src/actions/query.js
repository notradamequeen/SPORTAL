export const q_POSTAL_CODE_RECORD = 'SELECT Name, LastModifiedById, LastModifiedBy.Name, \
CreatedById, CreatedBy.Name, OwnerId, Owner.Name, Address_Type__c, Block__c, \
Building_Name__c, Country__c, Street__c from Postal_Code__c'

export const q_SCHOLL_LIST = "SELECT Name, Id, Partner_SubType__c FROM Account WHERE RecordType.Name = 'School/DA'"
export const q_RECORD_TYPE = "SELECT Name, Id FROM RecordType"
