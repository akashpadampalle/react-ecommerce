import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "./productButtons.css"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../features/product/productsSlice"
import { addItemToCart } from "../features/cart/cartSlice"


const ProductButtons = ({id}) => {

    const dispatch = useDispatch()

    const onDeleteClick = () => {
        dispatch(deleteProduct(id))
    }

    const onAddToCartClicked = () => {
        dispatch(addItemToCart({id, quantity: 1}))
    }

    return (
        <div className='product-buttons'>
            <Link className='product-button-edit' to={`/products/edit/${id}`}>
                <FontAwesomeIcon icon={faEdit} /> Edit
            </Link>
            <button className='product-button-delete' onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button className='product-button-cart' onClick={onAddToCartClicked}>
                <FontAwesomeIcon icon={faCartShopping}  /> Add To Cart
            </button>
        </div>
    )
}

export default ProductButtons