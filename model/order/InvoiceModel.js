
 class InvoiceModel{
    compno;
    aliasesq;
    receive_name;
    invoice_no;

    constructor(compno, aliasesq, receive_name, invoice_no){
        this.compno = compno;
        this.aliasesq = aliasesq;
        this.receive_name = receive_name;
        this.invoice_no = invoice_no;
    }
}
export default InvoiceModel;


