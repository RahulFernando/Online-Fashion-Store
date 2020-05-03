import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import  {fieldset} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {ConfirmPayment} from '../../service/function'
import {getPaymentId} from '../../service/function'
import {AddToPurchaseHistory} from '../../service/function'
import {DeleteCartListItem} from '../../service/function'
 

export default class Payment extends Component {

    constructor(props){
        super(props);

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);

        this.state ={
            selectedOption: 'Cash',
            paymentId:''

        }
    }

    handleOptionChange(e) {

        this.setState({
          selectedOption: e.target.value
        });

      }

    onsubmit(e){

        e.preventDefault();

        console.log('You have selected:', this.state.selectedOption);
        console.log(this.props.Items);
        console.log(this.props.userId);
        console.log(new Date());

        

        console.log('You have selected:', this.state.selectedOption);

          const payment = {
            userId: this.props.userId,
            paymentMethod:this.state.selectedOption,
            date: Date.now()
        }

        ConfirmPayment(payment)
        .then(res => {console.log(res.data._id)

            this.props.Items.forEach((item) => {
        
                AddToPurchaseHistory(res.data._id,item.id,item.quantity)
                DeleteCartListItem(this.props.userId,item.id)
               
            })
   } )
   .catch(err => { console.log(err) })
   
              
            
        this.props.bringBackToInitialState();

        
    }
    
    render() {

        const {userId,Items,bringBackToInitialState} = this.props
        
        return (
            <Card>
  <Card.Header>Payment Form</Card.Header>
  <Card.Body>

  <Form onSubmit={this.onsubmit}>
            <fieldset>
            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                     Payment Methods
                </Form.Label>
                     <Col sm={10}>
                             <Form.Check
                                    type="radio"
                                    label="Pay By cash"
                                    name="formHorizontalRadios"
                                     id="formHorizontalRadios1"
                                     checked = {this.state.selectedOption === 'Cash'}
                                     value ="Cash"
                                     onChange={this.handleOptionChange}
                             />
                            <Form.Check
                                     type="radio"
                                     label="Pay By card"
                                     name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    checked = {this.state.selectedOption === 'Card'}
                                    value ="Card"
                                    onChange={this.handleOptionChange}
                            />
        
                             </Col>
                </Form.Group>
            </fieldset>
            <Button variant="success" type="submit">Confirm Payment</Button>
        </Form>

  </Card.Body>
</Card>
           
        )
    }
}
