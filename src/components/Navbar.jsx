import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectCartItems } from '../features/cart/cartSlice'
import profileImg from "../assets/profile.jpg"
import "./navbar.css"

const Navbar = () => {

    const cartCount = useSelector(selectCartItems).length

    return (
        <>
            <nav className="navbar-container">
                <section className="navbar-link-container">
                    <NavLink className="navbar-link" to={'/'}>Ecommers</NavLink>
                    <NavLink className="navbar-link" to={'/products'}>All Products</NavLink>
                    <NavLink className="navbar-link" to={'/products/create'}>Add Product</NavLink>
                    <NavLink className="navbar-link navbar-cart-link" to={'/cart'}>
                        cart  <span className='navbar-cart-count'>{cartCount}</span>
                    </NavLink>
                </section>
                <section>
                    <div className="navbar-user-container">
                        <span className='navbar-user-name'>Dummy User</span>
                        <img src={profileImg} className='navbar-user-img'/>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Navbar