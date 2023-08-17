import { LightningElement, wire } from 'lwc';
import CASE_NUMBER_FIELD from "@salesforce/schema/Case.CaseNumber";
import SUBJECT_FIELD from "@salesforce/schema/Case.Subject";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import getCases from '@salesforce/apex/CaseData.getCases';

export default class CasesChildComponent extends LightningElement {

    colConfigs = [
        {label: "Case Number", fieldName: CASE_NUMBER_FIELD.fieldApiName, type: "text"},
        {label: "Subject", fieldName: SUBJECT_FIELD.fieldApiName, type: "text"},
        {label: "Status", fieldName: STATUS_FIELD.fieldApiName, type: "text"}
    ];

    caseList = [];
    error; 

    @wire(getCases)
    wired_caseList(result) {
    this.caseList = [];
    if (result.data) {
        this.caseList = result.data.map(element=>({
            caseId:element.Id,
            CaseNumber:element.CaseNumber,
            Subject:element.Subject,
            Status:element.Status
        }));
        this.error = undefined;
    } else if (result.error) {
        this.caseList = undefined;
        this.error = result.error;
        }
    }   
}