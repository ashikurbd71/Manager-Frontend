import React, { useEffect, useState } from 'react';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getMember } from '../../../Share/Api/SelectorApi/settingselector';
import axoissecure from '../../../Hooks/Axoisscure';

// Validation Schema
const Schema = Yup.object().shape({
  
});

const UpdateRoom = ({ isOpen, setIsOpen, update, refetch }) => {

    console.log(update)
  const [institute, setInstitute] = useState([]);
  const InstituteOptions =
    institute?.map((singleData) => ({
      value: singleData?.id,
      label: singleData?.name,
    })) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMember();
        setInstitute(data?.member || []);
      } catch (error) {
        console.error('Error fetching member types:', error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentOne: null,
      studentTwo: null,
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axoissecure.patch(`/rooms/${update?.id}`, {

            studentOne:{
            id: values?.studentOne && parseInt(values?.studentOne),
          } || null ,

        
        });
        toast.success('Room-1 Booked successfully!');
        refetch();
        setIsOpen(false);
      } catch (error) {
        toast.error('Error updating room');
        console.error('Error updating room:', error);
      }
    },
  });

  
  const handleCancel = () => {
    formik.resetForm();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[400px] bg-white p-4 rounded-md"
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Student One */}
            <div className="flex flex-col">
              <label htmlFor="studentOne" className="pb-1 text-[#726f6f]">
                1. Room-1{' '}
             
              </label>
              <Select
                placeholder="Select Student"
                id="studentOne"
                options={InstituteOptions}
                onChange={(option) => formik.setFieldValue("studentOne", option.value)}
                onBlur={formik.handleBlur}
                value={InstituteOptions.find(option => option.value === formik.values.studentOne)}
              />
             
            </div>

            {/* Student Two */}
           
          </div>

          <div className="flex justify-end items-center gap-4 mt-6">
            <button
              className="w-[100px] bg-[#0284C7] text-white rounded-lg h-[40px] font-bold"
              type="submit"
            >
              Book
            </button>
            <button
              className="w-[100px] bg-red-600 text-white rounded-lg h-[40px] font-semibold"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateRoom;
