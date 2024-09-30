import { list, formatList, format, add, findById, rename, complete, findByStatus } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams,validateRenameParams, validateFindByidParams, validateCompleteParams, validateFindByStatusParams } from "./validate.js";


export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;
    case "add":
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(["New Todo added:", format(added)]);
      break;
    case "find-by-id":
      const validatedParam = validateFindByidParams(params);
      const todo = findById(todoStore, validatedParam);
      display([format(todo)]);
      break;
    case "update-title":
      const validatedParams = validateRenameParams(params); 
      const changedTodo = rename(todoStore, validatedParams);
      if (!changedTodo) {throw new AppError("The todo with the given ID is not found!");}
      display(["Title of todo is changed:", format(changedTodo)]);
      break;
    case 'complete':
      const validatedId = validateCompleteParams(params);
      const completed = complete(todoStore, validatedId);
      display(['Todo with the following ID is completed: ' + validatedId]);
      display([format(completed)]);
      break;
    case "find-by-status":
        const status = validateFindByStatusParams(params);
        const filteredTodos = findByStatus(todoStore, status);
        display(formatList(filteredTodos));
        break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
