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
  const {searchedTodo,indexOfTodo} = changeTodoWithId(store,id);
  
  const todos = store.get();
  
  if(searchedTodo){
    if (searchedTodo.done === true) throw new AppError("This Todo is already completed!");
    else {
      searchedTodo.done = true;
      todos.splice(indexOfTodo, 1, searchedTodo);
      store.set(todos);
      return searchedTodo;
      }
  }

  throw new AppError('Todo does not exist with the provided ID!');
}

export function remove(store, params) {
  const id = parseInt(params);
  const todos = store.get();
  const {searchedTodo,indexOfTodo} = changeTodoWithId(store,id)

  if(searchedTodo){
      todos.splice(indexOfTodo, 1);
      const toStore = [...todos];
      store.set(toStore)
      return searchedTodo;
  }

  throw new AppError('Todo does not exist with the provided ID!');
}

export function findById(store, idParam) {
  const id = idParam; 
  const {searchedTodo} = changeTodoWithId(store,id)
  
  if(searchedTodo){return searchedTodo};
  throw new AppError(`There is no todo with id: ${id}`);  
}

export function rename(todoStore,params) {
  const [id,title] = params;
  const {searchedTodo,indexOfTodo} = changeTodoWithId(todoStore,id)
  
  if(searchedTodo){    
    searchedTodo.title = title;
    const todos = todoStore.get()
    todos.splice(indexOfTodo,1,searchedTodo);
    todoStore.set(todos)
  }
  return searchedTodo;
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

// function to refactor todo.js
function changeTodoWithId(store,idString){
  const todos = store.get();
  const id = Number(idString);
  
  let searchedTodo = null;
  let indexOfTodo = null;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === id) {
      searchedTodo = todo;
      indexOfTodo = i;
    }
  }
  
  return {searchedTodo,indexOfTodo};
}
