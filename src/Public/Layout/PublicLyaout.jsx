import React from 'react';
import PublicNavber from '../Components/PublicNavber';
import { Outlet } from 'react-router-dom';

const PublicLyaout = () => {
    return (
     <>
     
     <PublicNavber/>

    <div className='lg:px-10 min-h-screen'>
    <Outlet />
    </div>
     
     </>
    );
};

export default PublicLyaout;