import { useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [list, setList] = useState<Todo[]>();
  return <div style={{width: '100%'}}>

  </div>;
}

export default App;
