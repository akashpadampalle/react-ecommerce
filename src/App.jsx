import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Cart from './features/cart/Cart'
import ProductsList from './features/product/ProductsList'
import ProductDetails from './features/product/ProductDetails'
import ProudctCreateForm from './features/product/ProductCreateForm'


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
          }
        ]
      },
      { 
        path: "cart", 
        element: <Cart /> 
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App
