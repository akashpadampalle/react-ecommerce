import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./productButtons.css"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../features/product/productsSlice"
import { addItemToCart } from "../features/cart/cartSlice"


const ProductButtons = ({id}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEditClick = (event) => {
        event.stopPropagation()
        navigate(`/products/edit/${id}`)
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        dispatch(deleteProduct(id))
    }

    const onAddToCartClicked = (event) => {
        event.stopPropagation()
        dispatch(addItemToCart({id, quantity: 1}))
    }

    return (
        <div className='product-buttons'>
            <button className='product-button-edit' onClick={onEditClick}>
                <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
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