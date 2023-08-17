import { LightningElement, wire } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Personal_Expense__c.Name";
import PERSONAL_EXPENSE_TYPE_FIELD from "@salesforce/schema/Personal_Expense__c.Personal_Expense_type__c";
import DUE_DATE_FIELD from "@salesforce/schema/Personal_Expense__c.Due_Date__c";
import PAID_FIELD from "@salesforce/schema/Personal_Expense__c.Paid__c";
import getPersExp from '@salesforce/apex/PersExpenseData.getPersExp';

export default class PersExpenseChildComponent extends LightningElement {
     colConfigs = [
        {label: "Name", fieldName: NAME_FIELD.fieldApiName, type: "text"},
        {label: "Type of Expense", fieldName: PERSONAL_EXPENSE_TYPE_FIELD.fieldApiName, type: "text"},
        {label: "Due Date", fieldName: DUE_DATE_FIELD.fieldApiName, type: "date", 
            typeAttributes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: PAID_FIELD.fieldApiName, type: "boolean"} 

    ]; 

    persExpList = [];
    error; 

    @wire(getPersExp)
    wired_persExpList(result) {
    this.persExpList = [];
    if (result.data) {
        this.persExpList = result.data.map(element=>({
            homeExpId:element.Id,
            Name:element.Name,
            Personal_Expense_type__c:element.Personal_Expense_type__c,
            Due_Date__c:element.Due_Date__c,
            Paid__c:element.Paid__c
        }));
        this.error = undefined;
    } else if (result.error) {
        this.persExpList = undefined;
        this.error = result.error;
        }
    }   
}