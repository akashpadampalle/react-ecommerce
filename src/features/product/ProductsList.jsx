import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllProductsIds, selectProductById } from './productsSlice'
import "./productsList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons"
import ProductButtons from '../../components/ProductButtons'

const ProductItem = ({ id }) => {
  const product = useSelector(state => selectProductById(state, id))

  return (
    <div className='products-list-item' key={product.id}>
      <div className='products-list-item-img'>
        <img src={product.image} />
      </div>
      <div className='products-list-item-metadata'>

        <div className='products-list-item-title'>
          <h2>{product.title}</h2>
          <p>{product.rating} <FontAwesomeIcon icon={faStar} color='yellow' /> </p>
        </div>

        <p className='products-list-item-description'>
          {
            (product.description.length > 100)
              ? `${product.description.subsrting(0, 100)}...`
              : product.description
          }
        </p>

        <p className='products-list-item-price'>
          ₹ {product.price}
        </p>
        <ProductButtons id={product.id} />
      </div>
    </div>
  )

}

const ProductsList = () => {

  const productsIds = useSelector(selectAllProductsIds)


  if (!productsIds) {
    return (<p className="products-nothing">Noting is available right now</p>)
  }

  return (
    <div className="products-list-container">
      {productsIds.map(id => <ProductItem id={id} key={id} />)}
    </div>
  )
}

export default ProductsList