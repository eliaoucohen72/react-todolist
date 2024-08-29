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

  const editItem = (event, state: string) =>  setEditedTodo(p => ({...p, [state]: event.target.value}))

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
          <tr key={index}>
            <td>
              {editedTodo ? (
                <input
                  value={editedTodo.name}
                  onChange={event => editItem(event, 'name')}
                  checked={e.isDone}
                />
              ) : (
                e.name
              )}
            </td>
            <td>{e.description}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => changeTodoStatus(e)}
                checked={e.isDone}
              />
            </td>
            <td>
              <button onClick={() => removeTodo(e)}>Remove</button>
            </td>
            <td>
              <button onClick={() => editTodo(e)}>Edit</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
