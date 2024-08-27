import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaTrashAlt } from "react-icons/fa";
import axoissecure from '../../../../../Hooks/Axoisscure';
import useAuth from '../../../../../Provider/UseAuth/useAuth';
import Pagination from '../../../../../Share/PaginationTable/Pagination';
import Imgpagnation from './Imgpagnation';
import Swal from 'sweetalert2';

const Postphoto = () => {
    const { user, isLoading: userLoading } = useAuth();
    const [search, setSearch] = useState("");
    const [rowPerPage, setRowPerPage] = useState(3);
    const [page, setPage] = useState(1);
    const [stat, setStat] = useState();
    const [active, setActive] = useState(0);
  
  
    useEffect(() => {
      if (active === 1) {
        setPage(1);
      } else {
        setPage(1);
      }
    }, [active, search]);
    
    const { data: items = [], refetch } = useQuery({
      queryKey: [
        "semister",
        search,
        rowPerPage,
        page,
        setPage,
        rowPerPage,
        setRowPerPage,
      ],
      queryFn: async () => {
        try {
          let limit = rowPerPage === "All" ? 100000000 : rowPerPage;
  
          if (active) {
            const res = await axoissecure.get(
              `/image/search?query=${search}&limit=${limit}&page=${page}`
            );
            setStat(res.data?.meta);
  
            return res?.data?.items;
          } else {
            const res = await axoissecure.get(
              `/image/search?limit=${limit}&page=${page}`
            );
            setStat(res.data?.meta);
  
            return res?.data?.items;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      },
    });
  
  
  console.log(search)
  
  console.log(items)

   

  const handleDelete = (img) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axoissecure.delete(`/image/${img?.id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

          refetch();
          }
        });
      }
    });
  };

    // Filter images by user email
    const userImages = items.filter(image => image.user === user?.email);

    return (
        <>
            <div className='p-2'>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter='3px'>
                        {userImages.map((image, i) => (
                            <div key={i} >
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${image?.profile}`}
                                    style={{ width: "100%", display: "block", cursor: "pointer",height:"60px" }}
                                    alt=""
                                    onClick={() => viewImage(image, i)}
                                    className='border-2 border-transparent  hover:border-[#0284C7]'
                                />
                                    <FaTrashAlt title="Delete" onClick={() => handleDelete(image)} className=" absolute  text-red-500 text-sm cursor-pointer"  />
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>

                <Imgpagnation
            stat={stat}
            setRowPerPage={setRowPerPage}
            setPage={setPage}
            page={page}
          />
            </div>
        </>
    );
};

export default Postphoto;
