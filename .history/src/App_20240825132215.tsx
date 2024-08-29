import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    name: "",
    description: "",
    isDone: false,
  });

  const addTodo = () => setTodoList((p) => [...p, newTodo]);

  return (
    <div style={{ width: "100%", display: 'flex', flexDirection:'column' }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ width: "100%" }}
          value={newTodo.name}
          onChange={(event) =>
            setNewTodo({ ...newTodo, name: event.target.value })
          }
        />
        <input
          style={{ width: "100%" }}
          value={newTodo.description}
          onChange={(event) =>
            setNewTodo({ ...newTodo, description: event.target.value })
          }
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div style={{ display: "flex", border: "1px solid black" }}>
        <div style={{ flex: 1 }}>Name</div>
        <div style={{ flex: 2 }}>Description</div>
        <div style={{ flex: 1 }}>Is done</div>
      </div>
      {todoList?.map((e) => (
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>{e.name}</div>
          <div style={{ flex: 2 }}>{e.description}</div>
          <div style={{ flex: 1 }}>
            <input type="checkbox" checked={e.isDone} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
