/*
 * @Author: sam.li
 * @Date: 2021-06-06 11:27:33
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-06 11:27:33
 */
const interceptors = [
    // example1: async
    // 登录和请求头处理
    config => {
        return config;
    },
    // example2: sync
    // config => {
    //     return new Promise((resolve, reject) => {
    //         return config;
    //     });
    // }
    // example3: fulfilled, rejected
    // [
    //     // fulfilled
    //     config => {
    //         return config;
    //     },
    //     // rejected
    //     config => {
    //         return config;
    //     }
    // ]
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