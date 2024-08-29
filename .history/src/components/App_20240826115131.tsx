import { useCallback, useEffect, useState } from "react";
import "../styles/App.css";
import { Todo } from "../interfaces";
import { saveToLocalStorage } from "../utils";
import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";

const initNewTodo = (): Todo => ({
  name: "",
  description: "",
  isDone: false,
  ts: Date.now(),
});

const generateFakeData = (count: number) => {
  const fakeData = [];
  for (let i = 0; i < count; i++) {
    fakeData.push({
      name: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      isDone: Math.random() > 0.5,
      ts: Date.now() + i,
    });
  }
  return fakeData;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>(initNewTodo());
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [removingTodo, setRemovingTodo] = useState<number | null>(null);

  useEffect(() => {
    const list = generateFakeData(5);
    setTodos(list);
    saveToLocalStorage("todos", list);
  }, []);

  const updateTodos = useCallback((updatedTodos: Todo[]) => {
    saveToLocalStorage("todos", updatedTodos);
    setTodos(updatedTodos);
  }, []);

  const addTodo = () => {
    updateTodos([...todos, { ...newTodo, ts: Date.now() }]);
    setNewTodo(initNewTodo());
  };

  const removeTodo = useCallback(
    (todo: Todo) => {
      setRemovingTodo(todo.ts);
      setTimeout(() => {
        updateTodos(todos.filter((e) => e.ts !== todo.ts));
        setRemovingTodo(null);
      }, 500);
    },
    [todos, updateTodos]
  );

  const editTodo = useCallback((todo: Todo) => {
    setEditedTodo(todo);
  }, []);

  const saveChanges = useCallback(() => {
    if (editedTodo) {
      updateTodos(
        todos.map((e) => (e.ts === editedTodo.ts ? { ...editedTodo } : e))
      );
      setEditedTodo(null);
    }
  }, [editedTodo, todos, updateTodos]);

  const changeTodoStatus = useCallback(
    (todo: Todo) => {
      updateTodos(
        todos.map((e) =>
          e.ts === todo.ts ? { ...todo, isDone: !todo.isDone } : e
        )
      );
    },
    [todos, updateTodos]
  );

  const cancelEditMode = () => setEditedTodo(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLTableRowElement>,
    todo: Todo
  ) => {
    event.dataTransfer.setData("todo-ts", todo.ts.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetIsDone: boolean
  ) => {
    event.preventDefault();
    const ts = parseInt(event.dataTransfer.getData("todo-ts"), 10);
    const todo = todos.find((e) => e.ts === ts);

    if (todo && todo.isDone !== targetIsDone) {
      const updatedTodo = { ...todo, isDone: targetIsDone };
      updateTodos(todos.map((e) => (e.ts === todo.ts ? updatedTodo : e)));
    }
  };

  const renderedTodos = (
    category: "TODO" | "DONE",
    list: Todo[],
    targetIsDone: boolean
  ) => (
    <>
      <div className="category">{category}</div>
      <table
        onDrop={(event) => handleDrop(event, targetIsDone)}
        onDragOver={(event) => event.preventDefault()}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th />Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <TodoItem
              key={e.ts}
              todo={e}
              editedTodo={editedTodo}
              removingTodo={removingTodo}
              setEditedTodo={setEditedTodo}
              changeTodoStatus={changeTodoStatus}
              editTodo={editTodo}
              removeTodo={removeTodo}
              saveChanges={saveChanges}
              cancelEditMode={cancelEditMode}
              onDragStart={handleDragStart}
            />
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="app-container">
      <CreateTodo addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
      {renderedTodos(
        "TODO",
        todos.filter((e) => !e.isDone),
        false
      )}
      {renderedTodos(
        "DONE",
        todos.filter((e) => e.isDone),
        true
      )}
    </div>
  );
};

export default App;
