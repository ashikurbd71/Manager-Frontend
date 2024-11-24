import { FaRegCommentDots, FaProjectDiagram, FaDownload } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axoissecure from '../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TbMoneybag } from 'react-icons/tb';
import { FaAnglesRight, FaUsers } from 'react-icons/fa6';
import { Helmet } from 'react-helmet';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

    

const Dashboard = () => {

    const [search, setSearch] = useState("");
    const [rowPerPage, setRowPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [stat, setStat] = useState();
    const [active, setActive] = useState(0);


    useEffect(() => {
      if (active === 1) {
        setPage(1);
      } else {
        setPage(1);
      }
    }, [active, search]);

    const { data, refetch } = useQuery({
        queryKey: ["re"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/report/approved-totals`);
    
      
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });

      const { data : addmoney,  } = useQuery({
        queryKey: ["readd"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/mealmanage/total-add-money`);
    
      
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });

      const { data: items = [],  } = useQuery({
        queryKey: [
          "semister",
          search,
          rowPerPage,
          page,
          setPage,
          rowPerPage,
          setRowPerPage,
        ],
        queryFn: async () => {
          try {
            let limit = rowPerPage === "All" ? 100000000 : rowPerPage;
    
            if (active) {
              const res = await axoissecure.get(
                `/mealmanage/search?query=${search}&limit=${limit}&page=${page}`
              );
              setStat(res.data?.meta);
    
              return res?.data?.items;
            } else {
              const res = await axoissecure.get(
                `/mealmanage/search?limit=${limit}&page=${page}`
              );
              setStat(res.data?.meta);
    
              return res?.data?.items;
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });

      
    return (
      <>

      <Helmet><title>Manager || Dashboard</title></Helmet>

      <div className='mt-16 pr-10 flex justify-between '>
      <div className='flex justify-center pl-10 items-center gap-2'>
            <h1 className='lg:text-[20px]  font-medium text-gray-500'>

            <div className='flex  gap-2 text-[#0284C7] font-semibold justify-items-center items-center'>
                    <FaAnglesRight className='text-[#787978]'/>
                <h1>Dashboad</h1>
                   </div>

            </h1>
            </div>
    <Link to={'/dashboard/downloadreports'}>  <h1 className='text-right text-red-600 underline cursor-pointer text-md font-bold'>Download Report</h1></Link>
      </div>


       <div className="flex flex-col justify-center m-24">


         <div className='grid grid-cols-3 gap-10 '>

            
         <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><FaUsers className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{stat?.totalItems || "00"}</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL MEMBER</h1>

</div>
           </div>

         <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><TbMoneybag className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{addmoney?.totalAddMoney || "00"}$</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL MONEY</h1>

</div>
           </div>

           
         <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><MdOutlineAccountBalanceWallet className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{  parseInt(data?.totalTk) - parseInt(addmoney?.totalAddMoney)  || "00"}$</h1>

 <h1 className='fon font-semibold  text-xl'>BALANCE</h1>

</div>
           </div>

           <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
           <div className='flex flex-col gap-3 items-center'>

<div><GiMoneyStack className='text-7xl'/></div>

 <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.totalTk || "00"}$</h1>

 <h1 className='fon font-semibold  text-xl'>TOTAL COST</h1>

</div>
           </div>

           <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
               <div className='flex flex-col gap-3 items-center'>
    
    <div><IoFastFoodOutline className='text-7xl'/></div>
    
     <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.totalMeal || "00"} </h1>
    
     <h1 className='fon font-semibold  text-xl'>TOTAL MEAL</h1>
    
    </div>
               </div>
    
    
    
               
               <div className='bg-white border-dotted border-2 p-5 shadow-lg'>
               <div className='flex flex-col gap-3 items-center'>
    
    <div><GiTakeMyMoney  className='text-7xl'/></div>
    
     <h1 className='text-3xl font-bold text-[#0284C7]'>{data?.extraTk || "00"}$</h1>
    
     <h1 className='fon font-semibold  text-xl'>TOTAL EXTRA</h1>
    
    </div>
               </div>
         

         </div>
      
          
   
          </div>
   
      
  
      
      </>
    );
};

export default Dashboard;