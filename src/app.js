import { list, formatList, format, add, findById, rename } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams,validateRenameParams } from "./validate.js";

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
      const validatedParam = validatedParams(params);
      const todo = findById(todoStore, validatedParam);
      display([format(todo)]);
      break;
    case "update-title":
      const validatedParams = validateRenameParams(params); 
      const changedTodo = rename(todoStore, validatedParams);
      if (!changedTodo) {throw new AppError("The todo with the given ID is not found!");}
      display(["Title of todo is changed:", format(changedTodo)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
