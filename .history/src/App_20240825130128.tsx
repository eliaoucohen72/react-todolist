import { useState } from "react";
import "./App.css";

interface Todo {
  name: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [list, setList] = useState<Todo[]>();
  return <></>;
}

export default App;
