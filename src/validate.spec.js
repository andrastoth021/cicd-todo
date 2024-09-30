import { validateAddParams, validateFindByidParams, validateRenameParams, validateCompleteParams, validateFindByStatusParams, validateDeleteParams, validateTitleSearchParams } from './validate.js';

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

describe('validateDeleteParams', () => {
  it('should throw when multiple params given', () => {
    const params = ['1', '15'];
    
    expect(() => validateDeleteParams(params))
      .toThrow('Give an ID as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateDeleteParams(params))
      .toThrow('Give an ID as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a bigger than zero', () => {
    const params = [-1];
    
    expect(() => validateDeleteParams(params))
      .toThrow('The ID must be a number which is bigger than zero.');
  })
  
  it('should throw if the provided ID is not numeric', () => {
    const params = ["String"];
    
    expect(() => validateDeleteParams(params))
      .toThrow('The ID must be a number which is bigger than zero.');
  })
})


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


describe('validateFindByidParams', () => {

  it('should throw AppError when the param (id) length is bigger than 1', () => {
    const param = [2, 4];
    const secondParam = [];

    expect(() => validateFindByidParams(param)).toThrow('Please give a single numeric value as id. --> e.g.: node index.js find-by-id 1');
    expect(() => validateFindByidParams(secondParam)).toThrow('Please give a single numeric value as id. --> e.g.: node index.js find-by-id 1');
  })

  it('should throw AppError when the param (id) is not numeric', () => {
    const param = ['string'];
    const secondParam = [false];

    expect(() => validateFindByidParams(param)).toThrow('The id should be numeric!')
    expect(() => validateFindByidParams(secondParam)).toThrow('The id should be numeric!')
  })

  it('should throw AppError when the param (id) is equal to 0 or less than 0', () => {
    const negativeParam = [-1];
    const paramEqualToZero = [0];

    expect(() => validateFindByidParams(negativeParam)).toThrow('The id should be bigger than 0!')
    expect(() => validateFindByidParams(paramEqualToZero)).toThrow('The id should be bigger than 0!')
  })

})

describe('validateFindByStatusParams', () => {
  it('should return the status if it is "done" or "not-done"', () => {
    const validDoneParams = ['done'];
    const validNotDoneParams = ['not-done'];

    expect(validateFindByStatusParams(validDoneParams)).toBe('done');
    expect(validateFindByStatusParams(validNotDoneParams)).toBe('not-done');
  });

  it('should throw an error if the status is invalid', () => {
    const invalidParams = ['in-progress'];
    const numberParams = [2];
    const invalidNotDone = ['not done']

    expect(() => validateFindByStatusParams(invalidParams))
      .toThrow("Invalid status! Please provide 'done' or 'not-done'.");

    expect(() => validateFindByStatusParams(numberParams))
    .toThrow("Invalid status! Please provide 'done' or 'not-done'.");

    expect(() => validateFindByStatusParams(invalidNotDone))
    .toThrow("Invalid status! Please provide 'done' or 'not-done'.");
  });

  it('should throw an error if no status is provided', () => {
    const noParams = [];
    expect(() => validateFindByStatusParams(noParams))
      .toThrow("Invalid status! Please provide 'done' or 'not-done'.");
  });
});

describe('validateTitleSearchParams', () => {

  it('should throw when the param length is a less than 3 charakter long string', () => {
    const params = ['as'];
    
    expect(() => validateTitleSearchParams(params))
    .toThrow('The searched text should be at least 3 character long!');
  })
});