// src/axios.js
import axios from 'axios';

let baseURL = 'http://127.0.0.1:8000/'

// 创建axios实例
const httpService = axios.create({
  baseURL: baseURL, // 你的Django API的基础URL
  timeout: 10000,
});

// 请求拦截器
httpService.interceptors.request.use((config) => {
  // 获取token
    config.headers.AUTHORIZATION = window.sessionStorage.getItem('token');

    return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
httpService.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

// get请求
export const get = (url: string, params: any) => {
  return httpService.get(url, { params });
};

// post请求
export const post = (url: string, data: any) => {
  return httpService.post(url, data);
};

export default httpService;
