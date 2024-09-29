import { validateAddParams,validateRenameParams } from "./validate";

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


});

describe('validateRenameParams', () => {
  
  it('should pass and return with the original params, if they heve the correct format', () => {
    const params = ['1','Todo Item'];
    const expected = ['1','Todo Item'];
    
    const current = validateRenameParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when the first param is not a string of a valid number', () => {
    const params = ['a lot', 'Todo title'];
    
    expect(() => validateRenameParams(params))
      .toThrow('The ID should be numeric and the title should be at least 1 character long!');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateRenameParams(params))
    .toThrow('The ID should be numeric and the title should be at least 1 character long!');
  })

  it('should throw when the second param is not a string', () => {
    const params = ['5', 123];
    
    expect(() => validateRenameParams(params))
    .toThrow('The ID should be numeric and the title should be at least 1 character long!');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateRenameParams(params))
    .toThrow('The ID should be numeric and the title should be at least 1 character long!');
  })

})