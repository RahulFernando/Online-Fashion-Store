import React, { Component } from 'react'

import { ListGroup } from 'react-bootstrap'

export default class SubCategoryItem extends Component {
    render() {
        const { name, handleEdit, handleDelete } = this.props
        return (
            <ListGroup.Item className="d-flex justify-content-between my-2" action variant="light">
                <h6>{name}</h6>
                <div>
                    <span className="mx-2 text-dark" onClick={handleEdit} ><i className="far fa-edit"></i></span>
                    <span className="mx-2 text-danger" onClick={handleDelete}><i className="fa fa-trash"></i></span>
                </div>
            </ListGroup.Item>
        )
    }
}
