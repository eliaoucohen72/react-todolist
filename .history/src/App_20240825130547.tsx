import { useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>();
  return <div style={{width: '100%', border: '1px solid black'}}>
    <div style={{display: 'flex',}}>
      <div style={{}}>Name</div>
      <div style={{}}>Description</div>
      <div style={{}}>Is done</div>
    </div>
{todoList?.map(e => <div></div>)}
  </div>;
}

export default App;
