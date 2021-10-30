import { api,LightningElement,track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from "lightning/navigation";
// import server side apex class method
import getAccountList from '@salesforce/apex/AccountFilterController.getAccounts';
// import standard toast event
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class customSearch extends NavigationMixin(LightningElement) {
@track accountsRecord;
accNameSearchValue = '';
recordid;
// update searchValue var when input field value change
value;
customformmodal;
industryDisplayValues = [];
@wire(getPicklistValues, {recordTypeId: '0125g000001vEW5', fieldApiName: INDUSTRY_FIELD})
industryValues({data,error}){
    if(data){
        this.industryDisplayValues = data.values.map(value =>{
    return {
        label: value.label,
        value: value.value
    }
    });
    }
}
searchNameKeyword = (event) => {
    this.accNameSearchValue = event.target.value;
}
searchIndustryKeyword = (event) => {
    this.value = event.detail.value;
}
// call apex method on button click
handleSearchKeyword = () => {
    getAccountList({
    accName : this.accNameSearchValue,
    accIndustry: this.value
    })
    .then(result => {
    console.log('result@@ '+result);
    if(result != ''){
        this.accountsRecord = result;
    }
    else{
        this.dispatchEvent(new ShowToastEvent({
        title: 'Records Not found!!!',
        message: 'No Data found',
        variant: 'Error',
        mode: 'sticky'
        }))
        }
        })
}
handleEditFromChild = (event) =>{
    this.customformmodal = true;
    this.recordid = event.detail;
    console.log('recordId--' +this.recordid);
}
handleSuccess = (event) =>{
    this.customformmodal = false;
    this.recordid = event.detail;
    this[NavigationMixin.GenerateUrl]({
    type: 'standard__recordPage',
        attributes: {
        recordId: this.recordid,
        actionName: 'view'
        }
        }).then(url => {
        this.dispatchEvent(new ShowToastEvent({
        title: 'Record Created!',
        message: 'Click {0} to view the result',
        messageData: [{
        label: this.recordid,
        url
        }],
        variant: 'success',
        mode: 'sticky'
        }))
        eval("$A.get('e.force:refreshView').fire();");
        })
        
    }
customHideModalPopup = () =>  {
    this.customformmodal = false;   
}   
}