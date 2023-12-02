import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectCartItems } from "./cartSlice"
import { selectProductEntities } from "../product/productsSlice"
import { updateCartItem } from "./cartSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import "./cartList.css"
import { useDispatch } from "react-redux"


const CartItem = ({item}) => {

  const dispatch = useDispatch()

  const handleIncrement = (event) => {
    event.preventDefault()
    dispatch( updateCartItem({id: item.id, quantity: +item.quantity + 1}))
  }

  const handleDecrement = (event) => {
    event.preventDefault()
    dispatch( updateCartItem({id: item.id, quantity: item.quantity - 1}))
  }

  return (
    <div className="cart-item-container">
      <img src={item.image} className="cart-item-image"/>
      <div className="cart-item-info">
        <h2 className="cart-item-title">{item.title}</h2>
        <div className="cart-item-totle">Total: <span>₹{Number(item.price * item.quantity).toFixed(2)}</span>  </div>
        <div>
          <button  className="cart-item-button-plus cart-item-buttons" onClick={handleIncrement}>
          <FontAwesomeIcon icon={faPlus} />
          </button>
          <span className="cart-item-quantity">{item.quantity}</span>
          <button className="cart-item-button-minus cart-item-buttons" onClick={handleDecrement}>
          <FontAwesomeIcon  icon={faMinus} />
          </button>
        </div>
      </div>
    </div>
  )
}


const CartList = () => {

  let cartItems = useSelector(selectCartItems)
  const productLookupObject = useSelector(selectProductEntities)

  const renderedCartItems = cartItems.map( item => <CartItem item={{...productLookupObject[item.id] , quantity: item.quantity}} key={item.id} /> )

  return (
    <div>
      {renderedCartItems}
    </div>
  )
}

export default CartList