import React, { useState, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import Modal from '../../../Share/CustomModal/CustomModal';
import { useFormik } from 'formik';
import axoissecure from '../../../Hooks/Axoisscure';
import { toast } from 'react-toastify';

const CreatePost = ({ isOpen, setIsOpen, update, refetch }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      images: [],
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append('email', 'ovi@gmail.com');
        formData.append('date', new Date().toISOString());
        formData.append('title', values.title);
        
       formData.append(`profile`, values.images);
        
      
        
        
        
        
        
        
        
        
        

      
  
        // Make the POST request with FormData
        await axoissecure.post('/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast.success('Post uploaded successfully!');
        resetForm(); // Reset the form after successful submission
        // refetch();
        setIsOpen(false);
      } catch (error) {
        toast.error('Error uploading images');
        console.error('Error uploading images:', error);
      }
    },
  });
  

  // const formik = useFormik({
  //   initialValues: {
      
  //     images : [],

      
      
  //   },

  //   onSubmit: async (values, { resetForm }) => {
  //     console.log(values)
  //     try {
  //       await axoissecure.post("/image", {
         

  //         email : "uuu@gmail.com",
  //         date : new Date(),
  //         title : values.title,
  //         profile : values.images,
     
     
  //       },{    headers: {
  //         "Content-Type": "multipart/form-data",
  //       }})
  //       console.log("Product added successfully:", values);
  //       toast.success("Report Send  successfully!");
  //       resetForm(); 
  //     } catch (error) {
  //       toast.error("error report sending ");
  //       console.error("Error adding Institute:", error);
  //     }
  //   },
  // });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newImages]);
    formik.setFieldValue('images', [...formik.values.images, ...files]);
  };

  const handleImageDelete = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formik.values.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    formik.setFieldValue('images', newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newImages]);
    formik.setFieldValue('images', [...formik.values.images, ...files]);
  };

  const handleCancel = () => {
    formik.handleReset();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-[400px]"
      >
        <div className=" p-4">
  
  <div className='flex justify-between items-center'>
    <div></div>
    <div onClick={handleCancel} className='text-3xl text-gray-500 font-semibold cursor-pointer'>x</div>
  </div>

          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png" 
              alt="Profile"
            />
            <div>
            <div className="ml-3 tetx-md text-gray-600 font-bold">
             Ashikur Rahman Ovi
            </div>
            </div>
          </div>
          <div className="mt-4">
          <textarea
  className="w-full border-2 rounded-md border-gray-200 h-20 text-sm text-gray-700 focus:outline-none"
  placeholder="What's on your mind?"
  name="title"  // Add the name attribute here
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
              Add Photos/Videos{' '}
         
            </label>
            <input
              ref={fileInputRef}
              id="image"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex justify-center items-center h-32 bg-gray-100 border-2 border-gray-300 rounded-md">
              <MdOutlineFileUpload
                className="text-gray-500 text-4xl cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="max-w-[80px] h-[60px] object-cover border-2 border-dashed"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
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
