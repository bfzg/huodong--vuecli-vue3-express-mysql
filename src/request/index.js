
import axios from "axios";
import {ElMessage,ElLoading} from "element-plus";

let service = axios.create({
    baseURL:"http://127.0.0.1:3000/",
    timeout:3000,

})
//创建axios 请求拦截器
service.interceptors.request.use(config => {
    config.headers.Authorization =  window.localStorage.getItem('token');
    return config
})

//创建axios 响应拦截器
service.interceptors.response.use(
    (res)=>{
        return res
    },
    (err)=>{
        if(err.response && err.response.status === 401){
            alert('404 请刷新重试!')
        }
        else if(err.response.status === 301){
            alert('获取信息失败，请刷新网页');
        }
        return Promise.reject(err);
    }
)

export default service
