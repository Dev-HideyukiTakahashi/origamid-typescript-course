"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = countBy;
function countBy(arr) {
    return arr.reduce((acc, item) => {
        if (acc[item]) {
            acc[item] += 1;
        }
        else {
            acc[item] = 1;
        }
        return acc;
    }, {});
}
