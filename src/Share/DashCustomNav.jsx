import React from 'react';

const DashCustomNav = ({name}) => {
    return (
        <div className='flex justify-between pb-6 items-center'>
            
            <div className='flex justify-center items-center gap-2'>
            <span className='text-[22px] font-semibold text-sky-600'>Amer Dokan : </span> <h1 className='text-[22px] font-semibold text-gray-500'>{name}</h1>
            </div>
            <div className=''>
                <button className='px-6 rounded-md py-2 border-2 border-sky-600 text-black'>

                    Back list

                </button>
                </div>            
        </div>
    );
};

export default DashCustomNav;