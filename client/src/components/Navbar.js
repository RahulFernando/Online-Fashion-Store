import React, { Component } from 'react'
import logo from '../images/logo.svg'
import { FaAlignRight, FaHistory, FaSignOutAlt } from 'react-icons/fa'
import Badge from '@material-ui/core/Badge';
import { FaUserAlt } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { isUserAuthenticated } from '../service/function'
import { getUserId } from '../service/function'
import { DisplayPurchaseHistory } from '../service/function'
import { displayWishList } from '../service/function'
import { DisplayCart, logoutUser, getMainCategories } from '../service/function'

export default class Navbar extends Component {

  constructor(props) {
    super(props)


    this.state = {
      isOpen: true,
      cart: [],
      wishList: [],
      purchaseHistory: [],
      categories: [],
      userID: ''
    }
  }


  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }



  componentDidMount() {
    getMainCategories().then(res => {
      this.setState({
        categories: res.data
      })
    })
    setInterval(() => {

      this.state.userID = getUserId();

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
        .catch(function (error) {

          console.log(error);
        })


      displayWishList(this.state.userID)
        .then(res => {
          this.setState({
            wishList: res.data.WishList

          })



        })
        .catch(function (error) {

          console.log(error);
        })





    }, 4500);


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
            <img src={logo} alt="Urban Runes" />
          </Link>
          <button type="button" className="nav-btn"
            onClick={this.handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={this.state.isOpen ?
          "nav-links show-nav" : "nav-links"}>
          <li>
            <Link to="/">HOME</Link>
          </li>
          {this.state.categories.map(category => {
            return (
              <li>
                <Link to={category.mainCategoryName} className="text-uppercase">{category.mainCategoryName}</Link>
              </li>
            )
          })}
          <li>
            <Link to="/user/sign-in">
              <FaUserAlt className="nav-bar-icon" />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <Badge badgeContent={this.state.wishList.length} color="primary">
                <FaHeart className="nav-bar-icon" />
              </Badge>
            </Link>
          </li>
          <li>
            <Link to="/mybag">
              <Badge badgeContent={this.state.cart.length} color="primary">
                <FaCartPlus className="nav-bar-icon" color="secondary" />
              </Badge>
            </Link>
          </li>
          <li>
            <Link to="/purchasehistory">
              <Badge badgeContent={this.state.purchaseHistory.length} color="primary">
                <FaHistory className="nav-bar-icon" />
              </Badge>
            </Link>
          </li>
          <li>
            <Link to="">
              <FaSignOutAlt className="nav-bar-icon" onClick={this.handleLogout} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>;
  }
}
