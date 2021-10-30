import {wire,track, api,LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountFilterController.getAccounts';
import { NavigationMixin } from "lightning/navigation";
export default class AccountEditModal extends NavigationMixin(LightningElement) {
@api recordid;
handlesuccess = () =>{
    const selectedEvent = new CustomEvent('successevent', { detail: this.recordid});
    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
}
customhidemodalpopup = () =>{
    this.dispatchEvent(new CustomEvent('customhidemodalpopup'));
}
handleResetForm = () => {
    const inputFields = this.template.querySelectorAll('lightning-input-field');
    if(inputFields){
        inputFields.forEach(field => {
            field.reset();
        })
    }
}
}