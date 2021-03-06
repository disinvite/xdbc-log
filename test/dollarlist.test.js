'use strict';

const assert = require('assert');
const $list = require('../lib/dollarlist');

describe('test', () => {
    it('should return 123', () => {
        assert.equal($list.test,123);
    });
});

describe('convert', () => {
    it('should return [5]', () => {
        assert.deepEqual($list.convert([3,4,5]), [5]);
    });
    it('should return [5,6]', () => {
        assert.deepEqual($list.convert([3,4,5,3,4,6]), [5,6]);
    });
    it('should return [A]', () => {
        assert.deepEqual($list.convert([3,1,65]), ['A']);
    });
    it('should return [ABC123]', () => {
        assert.deepEqual($list.convert([8,1,65,66,67,49,50,51]), ['ABC123']);
    });
    it('should return [test,100]', () => {
        assert.deepEqual($list.convert('\x06\x01\x74\x65\x73\x74\x03\x04\x64'), ['test',100]);
    });
    it('should return [500]', () => {
        assert.deepEqual($list.convert([0x4,0x4,0xf4,0x1]), [500]);
    });
    it('should return [0]', () => {
        assert.deepEqual($list.convert([0x2,0x4]), [0]);
    });
    it('should return [-1]', () => {
        assert.deepEqual($list.convert([0x2,0x5]), [-1]);
    });
    it('should return [-2]', () => {
        assert.deepEqual($list.convert([0x3,0x5,0xfe]), [-2]);
    });
});

describe('convert longer strings', () => {
    it('should return 259 spaces and an x', () => {
        let data = ' '.repeat(259) + 'x';
        let v0 = [0x0,0x5,0x1,0x1].concat( Array(259).fill(0x20) ).concat(0x78);

        assert.deepEqual($list.convert(v0),[data]);
    });

    it('should lorem ipsum', () => {
        //445 characters. $lb() length is 4 more than that.
        const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        let lb = [0x00,0xbe,0x01,0x01].concat(lorem.split('').map((x) => x.charCodeAt(0)));

        assert.deepEqual($list.convert(lb),[lorem]);
    });
});
