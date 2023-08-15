public with sharing class HomeExpenseData {
    @AuraEnabled(cacheable=true)
    public static List<Home_Expense__c> getHomeExp(){
        return [SELECT Id, Name, Home_Expense_type__c, Due_Date__c, Paid__c 
        FROM Home_Expense__c LIMIT 3];
    }
}