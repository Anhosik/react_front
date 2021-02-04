import {action, makeObservable, observable, runInAction, toJS} from 'mobx'

import  axios from 'axios'
import InvoiceModel from '../../model/order/InvoiceModel'
import  InvoiceService from '../../service/order/InvoiceService'


export class InvoiceStore {
    rootStore;
    status;
    message;
    users =[];

    constructor(root){
        makeObservable(this, {
            users:observable,
            status:observable,
            message:observable,
        })
        this.rootStore = root;  

       // fetchData();
        // this.users=[
        //     new InvoiceModel(1, '홍길동', '1111222'), 
        //     new InvoiceModel(2, '김철수', '33333'), 
        //     new InvoiceModel(3, '어우동', '444444'), 
        // ]
    }

    findAll = async (date) => {
        try {
            // var params = {
            //     pageNumber: this.countryData.pageNumber,
            //     searchQuery: this.searchQuery,
            //     isAscending: this.countryData.isAscending
            // };
            // const urlParams = new URLSearchParams(Object.entries(params));

            console.log("----------before --------------");
            const response = await InvoiceService.get(date);
            console.log("----------after --------------");
            console.log(response.data.result);
            runInAction(() => {
                this.users = [];
                if (response.data.result !==null) {
                    this.users = response.data.result;
                }
                this.status = response.data.status;
                this.message = response.data.message;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    // 수정... 
    updateInvoice = async (user) => {
        console.log(user);
        try {
            
           // {compno: 3, aliasesq: 379, receive_name: "선수형", invoice_no: "123"}
            const index= toJS(this.users).findIndex(x=>x.aliasesq===user.aliasesq);
            const response = await InvoiceService.put(user);

            if (response.status === 200) {
                if(response.data.status ==="1"){
                    runInAction(() => {
                        this.users = [
                            ...this.users.slice(0,index),
                            new InvoiceModel(user.compno, user.aliasesq, user.receive_name, user.invoice_no),
                            ...this.users.slice(index+1,this.users.length )
                        ]
                    });
                }
            } 
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };




// https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/
    // async *findAll() {
    //     const data = yield InvoiceRepository.findAll();
    //     this.users = data;
    //     console.log(data);
    //     // if (status === 200) {
    //     //   this.riderList = data.map(rider => new RiderModel(data));
    //     // }
    // }

    // async fetchData()  {
    //     const result = await axios(
    //     "http://localhost:3000/api/hello"
    //     );
    //     this.users =  result.data.users;
    // }
    changeInvoice(id,username, invoiceNo ){
        const index= this.users.findIndex(x=>x.id===id);
        const user = this.users[index];
       
        runInAction(() => {
            this.users = [
                ...this.users.slice(0,index),
                new InvoiceModel(user.id, user.username, invoiceNo),
                ...this.users.slice(index+1,this.users.length )
            ]
        });
    }
}

