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
        let start = i + 2;
        let end = i + size;

        switch(type) {
            case 1: // ascii string
                out.push(buf.toString('ascii',start,end));
                break;
            case 4: // positive integer
                if(start == end) {
                    out.push(0);
                } else {
                    out.push(buf.readIntLE(start, end-start));
                }
                break;
            case 5: // negative integer
                if(start == end) {
                    out.push(-1);
                } else {
                    out.push(buf.readIntLE(start, end-start));
                }
                break;
        }
        i += size;
    }
    return out;
};

