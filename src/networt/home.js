import {request} from "@/networt/request";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export  function  getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params: {
            type,
            page
        }
    })
}