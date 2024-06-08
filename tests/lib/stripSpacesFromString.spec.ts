import { stripSpacesFromString } from '../../lib/stripSpacesFromString';

describe('stripSpacesFromString', () => {
  it('should remove all spaces from a string', () => {
    const input = 'Hello, World! This is a test.';
    const expected = 'Hello,World!Thisisatest.';
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });

  it('should handle strings with leading and trailing spaces', () => {
    const input = '   Hello, World!   ';
    const expected = 'Hello,World!';
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });

  it('should handle strings with multiple consecutive spaces', () => {
    const input = 'Hello,   World!';
    const expected = 'Hello,World!';
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });

  it('should handle strings with tabs and newline characters', () => {
    const input = 'Hello,\tWorld!\nThis is a test.';
    const expected = 'Hello,World!Thisisatest.';
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expected = '';
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });

  it('should handle undefined input', () => {
    const input = undefined;
    const expected = undefined;
    const result = stripSpacesFromString(input);
    expect(result).toEqual(expected);
  });
});