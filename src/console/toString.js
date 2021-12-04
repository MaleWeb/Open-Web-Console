import { isArray, isPlainObject } from "@hai2007/tool/type";

export default function (val) {
    if (isArray(val)) {
        let resultData = "[";
        for (let item of val) {
            resultData += item + ',';
        }
        return resultData.replace(/\,$/, ']');
    }

    if (isPlainObject(val)) {
        let resultData = "{";
        for (let key in val) {
            resultData += key + ":" + val[key] + ",";
        }
        return resultData.replace(/\,$/, '}');
    }

    return val;
};
