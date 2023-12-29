import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import ProductsList from './features/product/ProductsList'
import ProductDetails from './features/product/ProductDetails'
import ProudctCreateForm from './features/product/ProductCreateForm'
import ProductEditForm from './features/product/ProductEditForm'
import CartList from './features/cart/CartList'
import Welcome from './components/Welcome'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      {
        path: "/",
        element: <Welcome />
      },
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
  return <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
}

export default App
