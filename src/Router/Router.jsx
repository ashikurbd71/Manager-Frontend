import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddProduct from "../Pages/Form/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children:[
        {
            path: "/",
            element:<AddProduct/>  
        }
    ]// Changed the case to match convention and added closing tags
  },
]);

export default router;
