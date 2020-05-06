import React, { Component } from 'react'

// bootstrap
import { Container, Row, Col } from 'react-bootstrap'

// components
import StoreManagerInput from './StoreManagerInput'
import StoreManagerList from './StoreManagerList'

// service
import { addNewStoreManager, getAllStoreManagers, updateStoreManager, deleteStoreManagers } from '../../../service/function'

// check email
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export default class StoreManager extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id: '',
            username: '',
            email: '',
            password: '',
            storeManagers: [],
            edit: false,
            serverErr: '',
            errors: {
                username: '',
                email: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    componentDidMount() {
        getAllStoreManagers().then(res => {
            this.setState({
                storeManagers: res.data
            })
        })
    }

    // handle change
    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        let errors = this.state.errors;

        // check validation
        switch(name) {
            case 'username':
                errors.username = value.length < 3 ? 'Username must be 3 character long!' : '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid';
                break;
            case 'password':
                errors.password = value.length < 3 ? 'Password must be 3 character long!' : '';
                break;
            default:
                break;
        }
    
        this.setState({
            errors,
            [name] : value
        })
    }
    
    // validate form
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => {
            val.length > 0 && (valid = false)
        });
        return valid;
    }
    
    // handle submit
    handleSubmit = (e) => {
        e.preventDefault();
        const storeManager = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        if (this.validate(this.state.errors)) {
            if (!this.state.edit) {
                addNewStoreManager(storeManager).then(res => {
                    if (res.data.success === false) {
                        this.setState({
                            serverErr: res.data.message
                        }) 
                        setInterval(() => {
                            this.setState({serverErr: ''})
                        }, 2000); // set timeout for error  
                    }
                    
                    getAllStoreManagers().then(res => {
                        this.setState({
                            storeManagers: res.data
                        })
                    })
                })
            } else {
                updateStoreManager(this.state._id, storeManager).then(res => {
                    getAllStoreManagers().then(res => {
                        this.setState({
                            storeManagers: res.data
                        })
                    })
                })
            }
        }
        this.setState({
            username: '',
            email: '',
            password: '',
            edit: false
        })
    }

    // handle edit
    handleEdit = (_id) => {
        const selectedStoreManager = this.state.storeManagers.filter(storeManager => storeManager._id === _id);
        this.setState({
            _id: _id,
            username: selectedStoreManager[0].username,
            email: selectedStoreManager[0].email,
            password: selectedStoreManager[0].password,
            edit: true
        })
    }

    // delete store managers
    handleDelete = (_id) => {
        deleteStoreManagers(_id).then(res => {
            getAllStoreManagers().then(res => {
                this.setState({
                    storeManagers: res.data
                })
            })
        })
    }
    
    render() {
        return (
            <Container className="manager">
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Store Manager</h3></Col>
                </Row>
                <StoreManagerInput username={this.state.username} email={this.state.email} password={this.state.password} errors={this.state.errors} serverErr={this.state.serverErr} edit={this.state.edit} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <StoreManagerList storeManagers={this.state.storeManagers} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
            </Container>
        )
    }
}
