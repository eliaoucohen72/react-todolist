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
        <button onClick={addTodo}>Add</button>
      </div>
      <div style={{ border: "1px solid black" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>Number</div>
          <div style={{ flex: 1 }}>Name</div>
          <div style={{ flex: 2 }}>Description</div>
          <div style={{ flex: 1 }}>Is done</div>
        </div>
        {todos?.map((e: Todo, index: number) => (
          <div key={index} style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>{index + 1}</div>
            <div style={{ flex: 1 }}>{e.name}</div>
            <div style={{ flex: 2 }}>{e.description}</div>
            <div style={{ flex: 1 }}>
              <input
                type="checkbox"
                onChange={() => changeTodoStatus(e)}
                checked={e.isDone}
              />
            </div>
            <button onClick={() => removeTodo(e)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
