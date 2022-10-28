import axios from 'axios';
import { API_BASE_URL } from '../config/index';

/**
 * 封装的客户端HTTP请求方法
 */
export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL(),
});

/**
 * 封装的第三方tenapi.cn接口请求
 */
export const tenApiHttpRequest = axios.create({
  baseURL: '/tenApi',
  timeout: 1e4,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Agent': 'Axios',
  },
});

export const thirdQQHttpRequest = axios.create({
  baseURL: '/thirdqqApi',
  timeout: 1e4,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Agent': 'Axios',
  },
});

/**
 * 封装第三方sohuapi接口，主要为了获取ip地址
 */
export const sohuHttpRequest = axios.create({
  baseURL: '/sohuApi',
  timeout: 1e4,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Agent': 'Axios',
  },
});

/**
 * 封装百度地图接口，获取物理地址
 */
export const baiduMapHttpRequest = axios.create({
  baseURL: '/baiduMapApi',
  timeout: 1e4,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Agent': 'Axios',
  },
});
