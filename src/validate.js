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

/*
As a user I can search among my todos by title, so I can find a todo if I have many, even if I do not remember the exact title.

- A new command 'find-by-title' is added to the app.
- It has one parameter, a string. It should be at least 3 characters long or a new AppError should be thrown with a meaningful error message.
- Look for the titles of all todos. Collect one or more todos if the title contains case insensitive the parameter.
- Display the todos to the user. If no todos found with this title do not show any error just a meaningful message about not found todos.
- Cover the new functionality with tests.
*/

export function validateTitleSearchParams(params) {
  const [title] = params;
    if(title.length<3) 
      {
        throw new AppError('The searched text should be at least 3 character long!')
      };
  return params;
}