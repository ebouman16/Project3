import { LightningElement, wire } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Home_Expense__c.Name";
import HOME_EXPENSE_TYPE_FIELD from "@salesforce/schema/Home_Expense__c.Home_Expense_type__c";
import DUE_DATE_FIELD from "@salesforce/schema/Home_Expense__c.Due_Date__c";
import PAID_FIELD from "@salesforce/schema/Home_Expense__c.Paid__c";
import getHomeExp from '@salesforce/apex/HomeExpenseData.getHomeExp';

export default class HomeExpenseChildComponent extends LightningElement {
    colConfigs = [
        {label: "Name", fieldName: NAME_FIELD.fieldApiName, type: "text"},
        {label: "Type of Expense", fieldName: HOME_EXPENSE_TYPE_FIELD.fieldApiName, type: "text"},
        {label: "Due Date", fieldName: DUE_DATE_FIELD.fieldApiName, type: "date", 
            typeAttributes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: PAID_FIELD.fieldApiName, type: "boolean"}
    ];

    homeExpList = [];
    error; 

    @wire(getHomeExp)
    wired_homeExpList(result) {
    this.homeExpList = [];
    if (result.data) {
        this.homeExpList = result.data.map(element=>({
            homeExpId:element.Id,
            Name:element.Name,
            Home_Expense_type__c:element.Home_Expense_type__c,
            Due_Date__c:element.Due_Date__c,
            Paid__c:element.Paid__c
        }));
        this.error = undefined;
    } else if (result.error) {
        this.homeExpList = undefined;
        this.error = result.error;
        }
    }   
}