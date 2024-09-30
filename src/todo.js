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

  const todos = store.get();
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id == id) {
      if (todo.done === true) throw new AppError("This Todo is already completed!");
      else {
        todo.done = true;
        const toStore = [...todos];
        store.set(toStore);
        return todo;
      }
    }
  }

  throw new AppError('Todo does not exist with the provided ID!');
}