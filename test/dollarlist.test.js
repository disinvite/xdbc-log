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
});
