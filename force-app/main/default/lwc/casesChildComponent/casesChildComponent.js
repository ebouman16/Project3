import { LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/CaseData.getCases';

export default class CasesChildComponent extends LightningElement {

    colConfigs = [
        {label: "Case Number", fieldName: "CaseNumber", type: "number"},
        {label: "Subject", fieldName: "Subject", type: "text"},
        {label: "Status", fieldName: "Status", type: "text"}
    ];

    caseList = [];
    error; 

    @wire(getCases)
    wired_caseList(result) {
    this.caseList = [];
    if (result.data) {
        this.caseList = result.data;
        this.error = undefined;
    } else if (result.error) {
        this.caseList = undefined;
        this.error = result.error;
        }
    }
        
}