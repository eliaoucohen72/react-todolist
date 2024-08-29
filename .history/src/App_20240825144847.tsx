import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./interfaces";
import { getFromLocalStorage, setToLocalStorage } from "./utils";

const initNewTodo = () => ({
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
    if (!ls) {
      setTodos([initNewTodo()]);
    } else {
      setTodos(JSON.parse(ls));
    }
  }, []);

  const addTodo = () => {
    setTodos((p) => {
      const list: Todo[] = [...p, { ...newTodo, ts: Date.now() }];
      setToLocalStorage("todos", list);
      setNewTodo(initNewTodo());
      return list;
    });
  };

  const removeTodo = (todo: Todo) => {
    setTodos((todos) => {
      const list: Todo[] = todos.filter((e) => e.ts !== todo.ts);
      setToLocalStorage("todos", list);
      return list;
    });
  };

  const editTodo = (todo: Todo) => {
    setEditedTodo(todo);
  };

  const changeTodoStatus = (todo: Todo) => {
    setTodos((todos) => {
      const list: Todo[] = [
        ...todos.filter((e) => e.ts !== e.ts),
        { ...todo, isDone: !todo.isDone },
      ];
      setToLocalStorage("todos", list);
      return list;
    });
  };

  const cancelEditMode = () => setEditedTodo(null);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Name"
          style={{ width: "100%" }}
          value={newTodo.name}
          onChange={(event) =>
            setNewTodo({ ...newTodo, name: event.target.value })
          }
        />
        <input
          placeholder="Description"
          style={{ width: "100%" }}
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
      <table style={{ width: "100%" }}>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Is done</th>
          <th></th>
          <th></th>
        </tr>
        {todos?.map((e: Todo, index: number) => (
      <table style={{ width: "100%" }}>
          <tr key={index}>
            <td>
              {editedTodo ? (
                <input
                  value={editedTodo.name}
                  onChange={(event) =>
                    setEditedTodo({ ...editedTodo, name: event.target.value })
                  }
                />
              ) : (
                e.name
              )}
            </td>
            <td>
              {editedTodo ? (
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
              {editedTodo ? (
                <button onClick={() => cancelEditMode()}>Cancel</button>
              ) : (
                <button onClick={() => removeTodo(e)}>Remove</button>
              )}
            </td>
            <td>
              {editedTodo && <button onClick={() => editTodo(e)}>Edit</button>}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
