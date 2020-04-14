import React, { Component } from 'react'

// bootstrap
import { Container, Row, Col } from 'react-bootstrap'

// components
import StoreManagerInput from './StoreManagerInput'
import StoreManagerList from './StoreManagerList'

// service
import { addNewStoreManager, getAllStoreManagers, updateStoreManager, deleteStoreManagers } from '../../../service/function'

export default class StoreManager extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id: '',
            username: '',
            email: '',
            password: '',
            usernameErr: '',
            emailErr: '',
            passwordErr: '',
            serverErr: '',
            storeManagers: [],
            edit: false
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
    
        this.setState({
            [name] : value
        })
    }
    
    // validate form
    validate = () => {
        let usernameErr = '';
        let emailErr = '';
        let passwordErr = '';
    
        if (!this.state.username) {
            usernameErr = 'You need to provide valid username';
        }else if (!this.state.email) {
            emailErr = 'You need to provide valid email address';
        }else if (!this.state.password) {
            passwordErr = 'Password cannot be empty';
        }
    
        if (usernameErr) {
            this.setState({usernameErr});
            setTimeout(() => {
                this.setState({ usernameErr: '' })
            }, 2000); // set time interval for error message
            return false;
        }else if (emailErr) {
            this.setState({emailErr});
            setTimeout(() => {
                this.setState({ emailErr: '' })
            }, 2000); // set time interval for error message
            return false;
        }else if (passwordErr) {
            this.setState({usernameErr});
            setTimeout(() => {
                this.setState({ passwordErr: '' })
            }, 2000); // set time interval for error message
            return false;
        }
    
        return true;
    }
    
    // handle submit
    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        const storeManager = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        if (isValid) {
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
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Store Manager</h3></Col>
                </Row>
                <StoreManagerInput username={this.state.username} email={this.state.email} password={this.state.password} usernameErr={this.state.usernameErr} emailErr={this.emailErr} passwordErr={this.passwordErr} edit={this.state.edit} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <StoreManagerList storeManagers={this.state.storeManagers} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
            </Container>
        )
    }
}
