import React, { Component } from 'react'
import { Accordion, Card, Button, Container, Form } from 'react-bootstrap'


const items = [
    {
        "_id": 1,
        "name": "Men"
    },
    {
        "_id": 2,
        "name": "Women"
    },
    {
        "_id": 3,
        "name": "Kids"
    }
]


export default class CheckBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
          
          category: false,
          
        }
    }

        onCategoryChange = () => {
            // let target = e.target;
            // let value = target.value;
      
            this.setState(prevState => ({
              // [e.target.label]: e.target.checked
              category: !prevState.size
            }))
          }


    // handleToggle = (type) => {
    //     const currentIndex = Checked.indexOf(type);
    //     const newChecked = [...Checked];
    //     if (currentIndex === -1) {
    //         newChecked.push(type)
    //     } else {
    //         newChecked.splice(currentIndex, 1)
    //     }

    //     setChecked(newChecked)
    // }
    

    render() {

        return (
            <Container>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <i className="fas fa-filter"></i>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {['checkbox'].map((type) => (
                                    <div key={`custom-inline-${type}`} className="mb-3" checked={this.state.category} onChange={this.onCategoryChange} >
                                        <Form.Check
                                            custom
                                            inline
                                            label="Men"
                                            type={type}
                                            id={`custom-inline-${type}-1`}
                                        />
                                        <Form.Check
                                            custom
                                            inline
                                            label="Women"
                                            type={type}
                                            id={`custom-inline-${type}-2`}
                                        />
                                        <Form.Check
                                            custom
                                            inline
                                            label="Kids"
                                            type={type}
                                            id={`custom-inline-${type}-3`}
                                        />
                                    </div>
                                ))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Container>
        )
    }
}

