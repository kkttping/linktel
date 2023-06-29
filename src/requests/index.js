import axios from 'axios'
import { message } from 'antd';
const baseURL = ''
let timer = 0;
axios.interceptors.request.use(
    config => {
        return config;

    },
    err => {
        message.destroy();
        message.error('网络请求超时', 1);
        return Promise.reject(err);
    }
)
axios.interceptors.response.use(
    data => {
        return data.data;
    },
    err => {
        message.destroy();
        if (!err.response) {
            message.destroy();
            message.error('网络连接失败，请检查网络配置和网线是否松动', 1);
            return Promise.reject(err);
        }
        if(err.response.status===504){
            message.error('网络连接失败，请重新登录',1);

        }else if(err.response.status===401){
            clearTimeout(timer);
            timer=setTimeout(()=>{
                message.warning('登录信息失效',1);
            },100);
        }else if(err.response.status===404){
            message.warning('请求不存在',1);
        }else if(err.response.status==500){
            message.error('网络连接失败',1);
        }else if(err.response.status==502){
            message.error('服务器异常',1);
        }
        return Promise.reject(err);
    }
);
const setParamsToUrl=(url,params)=>{
    let urlStr=url;
    if(params&&Object.keys(params).length){
        urlStr+='?';
        Object.keys(params).forEach((item,index)=>{
            if(params[item]===undefined||params[item]===null){
                return;
            }
            if(index===Object.keys(params).length-1){
                urlStr+=item+'='+params[item];
            }else{
                urlStr+=item+'='+params[item]+'&';
            }
        })
    }
    return urlStr;
}
export const post = (url,params,base)=>{
    return axios({
        method:'post',
        url:`${baseURL||base}${url}`,
        data:params,
        headers:{
            'Content-Type':'application/json',
            charset:'utf-8',
        },
    })
}
export const get=(url,params,base)=>{
    return axios({
        method:'get',
        url:setParamsToUrl(`${url}`,params)
    })
}
export const download=(url,params,base)=>{
    return axios({
        method:'get',
        url:`${baseURL||base}${url}`,
        params,
        responseType:'blob'
    })
}
export const upload=(url,data,onUploadProgress)=>{
    return axios({
        method:'POST',
        url:`${baseURL}${url}`,
        data,
        headers:{
            charset:'UTF-8',
            'Content-Type':'multipart/form-data',
        },
        onUploadProgress
    })
}