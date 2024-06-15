import axios from "axios";


const axoissecure = axios.create({

    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
    headers: {
        "Content-Type": "multipart/form-data",
      },
    
})

export default axoissecure