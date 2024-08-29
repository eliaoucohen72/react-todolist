import { useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>();
  return (
    <div style={{ width: "100%", border: "1px solid black" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>Name</div>
        <div style={{ flex: 2 }}>Description</div>
        <div style={{ flex: 1 }}>Is done</div>
      </div>
      {todoList?.map((e) => (
        <div></div>
      ))}
    </div>
  );
}

export default App;
