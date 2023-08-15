import { LightningElement, wire } from 'lwc';
import getCarExp from '@salesforce/apex/CarExpenseData.getCarExp';

export default class CarExpenseChildComponent extends LightningElement {
    colConfigs = [
        {label: "Name", fieldName: "Name", type: "text"},
        {label: "Type of Expense", fieldName: "Car_Expense_type__c", type: "text"},
        {label: "Due Date", fieldName: "Due_Date__c", type: "date", 
            typeAttriutes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: "Paid__c", type: "boolean"} 

    ];

    carExpList = [];
    error; 

    @wire(getCarExp)
    wired_carExpList(result) {
    this.carExpList = [];
    if (result.data) {
        this.carExpList = result.data.map(element=>({
            carExpId:element.Id,
            Name:element.Name,
            Car_Expense_type__c:element.Car_Expense_type__c,
            Due_Date__c:element.Due_Date__c,
            Paid__c:element.Paid__c
        }));
        this.error = undefined;
    } else if (result.error) {
        this.carExpList = undefined;
        this.error = result.error;
        }
    }   
}