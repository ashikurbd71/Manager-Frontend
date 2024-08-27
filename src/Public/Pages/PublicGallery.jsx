import React, { useState } from 'react';
import axoissecure from '../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

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

    const [data, setData] = useState({ img: "", i: 0 });

    const viewImage = (img, i) => {
        setData({ profile: img.profile, i });
    };

    const imgAction = (action) => {
        let newIndex = data.i;

        if (action === "next-img" && data.i < items.length - 1) {
            newIndex++;
        } else if (action === "prev-img" && data.i > 0) {
            newIndex--;
        }

        setData({ profile: items[newIndex]?.profile, i: newIndex });
    };

    const closePreview = () => {
        setData({ img: "", i: 0 });
    };

    return (
        <>
            {data.profile && (
                <div
                    style={{
                        width: "100%",
                        height: "80vh",
                        background: 'black',
                        position: "fixed",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        zIndex: 1000
                    }}
                >
                    <button
                        className='ab absolute bg-stone-50 -mt-[350px] font-bold p-2 lg:ml-[1200px] 2xl:ml-[1600px] ml-[430px]'
                        onClick={closePreview}
                    >
                        X
                    </button>

                    <button onClick={() => imgAction("prev-img")}>
                        <FaArrowAltCircleLeft className='text-white text-3xl mr-2 cursor-pointer' />
                    </button>

                    <img
                        src={`${import.meta.env.VITE_API_URL}/${data.profile}`}
                        alt=""
                        style={{width : 'auto', maxWidth:"80%", maxHeight:"100%", marginTop:'10px', }} 
                    />
                  

                    <button onClick={() => imgAction("next-img")}>
                        <FaArrowAltCircleRight className='text-white text-3xl ml-2 cursor-pointer' />
                    </button>
                </div>
            )}

            <div className='p-10'>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter='20px'>
                        {items.map((image, i) => (
                            <>
                            
                          <div className='p-2 bg-white border-4 border-transparent hover:border-[#0284C7]'>
                          <h1 className='-mt-2 pb-1 font-semibold text-gray-500   font-mono'>{image?.date.split('T')[0]}</h1>
                          <img
                                key={i}
                                src={`${import.meta.env.VITE_API_URL}/${image?.profile}`}
                                style={{ width: "100%", display: "block", cursor: "pointer" }}
                             
                                alt=""
                                onClick={() => viewImage(image, i)}
                            />
                            <h1 className='pt-2 font-medium text-gray-500  font-serif'>{image?.title}</h1>
                          </div>
                            </>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    );
};

export default PublicGallery;
