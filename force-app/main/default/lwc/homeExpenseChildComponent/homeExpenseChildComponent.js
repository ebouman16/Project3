import { LightningElement, wire } from 'lwc';
import getHomeExp from '@salesforce/apex/HomeExpenseData.getHomeExp';

export default class HomeExpenseChildComponent extends LightningElement {
    colConfigs = [
        {label: "Name", fieldName: "Name", type: "text"},
        {label: "Type of Expense", fieldName: "Home_Expense_type__c", type: "text"},
        {label: "Due Date", fieldName: "Due_Date__c", type: "date", 
            typeAttriutes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: "Paid__c", type: "boolean"} 

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