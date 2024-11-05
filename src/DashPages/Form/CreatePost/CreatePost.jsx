import React, { useState, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';
import useAuth from '../../../Provider/UseAuth/useAuth';

const CreatePost = ({ isOpen, setIsOpen, update, refetch }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { user, isLoading: userLoading } = useAuth();
  const image = `${import.meta.env.VITE_API_URL}${"/"}${user?.userName?.profile}`;
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
    
     
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await axoissecure.post("/image", {
          

          user : user?.email,
          date: new Date().toISOString(),
          title: values.title,
          profile: values.image,





              
        },{    headers: {
          "Content-Type": "multipart/form-data",
        }});
        console.log("Product added successfully:", values);
        toast.success("Post Upload successfully!");
        setIsOpen(false)
        resetForm();
      } catch (error) {
        toast.error("Error adding Manager");
        console.error("Error adding Manager:", error);
      }
    },
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
      formik.setFieldValue('image', file);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    formik.setFieldValue('image', null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
      formik.setFieldValue('image', file);
    }
  };

  const handleCancel = () => {
    formik.handleReset();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:w-[400px]"
      >
        <div className=" p-4">
  
  <div className='flex lg:justify-between  items-center'>
    <div></div>
    <div onClick={handleCancel} className='text-3xl text-gray-500 font-semibold lg:pb-0 pb-5 cursor-pointer'>x</div>
  </div>

          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={image}
              alt="Profile"
            />
            <div>
            <div className="ml-3 tetx-md text-gray-600 font-bold">
            {user?.userName?.name}
            </div>
            </div>
          </div>
          <div className="mt-4">
          <textarea
  className="w-full border-2 rounded-md border-gray-200 h-20 text-sm text-gray-700 focus:outline-none"
  placeholder="What's on your mind?"
  name="title"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.title}
/>

          </div>
          <div
            className="flex pt-4 flex-col border-2 p-4 rounded-md"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <label htmlFor="image" className="pb-1 text-[#726f6f]">
              Add Photo
            </label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex justify-center items-center h-32 bg-gray-100 border-2 border-gray-300 rounded-md">
              <MdOutlineFileUpload
                className="text-gray-500 text-4xl cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
            </div>
            {imagePreview && (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-[80px] h-[60px] object-cover border-2 border-dashed"
                />
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            )}
          </div>
         
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              Post
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePost;
