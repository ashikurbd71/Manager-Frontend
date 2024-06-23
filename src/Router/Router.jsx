import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddProduct from './../DashPages/Form/AddProduct';
import ProductList from './../DashPages/Table/ProductList';
import ManagerList from './../DashPages/Table/ManagerTable/ManagerList';
import MemberDetails from './../DashPages/Details/Member/MemberDetails';
import DepartmnetList from './../DashPages/Table/Setting/DepartmnetList';
import AddDepartment from './../DashPages/Form/Setting/AddDepartment';
import InstituteList from './../DashPages/Table/Setting/InstituteList';
import AddInstitute from './../DashPages/Form/Setting/AddInstitute';
import SemisterList from './../DashPages/Table/Setting/SemisterList';
import AddSemister from './../DashPages/Form/Setting/AddSemister';
import BloodGroupList from './../DashPages/Table/Setting/BloodGroupList';
import AddBloodGroup from './../DashPages/Form/Setting/AddBloodGroup';
import AddManager from "../DashPages/Form/Manager/AddManager";
import ProfileCard from "../Public/Pages/ProfileCrad";
import PublicLyaout from './../Public/Layout/PublicLyaout';
import PublicNoitice from "../Public/Pages/PublicNoitice";
import PublicGallery from "../Public/Pages/PublicGallery";
import NoticeList from "../DashPages/Table/Notice/NoticeList";
import AddNotice from "../DashPages/Form/Notice/AddNotice";

const router = createBrowserRouter([

  // public

   {

    path: "/public",
    element: <PublicLyaout/>, 
    children:[
      {
        path: "/public/profilecard",
        element:<ProfileCard/>
      },
      {
        path: "/public/notice",
        element:<PublicNoitice/>
      },
      {
        path: "/public/gallery",
        element:<PublicGallery/>
      }

    ]
   }
  ,

  // dashboard


  {
    path: "/",
    element: <Layout />, 
    children:[

      
      {
        path: "/dashboard/memberlist",
        element:<ProductList/>
    },
    {
      path: "/dashboard/addmember",
      element:<AddProduct/>
  },
        {
          path: "/dashboard/memberdeatils/:id",
          element:<MemberDetails/>
      },
      {
        path: "/dashboard/managerlist",
        element:<ManagerList/>
    },
    {
      path: "/dashboard/addmanager",
      element:<AddManager/>
  },


   
  
  // notice

  {
    path: "/dashboard/noticelist",
    element:<NoticeList/>
},
{
  path: "/dashboard/addnotice",
  element:<AddNotice/>
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
