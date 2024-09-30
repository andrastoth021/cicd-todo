import { validateAddParams, validateCompleteParams } from './validate.js';

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })


})

describe('validateCompleteParams', () => {
  it('should throw when multiple params given', () => {
    const params = ['1', '15'];
    
    expect(() => validateCompleteParams(params))
      .toThrow('Give an ID as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateCompleteParams(params))
      .toThrow('Give an ID as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a bigger than zero', () => {
    const params = [-1];
    
    expect(() => validateCompleteParams(params))
      .toThrow('The ID must be a number which is bigger than zero.');
  })
  
  
  it('should throw if the provided ID is not numeric', () => {
    const params = ["String"];
    
    expect(() => validateCompleteParams(params))
      .toThrow('The ID must be a number which is bigger than zero.');
  })

})

