import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

export default class MainCategoryItem extends Component {
    render() {
        const { name, handleEdit } = this.props
        return (
            <ListGroup.Item className="d-flex justify-content-between my-2" action variant="light">
                {name}
                <span className="mx-2 text-dark" onClick={handleEdit}><i className="far fa-edit"></i></span>
            </ListGroup.Item>
        )
    }
}
