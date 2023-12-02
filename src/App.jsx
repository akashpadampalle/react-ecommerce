import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import ProductsList from './features/product/ProductsList'
import ProductDetails from './features/product/ProductDetails'
import ProudctCreateForm from './features/product/ProductCreateForm'
import ProductEditForm from './features/product/ProductEditForm'
import CartList from './features/cart/CartList'


const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />, 
    children: [
      {
        path: "products", 
        children: [
          { 
            index: true, 
            element: <ProductsList /> 
          },
          { 
            path: "create", 
            element: <ProudctCreateForm /> 
          },
          { 
            path: ":id", 
            element: <ProductDetails /> 
          },
          {
            path: "edit/:id",
            element: <ProductEditForm />
          }
        ]
      },
      { 
        path: "cart", 
        element: <CartList /> 
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App
