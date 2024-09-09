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
import Adduser from "../DashPages/Form/User/Adduser"
import ManagerRole from "../DashPages/Table/Manager/ManagerRole";
import AddManagerRole from "../DashPages/Form/Manager/AddManagerRole";
import Login from "../Auth/Login";
import PostDetails from './../DashPages/Form/CreatePost/PostLayout/Postpage/PostDetails';
import PostAbout from "../DashPages/Form/CreatePost/PostLayout/PostAbout";
import Postphoto from "../DashPages/Form/CreatePost/PostLayout/Postpage/Postphoto";
import Bazarlist from "../DashPages/Table/Bazarlist/Bazarlist";
import AddBazarlist from "../DashPages/Form/Bazarlist/AddBazarlist";
import PrivateRoute from "./PrivateRoute";
import Bazarlistdetails from "../DashPages/Details/Bazarlist/Bazarlistdetails";
import UpdateBazarlist from "../DashPages/Update/Bazarlist/UpdateBazarlist";
import AlbumList from "../DashPages/Table/Album/AlbumList";
import AlbumDetails from "../DashPages/Details/AlbumsList/AlbumDetails";
import Information from "../DashPages/Table/Setting/Information";
import AddInformation from "../DashPages/Form/Setting/AddInformation";
import Report from "../DashPages/Table/Report/Report";
import DonwloadReport from "../DashPages/Table/Report/DonwloadReport";
import Dashboard from "../DashPages/Table/Dashboard/Dashboard";
import UpdateInfromation from "../DashPages/Update/Information/UpdateInfromation";

const router = createBrowserRouter([

  // public

   {

    path: "/public",
    element: <PublicLyaout/>, 
    children:[
      {
        path: "/public/profilecard",
        element:<ProfileCard/>,
        children:[{
     path:"/public/profilecard",
     element : <PostDetails/>
        },

        {
          path:"/public/profilecard/about",
          element : <PostAbout/>
             },

             {
              path:"/public/profilecard/photo",
              element : <Postphoto/>
                 }
          


      
      
      ]
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
      },

      // post




    ]
   }
  ,

  // dashboard


  {
    path: "/",
    element: <Layout />, 
    children:[

      {
        path: "/",
        element: <Dashboard/>
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
    path: "/dashboard/reports",
    element:<Report/>
},

{
  path: "/dashboard/downloadreports",
  element:<DonwloadReport/>
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


// bazarlist




{
  path: "/dashboard/bazalist",
  element:<Bazarlist/>
},

{
  path: "/dashboard/updatebazarlist/:id",
  element:<UpdateBazarlist/>
},

{
  path: "/dashboard/albumlist",
  element:<AlbumList/>
},

{
  path: "/dashboard/albumdetails/:id",
  element:<AlbumDetails/>
},

{
  path: "/dashboard/addbazalist",
  element:<AddBazarlist/>
},

{
  path: "/dashboard/bazarlistdeatils/:id",
  element:<Bazarlistdetails/>
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

{
  path: "/dashboard/updateinfo/:id",
  element:<UpdateInfromation/>
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

{
  path: "/dashboard/managerrole",
  element:<ManagerRole/>
},


{
  path: "/dashboard/addmanagerrole",
  element:<AddManagerRole/>},

    // setting

    // departmnet

    {
      path: "/dashboard/setting/departmentlist",
      element:<DepartmnetList/>
    },
    {
      path: "/dashboard/setting/information",
      element:<Information/>
    },
    {
      path: "/dashboard/setting/addinformation",
      element:<AddInformation/>
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

{
path:"/login",
element : <Login/>
}

  
]);

export default router;
