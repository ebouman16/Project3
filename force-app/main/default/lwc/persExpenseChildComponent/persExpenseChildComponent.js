import { LightningElement, wire } from 'lwc';
import getPersExp from '@salesforce/apex/PersExpenseData.getPersExp';

export default class PersExpenseChildComponent extends LightningElement {
    colConfigs = [
        {label: "Name", fieldName: "Name", type: "text"},
        {label: "Type of Expense", fieldName: "Personal_Expense_type__c", type: "text"},
        {label: "Due Date", fieldName: "Due_Date__c", type: "date", 
            typeAttributes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: "Paid__c", type: "boolean"} 

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