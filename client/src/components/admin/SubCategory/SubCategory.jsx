import React, { Component } from 'react';

// bootstrap
import { Container, Row, Col } from 'react-bootstrap';

import { getMainCategories, createSubCategory, getSubCategories, updateSubCategory, deleteSubCategories } from '../../../service/function'

// components
import SubCategoryInput from './SubCategoryInput';
import SubCategoryList from './SubCategoryList'

class SubCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id: '',
            mainCategories: [],
            subCategoryName: '',
            main_category_id: '',
            subCategoryErr: '',
            subCategories: [],
            edit: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // fetch main categories and sub categories after rendered
    componentDidMount() {
        getMainCategories().then(res => {
            this.setState({
                mainCategories: res.data
            })
        })

        getSubCategories().then(res => {
            this.setState({
                subCategories: res.data
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
        let subCategoryErr = ''
    
        if (!this.state.subCategoryName) {
            subCategoryErr = 'You need to provide valid category name'
        }
    
        if (subCategoryErr) {
            this.setState({subCategoryErr});
            setTimeout(() => {
                this.setState({ subCategoryErr: '' })
            }, 2000); // set time interval for error message
            return false;
        }
    
        return true;
    }

    // submit form
    handleSubmit = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        const subCategory = {
            subCategoryName: this.state.subCategoryName,
            main_category_id: this.state.main_category_id
        }
        console.log(this.main_category_id)

        if (isValid) {
            if (!this.state.edit) {
                createSubCategory(subCategory).then(res => {
                    if (res.data.success === false) {
                        this.setState({
                            subCategoryErr: res.data.message
                        })
                        setTimeout(() => {
                            this.setState({ subCategoryErr: '' })
                        }, 2000); // set time interval for error message
                    } else {
                        getSubCategories().then(res => {
                            this.setState({
                                subCategories: res.data,
                            })
                        })
                    }
                })
            } else {
                updateSubCategory(this.state._id, subCategory).then(res => {
                    getSubCategories().then(res => {
                        this.setState({
                            subCategories: res.data,
                            subCategoryName: '',
                            main_category_id: '',
                            edit: false 
                        })
                    })
                })
            }
        }

    }

    // edit sub category
    handleEdit = (_id) => {
        const selectedCategory = this.state.subCategories.filter(category => category._id === _id);
        this.setState({ 
            _id: _id,
            main_category_id: selectedCategory[0].main_category._id,
            subCategoryName: selectedCategory[0].subCategoryName,
            edit: true
        })
    }

    // handle sub category deletion
    handleDelete = (_id) => {
        if (window.confirm("Do you need to remove this category? This category may contain some products")) {
            deleteSubCategories(_id).then(res => {
                getSubCategories().then(res => {
                    this.setState({
                        subCategories: res.data
                    })
                })
            });
        }
    }

    render() {
        return (
            <Container className="sub-category">
                
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Sub Category</h3></Col>
                </Row>

                <SubCategoryInput subCategoryName={this.state.subCategoryName} subCategoryErr={this.state.subCategoryErr}  mainCategories={this.state.mainCategories} main_category_id={this.state.main_category_id} edit={this.state.edit} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <SubCategoryList subCategories={this.state.subCategories} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>

            </Container>
        )
    }
}

export default SubCategory;