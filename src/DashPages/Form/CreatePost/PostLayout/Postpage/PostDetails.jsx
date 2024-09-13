import React from 'react';
import useAuth from '../../../../../Provider/UseAuth/useAuth';
import axoissecure from '../../../../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';

const PostDetails = () => {
  const { user } = useAuth();
  
  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  // Find the data corresponding to the logged-in user's email
  const userData = data?.meal?.find((item) => item?.member?.email === user?.userName?.email);

  return (
    <>
      {userData ? (
        <>
          {/* Total Information Section */}
          <div className='grid grid-cols-3 border-b pb-2 mt-3 gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Total Money</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.addMoney}$</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Total Meal</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.totalMeal}</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Total Loan</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.loan}$</h1>
            </div>
          </div>

          {/* Balance and Meal Section */}
          <div className='grid grid-cols-2 border-b pb-2 mt-3 gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Balance</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.blance}$</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Meal</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.eatMeal}</h1>
            </div>
          </div>

          {/* Extra Information Section */}
          <div className='grid grid-cols-2 mt-3 gap-4'>
            {/* <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Extra Money</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.date}$</h1>
            </div> */}
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Total Guest</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.guest}</h1>
            </div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-sm font-semibold text-center text-gray-600'>Last Payment</h1>
              <h1 className='text-sm font-bold text-center text-[#0284C7]'>{userData?.date?.split("T")[0]}</h1>

            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No data found for the user.</p>
      )}
    </>
  );
};

export default PostDetails;
