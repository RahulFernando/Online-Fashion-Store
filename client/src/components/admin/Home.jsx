import React, { Component } from 'react'

import { Container, Table } from "react-bootstrap";

import { getMainCategories, getSubCategories } from '../../service/function'


export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             mainCategories: [],
             subCategories: []
        }
    }

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
    
    
    render() {
        return (
            <Container className="home">
                <h5 className="text-secondary">Main Categories</h5>
                <Table striped bordered hover>
                    <tbody>
                        {/* <tr> */}
                        {this.state.mainCategories.map(mainCategory => {
                            return <tr key={mainCategory._id}><td>{mainCategory.mainCategoryName}</td></tr>
                        })}
                        {/* </tr> */}
                    </tbody>
                </Table>
                <h5 className="text-secondary">Sub Categories</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Sub category</th>
                        <th>Main category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr> */}
                        {this.state.subCategories.map(subCategory => {
                            return <tr key={subCategory._id}><td>{subCategory.subCategoryName}</td><td>{subCategory.main_category.mainCategoryName}</td></tr>
                        })}
                        {/* </tr> */}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
