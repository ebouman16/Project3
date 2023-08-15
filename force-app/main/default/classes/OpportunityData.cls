public with sharing class OpportunityData {
        @AuraEnabled(cacheable=true)
        public static List<Opportunity> getOpportunities(){
            return [SELECT Id, Name, Type_of_Opportunity__c, Monthly_Price_offered__c 
            FROM Opportunity WHERE Monthly_Price_offered__c!= null ORDER BY Name ASC LIMIT 3];
        }
    }