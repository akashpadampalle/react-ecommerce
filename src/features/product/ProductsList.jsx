import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllProductsIds, selectProductById } from './productsSlice'
import "./productsList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"
import ProductButtons from '../../components/ProductButtons'
import { useNavigate } from 'react-router-dom'


const ProductItem = ({ id }) => {
  const product = useSelector(state => selectProductById(state, id))
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/products/${product.id}`)} className='products-list-item' key={product.id}>
      <div className='products-list-item-img'>
        <img src={product.image} loading='lazy' />
      </div>
      <div className='products-list-item-metadata'>

        <div className='products-list-item-title'>
          <h2>{product.title}</h2>
          <p>{product.rating} <FontAwesomeIcon icon={faStar} color='yellow' /> </p>
        </div>

        <p className='products-list-item-description'>
          {
            (product.description.length > 100)
              ? `${product.description.substring(0, 100)}...`
              : product.description
          }
        </p>

        <p className='products-list-item-price'>
          ₹ {Number(product.price).toFixed(2)}
        </p>
        <ProductButtons id={product.id} />
      </div>
    </div>
  )

}

const ProductsList = () => {

  const productsIds = useSelector(selectAllProductsIds)

  if (!productsIds?.length) {
    return (<p className="products-nothing">Noting is available right now</p>)
  }

  return (
    <div className="products-list-container">
      {productsIds.map(id => <ProductItem id={id} key={id} />)}
    </div>
  )
}

export default ProductsList