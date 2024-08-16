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
import UpdateNotice from "../DashPages/Update/SettingModal/NoticeUpdate/UpdateNotice";
import NoticeDetails from "../DashPages/Details/Member/NoticeDetails/NoticeDetails";
import NoticeDetailsPub from "../DashPages/Details/Publicdetails/NoticeDetailsPub";
import MemberUpdate from "../DashPages/Update/MemberUpdate/MemberUpdate";
import ManagerUpdate from "../DashPages/Update/ManagerUpdate/ManagerUpdate";
import ManagerDetails from "../DashPages/Details/Manager/ManagerDetails";
import MealManage from "../DashPages/Table/MealManage/MealManage";
import AddMealManage from "../DashPages/Form/MealManage/AddMeal";
import AddMeal from "../DashPages/Form/MealManage/AddMeal";
import Mealdetails from "../DashPages/Details/Manager/Meal/Mealdetails";
import AddExtra from "../DashPages/Form/MealManage/AddExtra";
import ExtraMealList from "../DashPages/Table/MealManage/ExtraMeal/ExtraMealList";
import MonthlyReport from "../DashPages/Table/MealManage/MonthlyReport/MonthlyReport";
import MyReport from "../Public/Pages/MyReport";
import AddMyReport from "../Public/PublicForm/AddMyReport";
import MonyhlyReportUpdate from "../DashPages/Update/MonthlyReportUpdate/MonyhlyReportUpdate";
import UpdateReport from "../DashPages/Update/MyReport/UpdateReport";
import ReportDetails from "../DashPages/Details/MyReport/ReportDetails";
import MyreportDetails from "../DashPages/Details/MyReport/MyreportDetails";
import UserList from "../DashPages/Table/User/UserList";
import Adduser from "../DashPages/Form/User/Adduser";

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
        path: "/public/deatailsnotice/:id",
        element:<NoticeDetailsPub/>
      },
      {
        path: "/public/gallery",
        element:<PublicGallery/>
      },

      {
        path: "/public/myreport",
        element:<MyReport/>
      },

      
      {
        path: "/public/updatereport/:id",
        element:<UpdateReport/>
      },

  

      {
        path: "/public/myreportdtails/:id",
        element:<MyreportDetails/>
      },

      {
        path: "/public/addmyreport",
        element:<AddMyReport/>
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
    path: "/dashboard/updatemember/:id",
    element:<MemberUpdate/>
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
  {
    path: "/dashboard/updatemanager/:id",
    element:<ManagerUpdate/>
},

{
  path: "/dashboard/detailsmanager/:id",
  element:<ManagerDetails/>
},

{
  path: "/dashboard/mealmanagelist",
  element:<MealManage/>
},

{
  path: "/dashboard/addmeal",
  element:<AddMeal/>
},

{
  path: "/dashboard/detailsmeal/:id",
  element:<Mealdetails/>
},

{
  path: "/dashboard/addextra",
  element:<AddExtra/>
},

{
  path: "/dashboard/extralist",
  element:<ExtraMealList/>
},

{
  path: "/dashboard/monthlyreport",
  element:<MonthlyReport/>
},

{
  path: "/dashboard/monthlyreportupdate/:id",
  element:<MonyhlyReportUpdate/>
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

{
  path: "/dashboard/updatenotice/:id",
  element:<UpdateNotice/>
},

{
  path: "/dashboard/detailsnotice/:id",
  element:<NoticeDetails/>
},

// repoptr

{
  path: "/dashboard/reportdtails/:id",
  element:<ReportDetails/>
},

// user

{
  path: "/dashboard/userlist",
  element:<UserList/>
},

{
  path: "/dashboard/adduser",
  element:<Adduser/>
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
