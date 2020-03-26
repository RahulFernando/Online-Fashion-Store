import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

export default class MainCategoryItem extends Component {
    render() {
        const { name } = this.props
        return (
            <ListGroup.Item action variant="light">
                {name}
            </ListGroup.Item>
        )
    }
}
