/*
 * @Author: sam.li
 * @Date: 2021-06-01 15:37:25
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-06 12:02:28
 */
import InterceptorManger from './interceptorManger';
import dispatchRequest from './dispatchRequest';
import utils from './utils';
/**
 * @class Wxios
 * @param {Object} config 请求配置
 */
function Wxios(config) {
    this.defaults = config;
    this.interceptors = {
        request: new InterceptorManger(),
        response: new InterceptorManger(),
    };
    this.getTaskCallBackQueue = [];
}

/**
 * 请求方法
 * @param {Object} config
 */
Wxios.prototype.request = function request(config) {
    let _httpPromiseIndex = 0; //
    if (typeof config === 'string') {
        config = Object.assign(
            {
                url: arguments[0],
            },
            arguments[1] || {},
        );
    }

    config = utils.merge(
        {},
        this.defaults,
        {
            method: 'get',
        },
        config,
    );
    config.method = config.method.toLowerCase();

    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach((interceptor) => {
        _httpPromiseIndex++;
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
        _httpPromiseIndex--;
        if (_httpPromiseIndex === 0) {
            this.getTaskCallBackQueue.map((callBack) => {
                callBack(promise);
            }); // 执行注入的获取task回调函数
        }
    }

    return promise;
};

['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach((method) => {
    Wxios.prototype[method] = function (url, data, config) {
        const _config = Object.assign(config || {}, { method: method, url: url, data: data });
        return this.request(_config);
    };
});

// 注入获取task的方法
Wxios.prototype.getTask = function (callBack) {
    this.getTaskCallBackQueue.push(callBack);
};

export default Wxios;
