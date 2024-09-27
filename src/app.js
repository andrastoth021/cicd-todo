import { list, formatList, format, add, rename } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams } from './validate.js';

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;
  
  switch (command) {
    case "update-title":
      //TODO: outsource it to validate.js
      const [id,title] = params;
      //It has two params, an ID and the new title as a string. The ID should be numeric and a string should be at least 1 character long or a meaningful error should be shown to the user.
      if(
        isNaN(+id)||
        typeof(title)!="string"||
        title.length<1
        ){
        throw new AppError('The ID should be numeric and the title should be at least 1 character long!')
      }
      
      //If the todo with the given ID is not found, show a meaningful Error message to the user.
      let foundIndex = null;
      const [foundTODO] = list(todoStore).filter((item,index)=>{
        if(item.id==id){
          foundIndex = index;
          return true;
        } 
      });
  
      if(!foundTODO){
        throw new AppError('The todo with the given ID is not found!')
      } else {
        foundTODO.title = title;
        console.log(foundTODO);
        rename(todoStore,foundTODO,foundIndex)
        display(['Title of todo is changed:', format(foundTODO)])
      }

      break;
    
    case 'list':
      const todos = list(todoStore)
      display([
        ...formatList(todos), 
        `You have ${todos.length} todos.`
      ]);
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)])
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
