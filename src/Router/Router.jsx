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
import Forbidden from "../Share/Errorpage/Forbidden";
import UpdatePass from "../Share/Updatepassword/UpdatePass";
import UpdatePubliPass from "../Share/Updatepassword/UpdatePubliPass";

const router = createBrowserRouter([

  // public

   {

    path: "/public",
    element: <PrivateRoute roles={["Super Admin","Member"]}><PublicLyaout/> </PrivateRoute>, 
    children:[
      {
        path: "/public/profilecard",
        element: <PrivateRoute roles={["Super Admin","Member"]}><ProfileCard/></PrivateRoute>,
        children:[{
     path:"/public/profilecard",
     element : <PrivateRoute roles={["Super Admin","Member"]}><PostDetails/> </PrivateRoute>
        },

        {
          path:"/public/profilecard/about",
          element : <PrivateRoute roles={["Super Admin","Member"]}> <PostAbout/> </PrivateRoute>
             },

             {
              path:"/public/profilecard/photo",
              element :  <PrivateRoute roles={["Super Admin","Member"]}> <Postphoto/></PrivateRoute>
                 }
          


      
      
      ]
      },
      {
        path: "/public/notice",
        element: <PrivateRoute roles={["Super Admin","Member"]}> <PublicNoitice/></PrivateRoute>
      },
      {
        path: "/public/deatailsnotice/:id",
        element: <PrivateRoute roles={["Super Admin","Member"]}><NoticeDetailsPub/> </PrivateRoute>
      },
      {
        path: "/public/gallery",
        element: <PrivateRoute roles={["Super Admin","Member"]}><PublicGallery/> </PrivateRoute>
      },

      {
        path: "/public/publichnagepass",
        element: <PrivateRoute roles={["Super Admin","Member",]}><UpdatePubliPass/></PrivateRoute>
      },
      {
        path: "/public/myreport",
        element: <PrivateRoute roles={["Super Admin","Member"]}><MyReport/> </PrivateRoute>
      },

      
      {
        path: "/public/updatereport/:id",
        element: <PrivateRoute roles={["Super Admin","Member"]}><UpdateReport/> </PrivateRoute>
      },

  

      {
        path: "/public/myreportdtails/:id",
        element: <PrivateRoute roles={["Super Admin","Member"]}><MyreportDetails/> </PrivateRoute>
      },

      {
        path: "/public/addmyreport",
        element: <PrivateRoute roles={["Super Admin","Member"]}><AddMyReport/> </PrivateRoute>
      },

      // post
      



    ]
   }
  ,

  // dashboard


  {
    path: "/",
    element:  <PrivateRoute roles={["Super Admin","Manager"]}><Layout /></PrivateRoute>,
    children:[

      {
        path: "/",
        element:  <PrivateRoute roles={["Super Admin","Manager"]}><Dashboard/></PrivateRoute>
    },
      {
        path: "/dashboard/memberlist",
        element: <PrivateRoute roles={["Super Admin","Manager"]}><ProductList/></PrivateRoute>
    },
    {
      path: "/dashboard/addmember",
      element:<PrivateRoute roles={["Super Admin","Manager"]}><AddProduct/></PrivateRoute>
  },
  {
    path: "/dashboard/reports",
    element:<PrivateRoute roles={["Super Admin","Manager"]}><Report/></PrivateRoute>
},

{
  path: "/dashboard/downloadreports",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><DonwloadReport/></PrivateRoute>
},
  {
    path: "/dashboard/updatemember/:id",
    element: <PrivateRoute roles={["Super Admin","Manager"]}><MemberUpdate/></PrivateRoute>
},
        {
          path: "/dashboard/memberdeatils/:id",
          element: <PrivateRoute roles={["Super Admin","Manager"]}><MemberDetails/></PrivateRoute>
      },
      {
        path: "/dashboard/managerlist",
        element: <PrivateRoute roles={["Super Admin"]}><ManagerList/></PrivateRoute>
    },
    {
      path: "/dashboard/addmanager",
      element: <PrivateRoute roles={["Super Admin"]}><AddManager/></PrivateRoute>
  },
  {
    path: "/dashboard/updatemanager/:id",
    element: <PrivateRoute roles={["Super Admin"]}><ManagerUpdate/></PrivateRoute>
},

{
  path: "/dashboard/detailsmanager/:id",
  element: <PrivateRoute roles={["Super Admin"]}><ManagerDetails/></PrivateRoute>
},

{
  path: "/dashboard/mealmanagelist",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><MealManage/></PrivateRoute>
},

{
  path: "/dashboard/addmeal",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><AddMeal/></PrivateRoute>
},

{
  path: "/dashboard/detailsmeal/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><Mealdetails/></PrivateRoute>
},

{
  path: "/dashboard/addextra",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><AddExtra/></PrivateRoute>
},

{
  path: "/dashboard/extralist",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><ExtraMealList/> </PrivateRoute>
},

{
  path: "/dashboard/monthlyreport",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><MonthlyReport/></PrivateRoute>
},

{
  path: "/dashboard/monthlyreportupdate/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><MonyhlyReportUpdate/></PrivateRoute>
},


// bazarlist




{
  path: "/dashboard/bazalist",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><Bazarlist/> </PrivateRoute>
},

{
  path: "/dashboard/updatebazarlist/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><UpdateBazarlist/> </PrivateRoute>
},

{
  path: "/dashboard/albumlist",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><AlbumList/>  </PrivateRoute>
},

{
  path: "/dashboard/albumdetails/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><AlbumDetails/> </PrivateRoute>
},

{
  path: "/dashboard/addbazalist",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><AddBazarlist/></PrivateRoute>
},

{
  path: "/dashboard/bazarlistdeatils/:id",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><Bazarlistdetails/> </PrivateRoute>
},




   
  
  // notice

  {
    path: "/dashboard/noticelist",
    element: <PrivateRoute roles={["Super Admin","Manager"]}><NoticeList/></PrivateRoute>
},
{
  path: "/dashboard/addnotice",
  element:<PrivateRoute roles={["Super Admin","Manager"]}><AddNotice/> </PrivateRoute>
},

{
  path: "/dashboard/updatenotice/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><UpdateNotice/></PrivateRoute>
},

{
  path: "/dashboard/detailsnotice/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><NoticeDetails/></PrivateRoute>
},

// repoptr

{
  path: "/dashboard/reportdtails/:id",
  element: <PrivateRoute roles={["Super Admin","Manager"]}><ReportDetails/></PrivateRoute>
},

{
  path: "/dashboard/updateinfo/:id",
  element: <PrivateRoute roles={["Super Admin"]}><UpdateInfromation/></PrivateRoute>
},

{
  path: "/dashboard/chnagepass",
  element: <PrivateRoute roles={["Super Admin","Manager",]}><UpdatePass/></PrivateRoute>
},


// password



// user

{
  path: "/dashboard/userlist",
  element: <PrivateRoute roles={["Manager"]}><UserList/></PrivateRoute>
},

{
  path: "/dashboard/adduser",
  element:<PrivateRoute roles={["Manager"]}><Adduser/> </PrivateRoute>
},

{
  path: "/dashboard/managerrole",
  element: <PrivateRoute roles={["Super Admin"]}><ManagerRole/></PrivateRoute>
},


{
  path: "/dashboard/addmanagerrole",
  element: <PrivateRoute roles={["Super Admin"]}><AddManagerRole/></PrivateRoute> },

    // setting

    // departmnet

    {
      path: "/dashboard/setting/departmentlist",
      element:<PrivateRoute roles={["Super Admin"]}><DepartmnetList/> </PrivateRoute> 
    },
    {
      path: "/dashboard/setting/information",
      element: <PrivateRoute roles={["Super Admin"]}><Information/> </PrivateRoute> 
    },
    {
      path: "/dashboard/setting/addinformation",
      element:<PrivateRoute roles={["Super Admin"]}><AddInformation/> </PrivateRoute> 
    },
    {
      path: "/dashboard/setting/adddepartment",
      element: <PrivateRoute roles={["Super Admin"]}><AddDepartment/> </PrivateRoute> 
    },

    // institute
     
    {
      path: "/dashboard/setting/institutelist",
      element: <PrivateRoute roles={["Super Admin"]}><InstituteList/> </PrivateRoute> 
    },
    {
      path: "/dashboard/setting/addinstitute",
      element: <PrivateRoute roles={["Super Admin"]}><AddInstitute/></PrivateRoute> 
    },

    // semister

    {
      path: "/dashboard/setting/semisterlist",
      element: <PrivateRoute roles={["Super Admin"]}><SemisterList/></PrivateRoute> 
    },
    {
      path: "/dashboard/setting/addsemister",
      element: <PrivateRoute roles={["Super Admin"]}><AddSemister/></PrivateRoute> 
    },

       // BloodGroup

       {
        path: "/dashboard/setting/bloodgrouplist",
        element: <PrivateRoute roles={["Super Admin"]}><BloodGroupList/></PrivateRoute> 
      },
      {
        path: "/dashboard/setting/addbloodgroup",
        element: <PrivateRoute roles={["Super Admin"]}><AddBloodGroup/></PrivateRoute> 
      }

    ]// Changed the case to match convention and added closing tags

  
  },

{
path:"/login",
element : <Login/>
}

,


{
  path:"/forbidden",
  element : <Forbidden/>
  }

  
]);

export default router;
