import axiosClient from "../../axios";

export const submitForm = async(data)=>{
    return await axiosClient.post("form/create",data);
}