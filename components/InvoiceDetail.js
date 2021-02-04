import React, { useEffect } from 'react';
import {Table, Container,Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import {useStores} from '../store/Context'
const InvoiceDetail =  ({user, index}) => {
     const[invoice_no, setInvoice_no] =  React.useState(user.invoice_no);
     const [compno , setCompNo] = React.useState(user.compno);
     const [seq , setSeq] = React.useState(user.aliasesq);
     const [isReadOnly, setReadOnly]= React.useState(true);
     const {invoiceStore} = useStores();

     useEffect(()=>{
         console.log(user.invoice_no?.length);
     },[])

     const onBlurHandler = (e)=>{
        setReadOnly(true);
     }

     const sendInvoiceHandler = ()=>{
         try{
        if(invoice_no?.length ===0 ){
            alert('송장번호를 입력하세요')
           return false; 
        }
        
        console.log(user.invoice_no, "--------" , invoice_no);
        if(user.invoice_no !== invoice_no){
            
            invoiceStore.updateInvoice( {...user, invoice_no });
        }
        }catch(ex){
            alert(ex.message);
        }
        return true;
     }

     
    return (         
            <tr>
                <th scope="row">{index+1}</th>
                <td><Input type="text" name="text"  id="userName" value={user.receive_name} readOnly  placeholder="name placeholder" /></td>
                <td><Input type="text" name="text" id="invoiceNo" readOnly ={isReadOnly} onFocus={ (e)=>setReadOnly(false) }  onBlur={onBlurHandler}  value={invoice_no} placeholder="invoice placeholder" onChange={(e)=> setInvoice_no(e.target.value) } /></td>
                <td> {  (user.invoice_no?.length ===0) ? '미전송' :'전송'  }   </td>
                <td> <Button  onClick={ sendInvoiceHandler  } >전송 </Button>  </td>
            </tr>
     
     );
};
 
export default InvoiceDetail;