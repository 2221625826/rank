// src/plugins/axios.js
import axios from 'axios';
 
const instance = axios.create({
  baseURL: 'http://101.32.98.40:8080', // 基础URL，可选
  timeout: 1000, // 请求超时时间
});
 
export default instance;