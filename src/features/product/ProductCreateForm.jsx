import { useEffect, useRef, useState } from "react"
import { addProduct } from "./productsSlice"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./productCreateForm.css"

const ProudctCreateForm = () => {

  const dispatch = useDispatch()
  const titleRef = useRef()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onPriceChange = (event) => {
    setPrice(+event.target.value)
  }

  const onRatingChange = (event) => {
    setRating(+event.target.value)
  }

  const onImageUrlChange = (event) => {
    setImageUrl(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const productObject = {
      title,
      description,
      price,
      rating: rating % 5,
      image: imageUrl
    }


    dispatch(addProduct(productObject)).unwrap()
      .then(() => {
        setTitle('')
        setDescription('')
        setPrice(0)
        setRating(0)
        setImageUrl('')

        navigate('/products')
      })

  }

  return (
    <div>
      <h2 className="product-create-title">Add New Product</h2>
      <form className="product-create-form" onSubmit={onFormSubmit}>
        <div className="product-input-container">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Product name..."
            ref={titleRef}
            value={title}
            onChange={onTitleChange}
            required
          />
        </div>

        <div className="product-input-container">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={onPriceChange}
            required
          />
        </div>

        <div className="product-input-container">
          <label htmlFor="rating">Rating:</label>
          <input 
          type="number" 
          id="rating" 
          value={rating} 
          onChange={onRatingChange} 
          required 
          />
        </div>

        <div className="product-input-container">
          <label htmlFor="imageUrl">ImageUrl:</label>
          <input 
          type="url" 
          id="imageUrl" 
          placeholder="http://image.com"
          value={imageUrl} 
          onChange={onImageUrlChange} 
          required 
          />
        </div>
        <div className="product-input-container">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows={10}
            value={description}
            onChange={onDescriptionChange}
            placeholder="Enter Description of Product...."
            required
          >
          </textarea>
        </div>
        <button className="add-product-button"><FontAwesomeIcon icon={faSave} />Add</button>
      </form>
    </div>
  )
}

export default ProudctCreateForm