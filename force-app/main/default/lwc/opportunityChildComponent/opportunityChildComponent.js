import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityData.getOpportunities';

export default class OpportunityChildComponent extends LightningElement {

    colConfigs = [
        {label: "Name", fieldName: "Name", type: "text"},
        {label: "Type", fieldName: "Type_of_Opportunity__c", type: "picklist"},
        {label: "Offer", fieldName: "Monthly_Price_offered__c", type: "currency"}
    ];

oppList = [];
error;

@wire(getOpportunities)
wired_oppList(result) {
this.oppList = [];
if (result.data) {
    this.oppList = result.data;
    this.error = undefined;
} else if (result.error) {
    this.oppList = undefined;
    this.error = result.error;
    }
}
}