# taro http tool
[![Build Status](https://travis-ci.org/liminshen/taro-wxios.svg?branch=master)](https://travis-ci.org/liminshen/taro-wxios)

## 安装方法
```
# npm install taro-wxios
```

## 使用方法

### 拦截器

``` js
<!-- index.js -->
import wxios from 'taro-wxios'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'
const http = wxios.create({
    baseURL: baseUrl,
    timeout: 120000,
    headers: {
        common: {
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    },
});

requestInterceptor(http);
responseInterceptor(http);

<!-- requestInterceptor.js -->
// request 拦截器
const interceptors = [
    // example1: async
    config => {
        return config;
    }
];

export default http => {
    interceptors.forEach(interceptor => {
        if (!Array.isArray(interceptor)) {
            interceptor = [interceptor];
        }
        const [fulfilled, rejected = null] = interceptor;
        http.interceptors.request.use(config => {
            return fulfilled(config) || config;
        }, config => {
            return rejected ? (rejected(config) || config) : config;
        });
    });
};

<!-- responseInterceptor.js -->
// response 拦截器
const interceptors = [
    response => {
        return response.data || {};
    }
];

export default http => {
    // 添加一个返回拦截器
    interceptors.forEach(interceptor => {
        if (!Array.isArray(interceptor)) {
            interceptor = [interceptor];
        }
        const [fulfilled, rejected = null] = interceptor;
        http.interceptors.response.use(
            response => {
                return fulfilled(response) || response;
            },
            error => {
                return rejected ? (rejected(error) || error) : error;
            });
    });
};
```

### 发送请求

``` js
// get
// 方法一
http('url', {
    method: 'get',
    data,
    config
});
// 方法二
http.get('url',data[,config]);

// post
// 方法一
http('url', {
    method: 'post',
    data,
    config
});
// 方法二
http.post('url',data[,config]);
```

## 可以配置的参数config

1. timeout[number] 超时设置,单位毫秒ms
2. headers[object] 头部参数设置
3. headers.common[object] 头部公共参数
4. extends[object] 拓展字段
   1. isUpload[boolean] 是否上传文件, 假如填ture,使用Taro.uploadFile;data，里面必须传filepath;filename可选，默认值为'file';
