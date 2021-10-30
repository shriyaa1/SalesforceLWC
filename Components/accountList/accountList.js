import { track,api,LightningElement } from 'lwc';
import static_resources from '@salesforce/resourceUrl/AccountFilterImages';
export default class AccountList extends LightningElement {
@api accountsrecord;
recordid;
@track customFormModal = false;
customShowModalPopup = (event) => {
    this.customFormModal = true;
    this.recordid = event.target.value;
    this.handleEdit();
}
handleEdit =() =>{
    const selectedEvent = new CustomEvent('selected', { detail: this.recordid});
    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
}
industryImg = static_resources + '/AccountFilterImages/4.jpg';
}