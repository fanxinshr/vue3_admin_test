// src/axios.js
import axios from 'axios';

const request2 = axios.create({
  baseURL: 'http://localhost:8000/api', // 你的Django API的基础URL
});

export default request2;
