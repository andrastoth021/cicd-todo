import { list, formatList, format, add} from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams} from './validate.js';

import complete from './commands/complete.js';
import findById from './commands/findById.js';
import findByTitle from './commands/findByTitle.js';
import findByStatus from './commands/findByStatus.js';
import rename from './commands/rename.js';
import deleteTodo from './commands/delete.js';
import addLabel from './commands/addLabel.js';
import deleteLabel from './commands/deleteLabel.js';
import findByLabel from './commands/findByLabel.js';

import validateCompleteParams from './validate/validateCompleteParams.js' 
import validateFindByIdParams from './validate/validateFindByIdParams.js' 
import validateFindByTitleParams from './validate/validateFindByTitleParams.js' 
import validateFindByStatusParams from './validate/validateFindByStatusParams.js' 
import validateRenameParams from './validate/validateRenameParams.js'
import validateDeleteParams from './validate/validateDeleteParams.js'
import validateAddLabelParams from './validate/validateAddLabelParams.js'
import validateDeleteLabelParams from './validate/validateDeleteLabelParams.js'
import validateFindByLabelParams from './validate/validateFindByLabelParams.js'


export function createApp(todoStore, args) {
  const [, , command, ...params] = args;
  
  switch (command) {
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
    case 'complete':
      console.log("completed")

        
      
      
      break; 
    case 'find-by-id':
        console.log('find-by-id')
      
      
  
      
      break;
    case 'find-by-title':
      console.log('find-by-title')
    
    

    
      break;
    case 'find-by-status':
        console.log('find-by-status')
      
      
  
      
      break;
    case "update-title":
        const validatedParams = validateRenameParams(params)//TODO: outsource it to validate.js
        const changedTodo = rename(todoStore,validatedParams);
        if(!changedTodo){
          throw new AppError('The todo with the given ID is not found!')};
        display(['Title of todo is changed:', format(changedTodo)]);
      break;
    case 'delete':
      console.log('delete')
      deleteTodo() // 'delete' is a bouilt in javaScript function, so I used an alternative name
    


      break;
    case 'add-label':
          console.log('add-label')
    



      break;
      case 'delete-label':
        console.log('delete-label')
  



      break;
      case 'find-by-label':
        console.log('find-by-label');



      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
