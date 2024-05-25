import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddProduct from "../Pages/Form/AddProduct";
import ProductList from "../Pages/Table/ProductList";
import ManagerList from "../Pages/Table/ManagerTable/ManagerList";
import MemberDetails from "../DashComponent/Member/MemberDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children:[
        {
            path: "/dashboard",
            element:<ManagerList/>
        },
        {
          path: "/dashboard/memberlist",
          element:<ProductList/>
      },
        {
          path: "/dashboard/addmember",
          element:<AddProduct/>
      },

      {
        path: "/dashboard/memberdetails/:id",
        element:<MemberDetails/>
    }
    ]// Changed the case to match convention and added closing tags
  },
]);

export default router;
