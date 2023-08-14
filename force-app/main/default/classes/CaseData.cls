public with sharing class CaseData {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){
        return [SELECT Id, CaseNumber, Subject, Status FROM Case WHERE Subject!= null LIMIT 3];
    }
}