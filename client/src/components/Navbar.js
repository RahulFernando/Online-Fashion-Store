import React, { Component } from 'react'
import logo from '../images/logo.svg'
import {FaAlignRight, FaHistory} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import {FaShoppingBag} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ReactSearchBox from 'react-search-box'


export default class Navbar extends Component {
    state={
        isOpen:false
    }
    handleToggle = () =>{
        this.setState({isOpen:!this.state.isOpen})
    }

    data = [
        {
          key: 'john',
          value: 'John Doe',
        },
        {
          key: 'jane',
          value: 'Jane Doe',
        },
        {
          key: 'mary',
          value: 'Mary Phillips',
        },
        {
          key: 'robert',
          value: 'Robert',
        },
        {
          key: 'karius',
          value: 'Karius',
        },
      ]

    render() {
        return <nav className="navbar">
          <div className="nav-center">
              <div className="nav-header">
                <Link to="/">
                    <img src={logo} alt="Urban Runes"/>
                </Link>
                <button type="button" className="nav-btn" 
                onClick={this.handleToggle}>
                    <FaAlignRight className="nav-icon"/>
                </button>  
              </div>
              <ul className={this.state.isOpen ? 
              "nav-links show-nav" : "nav-links"}>
                  <li>
                      <Link to="/">HOME</Link>
                  </li>
                  <li>
                      <Link to="/men">MEN</Link>
                  </li>
                  <li>
                      <Link to="/women">WOMEN</Link>
                  </li>
                  <li>
                      <Link to="/kids">KIDS</Link>
                  </li>
                  <li>
                  <ReactSearchBox placeholder="Search"
                    value=""
                    data={this.data}
                    callback={record => console.log(record)}/>
                  </li>
                  <li>
                    <Link to="/user/sign-in">
                      <FaUserAlt className="nav-bar-icon"/>
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <FaHeart className="nav-bar-icon"/>
                    </Link>
                  </li>
                  <li>
                    <Link to="/mybag">
                      <FaShoppingBag className="nav-bar-icon"/>
                    </Link>
                  </li>
                  <li>
                    <Link to="/purchasehistory">
                      <FaHistory className="nav-bar-icon"/>
                    </Link>
                  </li>
              </ul>
              </div>      
        </nav>;
        
    }
}
