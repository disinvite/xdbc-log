'use strict';

exports.test = 123;

exports.convert = (list) => {
    if(typeof list === 'object') {
        list = list.map((x) => String.fromCharCode(x)).join('');
    }

    let buf = Buffer.from(list,'binary');

    let out = [];
    let i = 0;
    let size, type, start, end;

    while(i < list.length) {
        if(buf.readUInt8(i) != 0) {
            size = buf.readUInt8(i);
            type = buf.readUInt8(i+1);
            start = i + 2;
            end = i + size;
        } else if (buf.readUInt16LE(i+1) != 0) {
            size = buf.readUInt16LE(i+1) + 3;
            type = buf.readUInt8(i+2);
            start = i + 4;
            end = i + size;
        } else {
            // big
        }

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

