import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectProductById } from "./productsSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import ProductButtons from "../../components/ProductButtons"
import "./productDetails.css"

const ProductDetails = () => {

  const { id } = useParams()
  const product = useSelector(state => selectProductById(state, id))

  if (!product) {
    return (
      <p className="no-product">Mentioned Product is not avaiable currently</p>
    )
  }



  return (
    <div className="product-details-container">
      <div className="product-details-img"><img src={product.image} /></div>
      <div className='products-details-title'>
        <h2>{product.title}</h2>
        <p>{product.rating} <FontAwesomeIcon icon={faStar} color='yellow' /> </p>
      </div>
      <p className="product-details-description">{product.description}</p>
      <p className='products-details-price'>
        ₹ {product.price}
      </p>
      <ProductButtons id={product.id} />
    </div>
  )
}

export default ProductDetails