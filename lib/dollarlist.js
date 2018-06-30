'use strict';

exports.test = 123;

exports.convert = (list) => {
    //if list is string, map charCodeAt
    let out = [];
    let i = 0;
    while(i < list.length) {
        let size = list[i];
        let type = list[i+1];
        let data = list[i+2];
        switch(type) {
            case 1: // ascii string
                out.push(String.fromCharCode(data));
                break;
            case 4: // positive integer
                out.push(data);
                break;
        }
        i += size;
    }
    return out;
};

