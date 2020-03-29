import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

import MainCategoryItem from './MainCategoryItem'
import MainCategory from './MainCategory'

export default class MainCategoryList extends Component {
    render() {
        const { mainCategories, handleEdit } = this.props
        return (
            <ListGroup>
                {mainCategories.reverse().map(mainCategory => {
                    return ( <MainCategoryItem key={mainCategory._id} name={mainCategory.mainCategoryName} handleEdit={() => handleEdit(mainCategory._id)}/> )
                })}
            </ListGroup>
        )
    }
}
