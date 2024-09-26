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
  if(params.length !== 1) {
    throw new AppError('Give an ID as the only parameter in parenthesis.');
  }
  const [id] = params;
  if(typeof id !== 'number' && id < 0) {
    throw new AppError('The ID must be a number which is bigger than zero.')
  }
  return params;
}
