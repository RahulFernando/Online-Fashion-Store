import React, { Component } from 'react'
import logo from '../images/logo.svg'
import {FaAlignRight, FaHistory, FaSignOutAlt} from 'react-icons/fa'
import {FaUserAlt} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import {FaShoppingBag} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ReactSearchBox from 'react-search-box'
import {isUserAuthenticated} from '../service/function'
import {getUserId} from '../service/function'
import {DisplayPurchaseHistory} from '../service/function'
import {displayWishList} from '../service/function'
import {DisplayCart, logoutUser} from '../service/function'

export default class Navbar extends Component {
    state={
        isOpen:false,
        cart:[],
        wishList:[],
        purchaseHistory:[]
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

      componentDidMount(){

        this.state.userID = getUserId();
        console.log(this.state.userID);

        if(this.state.userID){

          
        DisplayPurchaseHistory(this.state.userID)
        .then(res => {
            console.log(res.data)
            this.setState({
              purchaseHistory: res.data
               
            })    
    })
    .catch(err => { console.log(err) })



    DisplayCart(this.state.userID)
    .then(res => {
        console.log(res.data.Cart)
        this.setState({
          cart: res.data.Cart
           
        })
    })
        .catch(function(error){
       
            console.log(error);
        })


        displayWishList(this.state.userID)
        .then(res => {
            this.setState({
              wishList: res.data.WishList
               
            })

            
           
        })
        .catch(function(error){
           
            console.log(error);
        })

        }


      }

    // logout user
    handleLogout = () => {
      logoutUser()
    }

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
              {isUserAuthenticated() ? <sup style={{color:"red"}}>{this.state.wishList.length}</sup> : ""}
                    </Link>
                  </li>
                  <li>
                    <Link to="/mybag">
                      <FaShoppingBag className="nav-bar-icon"/>
                      {isUserAuthenticated() ? <sup style={{color:"red"}}>{this.state.cart.length}</sup> : ""}
                    </Link>
                  </li>
                  <li>
                    <Link to="/purchasehistory">
                      <FaHistory className="nav-bar-icon"/>
                      {isUserAuthenticated() ? <sup style={{color:"red"}}>{this.state.purchaseHistory.length}</sup> : ""}
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <FaSignOutAlt className="nav-bar-icon" onClick={this.handleLogout}/>
                    </Link>
                  </li>
              </ul>
              </div>      
        </nav>;
        
    }
}
