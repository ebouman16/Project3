public with sharing class PersExpenseData {
    @AuraEnabled(cacheable=true)
    public static List<Personal_Expense__c> getPersExp(){
        return [SELECT Id, Name, Personal_Expense_type__c, Due_Date__c, Paid__c 
        FROM Personal_Expense__c ORDER BY Due_Date__C ASC LIMIT 3];
    }
}