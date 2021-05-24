import axios from "axios";

export function request(config) {
    //1.创建axios实例
     const instance = axios.create({
       baseURL:'http://152.136.185.210:7878/api/m5',
       timeout:'5000'
     })
      //axios的拦截器
      instance.interceptors.request.use(res => {
        return res
      },err => {
        console.log(err)
      })
      //发送真正的请求
     return instance(config)
}
