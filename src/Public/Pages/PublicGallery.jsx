import React from 'react';
import axoissecure from '../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';

const PublicGallery = () => {

    const { data: items = [], refetch } = useQuery({
        queryKey: ["image"],
        queryFn: async () => {
          try {
            const res = await axoissecure.get(`/image`);
            return res.data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
      });
    
      console.log(items)


       const i = items?.map((i) => i.profile)

       console.log(i)
      
      
    return (
        <div>
          
        </div>
    );
};

export default PublicGallery;