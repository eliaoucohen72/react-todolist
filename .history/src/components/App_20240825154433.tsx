import { useEffect, useState } from "react";
import "..styles";
import { Todo } from "../interfaces";
import { getFromLocalStorage, setToLocalStorage } from "../utils";

const initNewTodo = (): Todo => ({
  name: "",
  description: "",
  isDone: false,
  ts: Date.now(),
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>(initNewTodo());
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const ls = getFromLocalStorage("todos");
    setTodos(ls ? JSON.parse(ls) : [initNewTodo()]);
  }, []);

  const updateTodos = (updatedTodos: Todo[]) => {
    setToLocalStorage("todos", updatedTodos);
    setTodos(updatedTodos);
  };

  const addTodo = () => {
    updateTodos([...todos, { ...newTodo, ts: Date.now() }]);
    setNewTodo(initNewTodo());
  };

  const removeTodo = (todo: Todo) => {
    updateTodos(todos.filter((e) => e.ts !== todo.ts));
  };

  const editTodo = (todo: Todo) => {
    setEditedTodo(todo);
  };

  const saveChanges = () => {
    if (editedTodo) {
      updateTodos(
        todos.map((e) => (e.ts === editedTodo.ts ? { ...editedTodo } : e))
      );
      setEditedTodo(null);
    }
  };

  const changeTodoStatus = (todo: Todo) => {
    updateTodos(
      todos.map((e) =>
        e.ts === todo.ts ? { ...todo, isDone: !todo.isDone } : e
      )
    );
  };

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
            <tr key={e.ts}>
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
        </tbody>
      </table>
    </div>
  );
}

export default App;
