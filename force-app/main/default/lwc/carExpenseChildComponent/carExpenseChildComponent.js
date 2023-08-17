import { LightningElement, wire } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Car_Expense__c.Name";
import CAR_EXPENSE_TYPE_FIELD from "@salesforce/schema/Car_Expense__c.Car_Expense_type__c";
import DUE_DATE_FIELD from "@salesforce/schema/Car_Expense__c.Due_Date__c";
import PAID_FIELD from "@salesforce/schema/Car_Expense__c.Paid__c";
import getCarExp from '@salesforce/apex/CarExpenseData.getCarExp';

export default class CarExpenseChildComponent extends LightningElement {
    colConfigs = [
        {label: "Name", fieldName: NAME_FIELD.fieldApiName, type: "text"},
        {label: "Type of Expense", fieldName: CAR_EXPENSE_TYPE_FIELD.fieldApiName, type: "text"},
        {label: "Due Date", fieldName: DUE_DATE_FIELD.fieldApiName, type: "date", 
            typeAttributes:{day:'numeric', month:'short',year:'numeric'}},
        {label: "Paid?", fieldName: PAID_FIELD.fieldApiName, type: "boolean"} 

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