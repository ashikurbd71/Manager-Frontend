import { createContext, useEffect, useState } from "react";


import { useQuery } from "@tanstack/react-query";
import axoissecure from "../Hooks/Axoisscure";


export const AuthContext = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);


  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["getuser"],
    queryFn: async () => {
      try {
        const res = await axoissecure.get(`/users/get/single-user`);
        // console.log("Data fetched successfully:", res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });



  useEffect(() => {
    if (data && !isLoading) {
      setUser(data || null);
      console.log(data, "kkhkhuguhg")
    }
  }, [data, isLoading]);



  return (
    <AuthContext.Provider
      value={{
        user: data,
        refetch,
        isLoading,
        error,
        setUser

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
