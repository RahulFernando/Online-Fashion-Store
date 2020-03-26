import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

import MainCategoryItem from './MainCategoryItem'

export default class MainCategoryList extends Component {
    render() {
        const { mainCategories } = this.props
        return (
            <ListGroup>
                {mainCategories.reverse().map(mainCategory => {
                    return ( <MainCategoryItem key={mainCategory.id} name={mainCategory.mainCategoryName}/> )
                })}
            </ListGroup>
        )
    }
}
