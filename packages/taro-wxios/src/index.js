/*
 * @Author: sam.li
 * @Date: 2021-06-01 14:33:11
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-01 16:13:32
 */
import utils from './utils';
import Wxios from './Wxios.js';
import defaults from './defaults';

function createInstance(defaultConfig) {
    var context = new Wxios(defaultConfig);
    var instance = utils.bind(Wxios.prototype.request, context);
    utils.extend(instance, Wxios.prototype, context);
    utils.extend(instance, context);
    return instance;
}

var wxios = createInstance(defaults);

wxios.Wxios = Wxios;

/**
 * 新建 Wxios 实例
 * @param {Object} instanceConfig
 */
wxios.create = function create(instanceConfig) {
    return createInstance(Object.assign({}, defaults, instanceConfig || {}));
};

wxios.all = function all(promises) {
    return Promise.all(promises);
};

export default wxios;
