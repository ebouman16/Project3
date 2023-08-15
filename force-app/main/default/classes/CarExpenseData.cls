public with sharing class CarExpenseData {
    @AuraEnabled(cacheable=true)
    public static List<Car_Expense__c> getCarExp(){
        return [SELECT Id, Name, Car_Expense_type__c, Due_Date__c, Paid__c 
        FROM Car_Expense__c ORDER BY Due_Date__C ASC LIMIT 3];
    }
}