import React, { Component } from 'react'

//bootstrap
import { ListGroup } from 'react-bootstrap'

// components
import StoreManagerItem from './StoreManagerItem'

export default class StoreManagerList extends Component {
    render() {
        const { storeManagers, handleEdit, handleDelete } = this.props;
        return (
            <ListGroup>
                {storeManagers.reverse().map(storeManager => {
                    return ( <StoreManagerItem key={storeManager._id} username={storeManager.username} handleEdit={() => handleEdit(storeManager._id)} handleDelete={() => handleDelete(storeManager._id)}/> )
                })}
            </ListGroup>
        )
    }
}
