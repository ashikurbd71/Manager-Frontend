import axoissecure from "../../../Hooks/Axoisscure";



export const getInstitute = async () => {

    const { data } = await axoissecure.get(`/institute`)
    console.log("data", data);
    return data
}



export const getDepartment = async () => {

    const { data } = await axoissecure.get(`/department`)
    console.log("data", data);
    return data
}



export const getSemister = async () => {

    const { data } = await axoissecure.get(`/semister`)
    console.log("data", data);
    return data
}


export const getBlood = async () => {

    const { data } = await axoissecure.get(`/blood`)
    console.log("data", data);
    return data
}

export const getMember = async () => {

    const { data } = await axoissecure.get(`/members`)
    console.log("data", data);
    return data
}

export const getManager = async () => {

    const { data } = await axoissecure.get(`/manager`)
    console.log("data", data);
    return data
}

