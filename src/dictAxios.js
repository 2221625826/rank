// src/plugins/axios.js
import axios from 'axios';
///api/v2/entries/en/
const instance = axios.create({
  baseURL: 'https://api.dictionaryapi.dev', // 基础URL，可选
  timeout: 1000, // 请求超时时间
});
 
export default instance;