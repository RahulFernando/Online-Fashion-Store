import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import {Container,Card,ListGroup} from 'react-bootstrap'
import {FindItem} from '../service/function'

export default class DisplayProduct extends Component {

    constructor(props){
        super(props);

        this.state = {

            itemName:'',
            mainCategory:'',
            subCategory:'',
            qty:0,
            description:'',
            price:0



        };
    }

    componentDidMount(){

        FindItem(this.props.match.params.id)
        .then(response => {
            this.setState({

                itemName: response.data.itemName,
                mainCategory: response.data.mainCategory,
                subCategory: response.data.subCategory,
                qty:response.data.qty,
                description:response.data.description,
                price:response.data.price
        
            })
        })
        .catch(function(error){
            console.log(error);
        })
       
}

    render() {
        return (

            <>
            <Navbar/>
            <Container fluid="md">
               
             <Card style={{ width: '18rem'}}>
                <Card.Header>Item Information </Card.Header>
                <ListGroup variant="flush">
                        <ListGroup.Item><b> Name </b> : {this.state.itemName}</ListGroup.Item>
                        <ListGroup.Item><b> Main Category </b> : {this.state.mainCategory}</ListGroup.Item>
                        <ListGroup.Item><b> Sub Category </b> : {this.state.subCategory}</ListGroup.Item>
                        <ListGroup.Item><b> Available Quantity </b> : {this.state.qty}</ListGroup.Item>
                        <ListGroup.Item><b> Description </b> : {this.state.description}</ListGroup.Item>
                        <ListGroup.Item><b> Price </b> : {this.state.price}</ListGroup.Item>
                 </ListGroup>
                </Card>
           
            </Container>
            </>
        )
    }
}
