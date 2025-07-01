import { expect } from 'chai';
import { calculateCompoundInterest } from './main.js';

describe('calculateCompoundInterest', () => {
  it('should calculate compound interest correctly', () => {
    const principal = 1000;
    const annualRate = 0.05;
    const years = 10;
    const expected = 1647.0094976902204;
    const result = calculateCompoundInterest(principal, annualRate, years);
    expect(result).to.be.closeTo(expected, 0.0001);
  });
});
