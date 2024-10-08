import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaPrint, FaUser } from "react-icons/fa6";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axoissecure from "../../../../Hooks/Axoisscure";
import DashCustomNav from "../../../../Share/Formnav";
import { MdContactEmergency, MdDownloading } from "react-icons/md";
import MealEmergency from "../../../Update/MealManager/MealEmergency/MealEmergency";
import GuestMeal from "../../../Update/MealManager/MealEmergency/GuestMeal";
import { usePDF } from "react-to-pdf";
const Mealdetails = () => {
  const [member, setMember] = useState();
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["volunteer"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage/${id}`);
        console.log(res.data);
        setMember(res?.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(member);

  const [loading, setLoading] = useState(false);
  const options = {
    overrides: {
      canvas: {
        useCORS: true,
      },
    },
  };

  const { toPDF, targetRef } = usePDF(
    {
      filename: `mealdetails.pdf`,
    },
    options
  );

  const handleCardDownload = async () => {
    setLoading(true);
    try {
      await toPDF();
    } finally {
      setLoading(false);
    }
  };


  const join = member?.date;
  const parsedDate = new Date(join);

  // Format the date as "14 May 2024"
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const { data: totalitem = [] } = useQuery({
    queryKey: ["extrag"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealmanage/search`);
        return res?.data?.meta?.totalItems;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const { data: extra = [] } = useQuery({
    queryKey: ["extra"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/mealextra/search`);
        return res?.data.meta?.totalExtraMoney;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  console.log(extra);

  console.log(totalitem);

  const extramoney = (extra / totalitem).toFixed(2);

  const [isOpen, setIsOpen] = useState(null);
  const [isOpens, setIsOpens] = useState(null);
  const [update, setUpdate] = useState();

  const openModal = (id) => {
    setIsOpen(true);
    setUpdate(id);
  };
  const openModals = (id) => {
    setIsOpens(true);
    setUpdate(id);
  };

  return (
    <>
      <Helmet>
        <title>Manager || Meal details</title>
      </Helmet>
      <MealEmergency isOpen={isOpen} setIsOpen={setIsOpen} update={update} refetch={refetch} />
      <GuestMeal isOpen={isOpens} setIsOpen={setIsOpens} update={update} refetch={refetch} />
      <DashCustomNav name={"Meal details"} listroute={"/dashboard/mealmanagelist"} />

      <div className="px-10 pb-10">
        <div className="flex  justify-end gap-5 pb-5">
          <div
            onClick={() => openModal(member)}
            className="flex border-2 bg-red-500 rounded-md  cursor-pointer item items-center px-3 py-1 gap-1"
          >
            <h1 className="text-lg font-medium text-white">Loan</h1>
          </div>
          <div
            onClick={() => openModals(member)}
            className="flex border-2 bg-blue-500 rounded-md  cursor-pointer item items-center px-3 py-1 gap-1"
          >
            <h1 className="text-lg font-medium text-white">Guest On</h1>
          </div>

          <div className="flex  rounded-md cursor-pointer item items-center px-3 py-1 gap-1">
          <button
      onClick={() => handleCardDownload()}
      className="flex rounded-md bg-blue-500/80 px-5 py-2 text-white"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span>Printing</span>
          <MdDownloading  className="text-[20px] animate-ping text-white" />
        </div>
      ) : (
        <h1 className='fon font-semibold'>Download</h1>
      )}
    </button>
          </div>
        </div>

        <div ref={targetRef} className=" bg-white min min-h-screen">
          <div className="  items-center p-10 flex"></div>

          <div className="flex flex-col mx-10 gap-1 ">
            <h1 className="text-left text-[24px]  font-semibold  text-[#0284C7]">{member?.member?.name}</h1>

            <h1 className="text-gray-500  -mt-2">{member?.member?.instituteName?.name}</h1>
            <h1 className="text-gray-500  -mt-2">
              {member?.member?.department?.name}({member?.member?.semister?.shortName})
            </h1>
          </div>

          <div className="text-gray-700 p-10">
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Total Money</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.addMoney}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Total Meal</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.totalMeal}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Blance</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.blance}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Meal Eat</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.eatMeal}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Loan</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.loan || 0}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Guest Meal</td>
                    <td className="px-4 py-2 border border-gray-200">{member?.guest || 0}</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Total Extra</td>
                    <td className="px-4 py-2 border border-gray-200">{extramoney || "Loading..."}Tk</td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 font-semibold border border-gray-200">Last Payment</td>
                    <td className="px-4 py-2 border border-gray-200">{formattedDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mealdetails;
