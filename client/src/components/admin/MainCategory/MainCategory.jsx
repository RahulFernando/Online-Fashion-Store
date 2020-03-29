import React, { Component } from 'react';

// bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// components
import MainCategoryInput from './MainCategoryInput'
import MainCategoryList from './MainCategoryList'

// services
import { createMainCategory, getMainCategories, updateMainCategories } from '../../../service/function';

class MainCategory extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            _id: '',
            mainCategoryName: '',
            mainCategories: [],
            mainCategoryErr: '',
            edit: false
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
    
    // render after state updated
    componentDidUpdate(prevProps, prevState) {
        this.componentDidMount()
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
            if (!this.state.edit) {
                createMainCategory(mainCategory).then(res => {
                    if (res.data.success === false) {
                        this.setState({
                            mainCategoryErr: res.data.message
                        })
                    }
                })
            } else {
                updateMainCategories(this.state._id, mainCategory).then(res => {

                })
            }
        }

        this.setState({
            mainCategoryName: ''
        })

    }

    // edit main category
    handleEdit = (_id) => {
        const selectedCategory = this.state.mainCategories.filter(category => category._id === _id);
        this.setState({ 
            _id: _id,
            mainCategoryName: selectedCategory[0].mainCategoryName,
            edit: true
        })

    }

    render() {
        return (
            <Container>
                
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Main Category</h3></Col>
                </Row>
                
                <MainCategoryInput edit={this.state.edit} mainCategoryName={this.state.mainCategoryName} mainCategoryErr={this.state.mainCategoryErr} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <MainCategoryList mainCategories={this.state.mainCategories} handleEdit={this.handleEdit}/>
                
            </Container>
        )
    }
}

export default MainCategory;