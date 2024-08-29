import { useCallback, useEffect, useState } from "react";
import "../styles/App.css";
import { Todo } from "../interfaces";
import { getFromLocalStorage, setToLocalStorage } from "../utils";
import TodoItem from "./TodoItem";

const initNewTodo = (): Todo => ({
  name: "",
  description: "",
  isDone: false,
  ts: Date.now(),
});

const generateFakeData = (count: number) => {
  const fakeData = [];
  for (let i = 0; i < count; i++) {
    fakeData.push({
      name: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      isDone: Math.random() > 0.5,
      ts: Date.now() + i,
    });
  }
  return fakeData;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>(initNewTodo());
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [removingTodo, setRemovingTodo] = useState<number | null>(null);

  useEffect(() => {
    const list = generateFakeData(100);
    setTodos(JSON.stringify(list));
  }, []);

  const updateTodos = useCallback((updatedTodos: Todo[]) => {
    setToLocalStorage("todos", updatedTodos);
    setTodos(updatedTodos);
  }, []);

  const addTodo = () => {
    updateTodos([...todos, { ...newTodo, ts: Date.now() }]);
    setNewTodo(initNewTodo());
  };

  const removeTodo = useCallback(
    (todo: Todo) => {
      setRemovingTodo(todo.ts);
      setTimeout(() => {
        updateTodos(todos.filter((e) => e.ts !== todo.ts));
        setRemovingTodo(null);
      }, 500);
    },
    [todos, updateTodos]
  );

  const editTodo = useCallback((todo: Todo) => {
    setEditedTodo(todo);
  }, []);

  const saveChanges = useCallback(() => {
    if (editedTodo) {
      updateTodos(
        todos.map((e) => (e.ts === editedTodo.ts ? { ...editedTodo } : e))
      );
      setEditedTodo(null);
    }
  }, [editedTodo, todos, updateTodos]);

  const changeTodoStatus = useCallback(
    (todo: Todo) => {
      updateTodos(
        todos.map((e) =>
          e.ts === todo.ts ? { ...todo, isDone: !todo.isDone } : e
        )
      );
    },
    [todos, updateTodos]
  );

  const cancelEditMode = () => setEditedTodo(null);

  return (
    <div className="app-container">
      <div className="input-group">
        <input
          placeholder="Name"
          value={newTodo.name}
          onChange={(event) =>
            setNewTodo({ ...newTodo, name: event.target.value })
          }
        />
        <input
          placeholder="Description"
          value={newTodo.description}
          onChange={(event) =>
            setNewTodo({ ...newTodo, description: event.target.value })
          }
        />
        <button
          disabled={!newTodo.name || !newTodo.description}
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Is done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((e) => (
            <TodoItem
              key={e.ts}
              todo={e}
              editedTodo={editedTodo}
              removingTodo={removingTodo}
              setEditedTodo={setEditedTodo}
              changeTodoStatus={changeTodoStatus}
              editTodo={editTodo}
              removeTodo={removeTodo}
              saveChanges={saveChanges}
              cancelEditMode={cancelEditMode}
            />
          ))}
        </tbody>
        {/* <tbody>
          {todos.map((e) => (
            <tr key={e.ts} className={removingTodo === e.ts ? "exploding" : ""}>
              <td>
                {editedTodo?.ts === e.ts ? (
                  <input
                    value={editedTodo.name}
                    onChange={(event) =>
                      setEditedTodo({
                        ...editedTodo,
                        name: event.target.value,
                      })
                    }
                  />
                ) : (
                  e.name
                )}
              </td>
              <td>
                {editedTodo?.ts === e.ts ? (
                  <input
                    value={editedTodo.description}
                    onChange={(event) =>
                      setEditedTodo({
                        ...editedTodo,
                        description: event.target.value,
                      })
                    }
                  />
                ) : (
                  e.description
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => changeTodoStatus(e)}
                  checked={e.isDone}
                />
              </td>
              <td>
                {editedTodo?.ts === e.ts ? (
                  <>
                    <button onClick={saveChanges}>Save changes</button>
                    <button onClick={cancelEditMode}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editTodo(e)}>Edit</button>
                    <button onClick={() => removeTodo(e)}>Remove</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default App;
