import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Router/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from "./Provider/Provider.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>

  
  <Provider>

  <RouterProvider router={router} />
 

  </Provider>

 
       <ToastContainer />
     </QueryClientProvider>
   
  </React.StrictMode>
);
