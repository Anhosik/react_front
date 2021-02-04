import React, {useState, useReducer, useEffect,useCallback,useRef} from 'react';

import Head from 'next/head'
import { observer, inject } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container,Col,Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker, { registerLocale } from "react-datepicker";

import ko from 'date-fns/locale/ko'

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import InvoiceDetail from '../../components/InvoiceDetail'

import {useStores} from '../../store/Context'
import AppLayout from '../../components/AppLayout'
 

import moment from 'moment';

// const initialState = {
//     users: []
//   };

//   function reducer(state, action) {
//     switch (action.type) {
//         case 'REQUEST_INVOICE':
//             console.log(action.value);
//           return {
//             ...state,
//            users: state.users.concat(action.user)
            
//           };
//         default:
//           return state;
//       }
//   }

const InvoiceList=() => {
   
    const[isLoading , setLoading] = useState(false);
    

    const {invoiceStore} = useStores();

  
    const [startDate, setStartDate] = useState(new Date());


    // const onLoading = useCallback( data => {
    //     dispatch({
    //       type: 'REQUEST_INVOICE',
    //       users: data
    //     });
    //   }, []);

    // useEffect(() => {
    //     // fetchData란 비동기함수 생성
    //     const fetchData = async () => {
    //         setLoading(true);
    //       const result = await axios(
    //         "http://localhost:3000/api/hello"
    //       );
          
    //      setTimeout(() => {
    //         setState(result.data);
    //         setLoading(false);   
    //      }, 1000);

          
    //     };
    //     // 실행함으로써 데이타를 fetching합니다.
    //     fetchData();
    //   }, []);

    return ( 

      <AppLayout>
        <Container className="App">
        <Container>
        <Row>
        <Col xs="6" sm="4"></Col>
        <Col xs="6" sm="4">
        <DatePicker 
        locale={ko}	// 언어설정 기본값은 영어
        dateFormat="yyyy-MM-dd"	// 날짜 형식 설정
        selected={startDate} onChange={date => setStartDate(date)} />

        </Col>
        <Col sm="4"><Button onClick={()=>{ 
          invoiceStore.findAll( moment(startDate).format("YYYYMMDD")  ) }}  >조회</Button></Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, order: 2, offset: 1 }}>
        
            <Form>  
            
              {invoiceStore.status===0  ? (
                  <div className="loading">
                      데이타가 없습니다.
                  </div>
                  ) : (
                  <>
                    
                  
                  <Table size="sm" style={{margin:10}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>송장번호</th>
                        <th>상태</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      {invoiceStore.users.map((user, index) => (
                          <InvoiceDetail key={index} user={user} index={index}/>
                      ))}

                    </tbody>
                    </Table>

                  </>
                  )}
              
          </Form>
        </Col>
      </Row>
      </Container>

         


      </Container>
      </AppLayout>
     );
};
 
export default observer(InvoiceList);