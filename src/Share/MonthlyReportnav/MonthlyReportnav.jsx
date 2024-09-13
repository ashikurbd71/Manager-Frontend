import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { TbTableExport } from "react-icons/tb";
import { Link } from 'react-router-dom';
const MonthlyReportnav = ({route,setSearch,setActive,handleAllExport}) => {
    return (
       <>
          <div className="mx-6 px-5 mt-4 pt-2 lg:h-[60px] bg-white">
  <div className="flex justify-between flex-col lg:flex-row items-center">

    
  <div>
  <div className="relative pb-3 lg:pb-0 rounded-lg">
        <input  onChange={(e) => {
                    setSearch(e.target.value);
                     setActive(1);
          
                  }} className="peer border-[#0284C7] rounded-lg border-2 bg-transparent px-4 w-[300px] lg:w-[500px] py-2 text-gray-500 focus:outline-none" type="text" placeholder="" id="navigate_ui_input_33" />
        <label className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-gray-500 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] peer-focus:bg-sky-300 peer-focus:text-xs peer-focus:text-sky-800 dark:peer-focus:text-sky-400 dark:peer-focus:bg-[#0F172A]" htmlFor="navigate_ui_input_33">
          Search
        </label>
      </div>
</div>

    <div className="flex items-center pb-3 lg:pb-0 lg:gap-10 gap-3">

 
   

<button onClick={handleAllExport} className=' text-sm  '>

<div className='flex text-white bg-[#0284C7] border-2 px-2 py-2 rounded-md gap-1 justify-items-center items-center'>
 
Export
<TbTableExport className=''/>
</div>

</button>

     
    </div>


  </div>
    </div>
       
       </>
    );
};

export default MonthlyReportnav;