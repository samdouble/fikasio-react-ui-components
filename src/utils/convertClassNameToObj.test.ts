import { convertClassNameToObj } from './convertClassNameToObj';

describe('convertClassNameToObj', () => {
  it('Should return an empty object if className is undefined', () => {
    const result = convertClassNameToObj();
    expect(result).toEqual({});
  });

  it('Should return an empty object if className is an empty string', () => {
    const result = convertClassNameToObj('');
    expect(result).toEqual({});
  });

  it('Should return an object with one key if className is only a word long', () => {
    const result = convertClassNameToObj('myClassName');
    expect(result).toEqual({
      myClassName: true,
    });
  });

  it('Should return an object with as many keys as the number of space-separated words in the className', () => {
    const result = convertClassNameToObj('this is my className');
    expect(result).toEqual({
      className: true,
      is: true,
      my: true,
      this: true,
    });
  });
});
