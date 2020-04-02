import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

import SubCategoryItem from './SubCategoryItem'

export default class SubCategoryList extends Component {
    render() {
        const { subCategories, handleEdit, handleDelete } = this.props
        return (
            <ListGroup>
                {subCategories.reverse().map(subCategory => {
                    return ( <SubCategoryItem key={subCategory._id} name={subCategory.subCategoryName} handleEdit={() => handleEdit(subCategory._id)} handleDelete={() => handleDelete(subCategory._id)}/> )
                })}
            </ListGroup>
        )
    }
}
