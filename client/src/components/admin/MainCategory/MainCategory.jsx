import React, { Component } from 'react';

// bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// components
import MainCategoryInput from './MainCategoryInput'
import MainCategoryList from './MainCategoryList'

// services
import { createMainCategory, getMainCategories } from '../../../service/function';

class MainCategory extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             mainCategoryName: '',
             mainCategories: [],
             mainCategoryErr: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // get all categories
    componentDidMount() {
        getMainCategories().then(res => {
            this.setState({
                mainCategories: res.data
            })
        })
    } 
    
    componentDidUpdate(prevProps, prevState) {
        getMainCategories().then(res => {
            this.setState({
                mainCategories: res.data
            })
        })
    }
    
    
    // handle change
    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

    this.setState({
      [name] : value
    })
    }

    // validate form
    validate = () => {
        let mainCategoryErr = ''

        if (!this.state.mainCategoryName) {
            mainCategoryErr = 'You need to provide valid category name'
        }

        if (mainCategoryErr) {
            this.setState({mainCategoryErr});
            return false;
        }

        return true;
    }

    // submit form
    handleSubmit = (e) => {
        e.preventDefault();

        const isValid = this.validate();
        const mainCategory = {
            mainCategoryName: this.state.mainCategoryName
        }

        if (isValid) {
            createMainCategory(mainCategory).then(res => {
                if (res.data.success === false) {
                    this.setState({
                        mainCategoryErr: res.data.message
                    })
                }
            })
        }

        this.setState({
            mainCategoryName: ''
        })

    }

    render() {
        return (
            <Container>
                
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Main Category</h3></Col>
                </Row>
                
                <MainCategoryInput mainCategoryName={this.state.mainCategoryName} mainCategoryErr={this.state.mainCategoryErr} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <MainCategoryList mainCategories={this.state.mainCategories}/>
                
            </Container>
        )
    }
}

export default MainCategory;