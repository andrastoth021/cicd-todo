import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}


export function validateCompleteParams(params) {
  if (params.length !== 1)
    throw new AppError('Give an ID as the only parameter in parenthesis.');
  
  const [idParam] = params;
  const id = parseInt(idParam);
  if (typeof id !== 'number' || isNaN(id) || id < 0)
    throw new AppError('The ID must be a number which is bigger than zero.');
  
  return params;
}

export function validateDeleteParams(params) {
  if (params.length !== 1)
    throw new AppError('Give an ID as the only parameter in parenthesis.');
  
  const [idParam] = params;
  const id = parseInt(idParam);
  if (typeof id !== 'number' || isNaN(id) || id < 0)
    throw new AppError('The ID must be a number which is bigger than zero.');
  
  return params;
}

export function validateRenameParams(params) {
  //It has two params, an ID and the new title as a string.
  const [id,title] = params;
  /* The ID should be numeric and 
  a string should be at least 1 character long or 
  a meaningful error should be shown to the user.
  */
  if(
    isNaN(+id)||
    typeof(title)!="string"||
    title.length<1
    ){
    throw new AppError('The ID should be numeric and the title should be at least 1 character long!')
  }
  return params;
}

export function validateFindByidParams(params) {

  if (params.length !== 1) {
    throw new AppError("Please give a single numeric value as id. --> e.g.: node index.js find-by-id 1")
  }
  
  const [paramsId] = params;
  const id = parseInt(paramsId);

  if(isNaN(id)){
    throw new AppError("The id should be numeric!");
  }

  if (id <= 0) {
    throw new AppError("The id should be bigger than 0!");
  }
  return params;
}

export function validateFindByStatusParams(params) {
  const [status] = params;

  switch (status) {
    case "done":
      return status;
    case "not-done":
      return status;
    default:
      throw new AppError("Invalid status! Please provide 'done' or 'not-done'.");
  }
}

export function validateTitleSearchParams(params) {
  const [title] = params;
    if(title.length<3) 
      {
        throw new AppError('The searched text should be at least 3 character long!')
      };
  return params;
}
