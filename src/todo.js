import { AppError } from './app-error.js';


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

/**
 * This function finds a Todo by a provided ID and returns it's index. Throws an AppError in case it doesn't find one.
 * This is the general function we use in every function where we need to find a todo by ID.
 * @constructor
 * @param store - The store which we need to iterate through and find the desired Todo in.
 * @param {number} id - The ID which we want to search by.
 * @returns {number} Return the index of the todo.
 */
export function getTodoIndexById(store, id) {

  for (let i = 0; i < store.length; i++) {
    if (store[i].id === id) {
      return i;
    }
  }

  throw new AppError(`There is no todo with id: ${id}`);
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

export function complete(store, params) {
  const id = parseInt(params);
  const todos = store.get();
  const index = getTodoIndexById(todos, id);

  if (todos[index].done === false) {
    todos[index].done = true;
    const toStore = [...todos];
    store.set(toStore);
    return todos[index];  
  } else throw new AppError("This Todo is already completed!");
}

export function remove(store, params) {
  const id = parseInt(params);
  const todos = store.get();
  const index = getTodoIndexById(todos, id);

  const toRemove = todos[index];
  todos.splice(index, 1);
  const toStore = [...todos];
  store.set(toStore);
  return toRemove;
}

export function findById(store, idParam) {
  const id = parseInt(idParam);
  const todos = store.get();
  const index = getTodoIndexById(todos, id);
  return todos[index];
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

export function findByStatus(store, status) {
  const todos = store.get();
  
  const isDone = status === "done";
  const filteredTodos = todos.filter(todo => todo.done === isDone);

  if (filteredTodos.length === 0) {
    throw new AppError(`No todos found with status: ${status}`);
  }

  return filteredTodos;
}

export function findByTitle(store, params) { 
  const [title] = params;
  const regexp = new RegExp(title,'i')
  const foundToDos = list(store).filter(item=>
        regexp.test(item.title)
      );
  return foundToDos;
}