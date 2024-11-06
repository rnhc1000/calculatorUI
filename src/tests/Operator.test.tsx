import {sum, sub, div, mul} from './operations';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('subtracts 1 - 2 to equal -1', () => {
    expect(sub(1, 2)).toBe(-1);
  });

  test('div 1 / 2 to equal 0.5', () => {
    expect(div(1, 2)).toBe(0.5);
  });

  test('multiplies 1 by 2 to equal 2', () => {
    expect(mul(1, 2)).toBe(2);
  });
  
  