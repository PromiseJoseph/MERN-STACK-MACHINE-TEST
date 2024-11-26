import axios from "axios"

 const URL= process.env.REACT_APP_BASE_URL
const axiosClient = axios.create({
    withCredentials: true,
    timeoutErrorMessage:"takes too long to respond",
    withXSRFToken:true,
    baseURL: URL,
 })
 export default axiosClient