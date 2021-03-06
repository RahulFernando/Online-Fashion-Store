import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import PurchaseHistoryListItem from './PuchaseHistoryListItem'
import Navbar from '../../components/Navbar'
import {getUserId} from '../../service/function'
import {DisplayPurchaseHistory} from '../../service/function'

export default class PurchaseHistory extends Component {
    
    constructor(props){
        super(props);


        this.state = {

            userID:'',
            PaymentHistory:[]

        };
    }

    componentDidMount(){
        
        this.state.userID = getUserId();
        console.log(this.state.userID);

        DisplayPurchaseHistory(this.state.userID)
        .then(res => {
            console.log(res.data)
            this.setState({
                PaymentHistory: res.data
               
            })    
    })
    .catch(err => { console.log(err) })
}

    DisplayPaymentHistory(){

        

        return this.state.PaymentHistory.map(PaymentHistoryDetail => {
            return <PurchaseHistoryListItem HistoryDetail={PaymentHistoryDetail}/>;
          })

           
    }


    render() {
        return (
            <>
            <Navbar/>
            <Container>

            <Card border="primary"  header style={{"marginTop": 50}}><center><h2>Payment History</h2></center></Card>

            <Table striped bordered hover size="sm" style={{"marginTop": 10}}>
                    <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                    </thead>
                            <tbody>
                            {this.DisplayPaymentHistory()}
                          </tbody>
               </Table>

               {this.state.PaymentHistory.length ==  0  ? <h3 style={{textAlign: "center",color:"blue"}}><b>No any purchase history record ! </b></h3>  : ""}
               
               </Container>
               </>
        )
    }
}
