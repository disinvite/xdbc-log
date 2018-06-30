'use strict';

exports.test = 123;

exports.convert = (list) => {
    if(typeof list === 'object') {
        list = list.map((x) => String.fromCharCode(x)).join('');
    }

    let buf = Buffer.from(list,'binary');

    let out = [];
    let i = 0;
    while(i < list.length) {
        let size = buf.readUInt8(i);
        let type = buf.readUInt8(i+1);

        switch(type) {
            case 1: // ascii string
                out.push(buf.toString('ascii',i+2,size));
                break;
            case 4: // positive integer
                out.push(buf.readUIntLE(i+2, size-2));
                break;
        }
        i += size;
    }
    return out;
};

