import {InvoiceStore} from './order/InvoiceStore'


export class RootStore{
    invoiceStore;

    constructor(){
        this.invoiceStore = new InvoiceStore(this);
    }
}