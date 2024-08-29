import { useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [todoList, setList] = useState<Todo[]>();
  return <div style={{width: '100%', border: '1px solid black'}}>
{todoList?.map(e => <div></div>)}
  </div>;
}

export default App;
