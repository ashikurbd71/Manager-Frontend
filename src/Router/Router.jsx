import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddProduct from "../Pages/Form/AddProduct";
import ProductList from "../Pages/Table/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children:[
        {
            path: "/",
            element:<AddProduct/>  
        },

        {
          path: "/productlist",
          element:<ProductList/> 
      }
    ]// Changed the case to match convention and added closing tags
  },
]);

export default router;
