import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddProduct from "../Pages/Form/AddProduct";
import ProductList from "../Pages/Table/ProductList";
import ManagerList from "../Pages/Table/ManagerTable/ManagerList";
import MemberDetails from "../DashComponent/Member/MemberDetails";
import DepartmnetList from "../Pages/Table/Setting/DepartmnetList";
import AddDepartment from "../Pages/Form/Setting/AddDepartment";
import InstituteList from "../Pages/Table/Setting/InstituteList";
import AddInstitute from "../Pages/Form/Setting/AddInstitute";
import SemisterList from "../Pages/Table/Setting/SemisterList";
import AddSemister from "../Pages/Form/Setting/AddSemister";
import BloodGroupList from "../Pages/Table/Setting/BloodGroupList";
import AddBloodGroup from "../Pages/Form/Setting/AddBloodGroup";

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
    },

    // setting

    // departmnet

    {
      path: "/dashboard/setting/departmentlist",
      element:<DepartmnetList/>
    },
    {
      path: "/dashboard/setting/adddepartment",
      element:<AddDepartment/>
    },

    // institute
     
    {
      path: "/dashboard/setting/institutelist",
      element:<InstituteList/>
    },
    {
      path: "/dashboard/setting/addinstitute",
      element:<AddInstitute/>
    },

    // semister

    {
      path: "/dashboard/setting/semisterlist",
      element:<SemisterList/>
    },
    {
      path: "/dashboard/setting/addsemister",
      element:<AddSemister/>
    },

       // BloodGroup

       {
        path: "/dashboard/setting/bloodgrouplist",
        element:<BloodGroupList/>
      },
      {
        path: "/dashboard/setting/addbloodgroup",
        element:<AddBloodGroup/>
      }

    ]// Changed the case to match convention and added closing tags
  },
]);

export default router;
