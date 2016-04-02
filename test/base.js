var chai = require('chai');
var assert = require('chai').assert;
var expect = chai.expect;
// var My = require('../app/sqrt');

var My = {
    sqrt: function(x) {
        if (x < 0) throw new Error("负值没有平方根");
        return Math.exp(Math.log(x)/2);
    }
};

describe("sqrt", function() {

    it("4的平方根应该等于2", function() {
        expect(My.sqrt(4)).to.equal(2);
    });

    it("参数为负值时应该报错", function() {
        expect(function(){ My.sqrt(-1); }).to.throw("负值没有平方根");
    });

});