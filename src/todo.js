import { AppError } from "./app-error.js";

export function format(todo) {
  return `${todo.id} - [${todo.done ? 'x': ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format)
}

function nextId(todos) {
  const ids = todos.map(todo => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get(); 
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get()
  const newTodo = {
    title,
    done: false,
    id: nextId(todos)
  }
  const toStore = [...todos, newTodo]
  store.set(toStore)
  return newTodo;
}

export function findById(store, idParam) {
  const id = Number(idParam);
  
  if (isNaN(id)) {
    throw new AppError('The ID must be a numeric value.');
  }

  const todos = store.get();
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    throw new AppError(`Todo with ID ${id} not found.`);
  }

  return todo;
}

export function rename(todoStore,params) {
  const [id,title] = params;
  let foundIndex = null;
  const [foundTODO] = list(todoStore).filter((item,index)=>{
        if(item.id==id){
          foundIndex = index;
          return true;
        } 
      });
  
  if(foundTODO){    
    foundTODO.title = title;
    const todos = todoStore.get()
    todos.splice(foundIndex,1,foundTODO);
    todoStore.set(todos)
  }
  return foundTODO;
}