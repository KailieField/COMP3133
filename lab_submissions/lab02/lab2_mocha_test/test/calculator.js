// --------------------- LAB EX 2 | COMP 3133 | KAILIE FIELD | 100627702 --------------------- 
const assert = require('assert');
const calculator = require('../app/calculator');

describe('Test Cases', () => {

    //--- ADDITION ---
    describe('Addition', () => {
        it('PASS expected result 7', () => {
            assert.equal(calculator.add(5,2), 7, '--- PASS');
        });
        it('FAIL expected result 8', () => {
            assert.notEqual(calculator.add(5,2), 8, '--- FAIL');
        });
    });

    //--- SUBTRACTION ---
    describe('Subtraction', () => {
        it("PASS expected result 3", () => {
            assert.equal(calculator.sub(5,2), 3, '--- PASS');
        });
        it('FAIL expected result 5', () => {
            assert.notEqual(calculator.sub(5,2), 5, '--- FAIL');
        });
    });

    //--- MULTIPLICATION ---
    describe('Multiplication', () => {
        it('PASS expected result 10', () => {
            assert.equal(calculator.mul(5,2), 10, '---PASS');
        });
        it('FAIL expected result 12', () => {
            assert.notEqual(calculator.mul(5,2), 12, '--- FAIL');
        });
    });

    //--- DIVISION ---
    describe('Division', () => {
        it('PASS expected result 10', () => {
            assert.equal(calculator.div(10, 2), 5, '--- PASS');
        });
        it('FAIL expected result 2', () => {
            assert.notEqual(calculator.div(10,2), 2, '--- FAIL');
        });
    });
});