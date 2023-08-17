import { LightningElement, wire } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import TYPE_FIELD from "@salesforce/schema/Opportunity.Type_of_Opportunity__c";
import OFFER_FIELD from "@salesforce/schema/Opportunity.Monthly_Price_offered__c";
import getOpportunities from '@salesforce/apex/OpportunityData.getOpportunities';

export default class OpportunityChildComponent extends LightningElement {

    colConfigs = [
        {label: "Name", fieldName: NAME_FIELD.fieldApiName, type: "text"},
        {label: "Type", fieldName: TYPE_FIELD.fieldApiName , type: "picklist"},
        {label: "Offer", fieldName: OFFER_FIELD.fieldApiName, type: "currency"}
    ];

    oppList = [];
    error;

    @wire(getOpportunities)
    wired_oppList(result) {
    this.oppList = [];
    if (result.data) {
        this.oppList = result.data.map(element=>({
            opportunityId:element.Id,
            Name:element.Name,
            Type_of_Opportunity__c:element.Type_of_Opportunity__c,
            Monthly_Price_offered__c:element.Monthly_Price_offered__c
        }));
        this.error = undefined;
    } else if (result.error) {
        this.oppList = undefined;
        this.error = result.error;
        }
    }
    }