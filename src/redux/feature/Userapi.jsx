import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from './auth';
import axoissecure from '../../Hooks/Axoisscure';


const Userapi = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/users/get/single-user`);
        return res.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setUser(data));
    }
  }, [data, isLoading, refetch, dispatch]);

 

  return (
    <div>
      <h1>User Information</h1>
     
    </div>
  );
};

export default Userapi;
