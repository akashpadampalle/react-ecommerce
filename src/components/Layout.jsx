import "./layout.css"
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPoducts } from '../features/product/productsSlice'
import { useEffect } from 'react'
import { fetchCart } from '../features/cart/cartSlice'

const Layout = () => {

    const productsStatus = useSelector(state => state.products.status)
    const cartStatus = useSelector(state => state.cart.status)
    const dispatch = useDispatch()

    useEffect(() => {
        if (productsStatus === "idle") {
            dispatch(fetchPoducts())
        }

        if (cartStatus === "idle") {
            dispatch(fetchCart())
        }

    }, [])


    if (productsStatus === "loading" || cartStatus === "loading") {
        return <p>Loading....</p>
    }

    return (
        <div className='layout-container'>
            <Navbar />
            <main className="main-container">
                <Outlet />
            </main>

        </div>

    )
}

export default Layout