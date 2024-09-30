import { jest } from '@jest/globals';
import { add, complete, format, formatList, list, findById, rename, findByStatus, remove } from './todo.js';


function createMockStore(data) {
  return {
    get: jest.fn(() => data),
    set: jest.fn()
  }
}

describe('format', () => {
  it('should format a not done todo', () => {
    const todo = { title: 'todo title', id: 1, done: false };
    const expected = '1 - [ ] todo title';

    const current = format(todo)

    expect(current).toStrictEqual(expected)
  })

  it('should format a done todo', () => {
    const todo = { title: 'todo title', id: 1, done: true };
    const expected = '1 - [x] todo title';

    const current = format(todo)

    expect(current).toStrictEqual(expected)
  });
});

describe('formatList', () => {
  it('should format a list of todos', () => {
    const todos = [
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ];
    const expected = [
      '1 - [x] todo title',
      '2 - [ ] todo title 2'
    ];

    const current = formatList(todos)

    expect(current).toStrictEqual(expected)
  }),

    it('should return an empty list, if an empty list is given', () => {
      const todos = [];
      const expected = [];

      const current = formatList(todos)

      expect(current).toStrictEqual(expected)
    });
});

describe('list', () => {
  it('should list the todos', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ])
    const expected = [
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  })

  it('should return an empty list, if nothing is stored', () => {
    const mockStore = createMockStore([])
    const expected = [];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  })
})

describe('add', () => {
  it('should add a new todo to an empty store, done false, id is 1', () => {
    const params = ['New Todo'];
    const mockStore = createMockStore([]);
    const expected = {
      id: 1,
      done: false,
      title: 'New Todo'
    }

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0])
      .toStrictEqual([expected]);
  });

  it('should append a new todo to the existing items', () => {
    const params = ['New Todo'];
    const stored = [{id: 1, title: 'Todo 1', done: true}];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 2,
      done: false,
      title: 'New Todo'
    }

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0])
      .toStrictEqual([...stored, expected]);
  });

  it('should calculate the id by max id + 1, missing ids in a sequence', () => {
    const params = ['New Todo'];
    const stored = [
      {id: 2, title: 'Todo 1', done: true},
      {id: 4, title: 'Todo 1', done: true},
    ];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 5,
      done: false,
      title: 'New Todo'
    }

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0])
      .toStrictEqual([...stored, expected]);
  });
});


describe('complete', () => {
  it('should change the preferred todo to completed', () => {
    const params = 1;
    const mockStore = createMockStore([{
      id: 1,
      done: false,
      title: 'New Todo'
    }]);
    
    const expected = {
      id: 1,
      done: true,
      title: 'New Todo'
    }
    
    const current = complete(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0])
      .toStrictEqual([expected]);
  });

  it('should throw if the selected todo is already completed', () => {
    const params = 1;
    const mockStore = createMockStore([{
      id: 1,
      done: true,
      title: 'New Todo'
    }]);

    expect(() => complete(mockStore, params))
      .toThrow('This Todo is already completed!');
  });

  it('should throw an AppError if the ID is not found', () => {
    const params = 3;
    const mockStore = createMockStore([{
      id: 1,
      done: true,
      title: 'New Todo'
    }]);

    expect(() => complete(mockStore, params))
      .toThrow('Todo does not exist with the provided ID!');
  });
  
});

describe('delete', () => {
  it('should delete the preferred todo', () => {
    const params = 1;
    const mockStore = createMockStore([{
      id: 1,
      done: false,
      title: 'Old Todo'
    },
    {
      id: 2,
      done: true,
      title: 'New Todo'
    }]);
    
    const expectedToRemove = {
      id: 1,
      done: false,
      title: 'Old Todo'
    };
    const expectedToBeInMockStore = {
      id: 2,
      done: true,
      title: 'New Todo'
    };
    
    const current = remove(mockStore, params);

    expect(current).toStrictEqual(expectedToRemove);
    expect(mockStore.set.mock.calls[0][0])
      .toStrictEqual([expectedToBeInMockStore]);
  });

  it('should throw an AppError if the ID is not found', () => {
    const params = 3;
    const mockStore = createMockStore([{
      id: 1,
      done: true,
      title: 'New Todo'
    }]);

    expect(() => remove(mockStore, params))
      .toThrow('Todo does not exist with the provided ID!');
  });
  
});

describe('findById', () => {
  it('should return the correct todo when the ID exists', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ]);

    const current = findById(mockStore, 1);

    expect(current).toStrictEqual({ id: 1, title: 'Todo 1', done: false });
  });
  it('should throw an AppError if the ID does not exist', () => {
    const mockStore = createMockStore([{ id: 1, title: 'Todo 1', done: false }]);

    const testId = 3;
  
    expect(() => findById(mockStore, testId))
      .toThrow(`There is no todo with id: ${testId}`);
  });
  
});

describe('rename', () => {
  it('should change the title of a todo of a given ID, if it exists', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ])
    rename(mockStore, ['1', 'Changed title']);
    const expected = [
      { id: 1, title: 'Changed title', done: false },
      { id: 2, title: 'Todo 2', done: true }
      ];
    const current = list(mockStore);
    expect(current).toStrictEqual(expected);
  });
  
  it('should return the changed todo to show it to the user', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ])
    const current = rename(mockStore, ['1', 'Changed title']);
    const expected = { id: 1, title: 'Changed title', done: false };
    expect(current).toStrictEqual(expected);
  });

});

describe('findByStatus', () => {
  it('should return todos with done status', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ]);

    const current = findByStatus(mockStore, 'done');

    expect(current).toStrictEqual([{ id: 2, title: 'Todo 2', done: true }]);
  });

  it('should return todos with not-done status', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true }
    ]);

    const current = findByStatus(mockStore, 'not-done');

    expect(current).toStrictEqual([{ id: 1, title: 'Todo 1', done: false }]);
  });

  it('should throw an error if no todos match the status', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false }
    ]);

    expect(() => findByStatus(mockStore, 'done'))
      .toThrow("No todos found with status: done");
  });
});
