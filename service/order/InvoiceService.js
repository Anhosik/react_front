import  axios from 'axios'
import InvoiceModel from '../../model/order/InvoiceModel'
import {URL} from '../../configs/config'
class InvoiceService{
    SUB_URL = "invoice";

    get = async (date) => {
        return await axios.get(`${URL}/${this.SUB_URL}/${date}`);
    }

    post = async (model) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(webApiUrl, options);
        const response = await fetch(request);
        return response;
    }
    put = async (model) => {
        return await axios.put(`${URL}/${this.SUB_URL}`, {
                "compno":model.compno,
                "aliasesq":model.aliasesq,
                "invoice_no":model.invoice_no
          });
    }

    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(webApiUrl + "/" + id, options);
        const response = await fetch(request);
        return response;
    }

}

// 싱글톤으로 생성.. 
export default new InvoiceService();