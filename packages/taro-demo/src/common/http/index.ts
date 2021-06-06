/*
 * @Author: sam.li
 * @Date: 2021-06-06 11:26:40
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-06 11:53:59
 */
import wxios from 'taro-wxios'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'
const http = wxios.create({
    baseURL: 'https://www.baidu.com',
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

// function request(option) {
//     return http(option.url, {
//         method: option.method || 'get',
//         data: option.data,
//         config: {
//             headers: option.header
//         }
//     });
// }

export default http