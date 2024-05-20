import axios from "axios";

// const url = "http://192.168.20.156:9991";
const url = "http://192.168.20.157:2000"
// const url = "http://192.168.0.140:9993";
// const url = window.location.origin;

const AxiosInstance = axios.create({
  baseURL: url,
});
export default AxiosInstance;
