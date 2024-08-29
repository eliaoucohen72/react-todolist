import React from "react";
import { Todo } from "../interfaces";
import "../styles/App.css";

type TodoItemProps = {
  todo: Todo;
  editedTodo: Todo | null;
  removingTodo: Todo | null;
  setEditedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  changeTodoStatus: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  saveChanges: () => void;
  cancelEditMode: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editedTodo,
  removingTodo,
  setEditedTodo,
  changeTodoStatus,
  editTodo,
  removeTodo,
  saveChanges,
  cancelEditMode,
}) => {
  return (
    <tr key={todo.ts} className={removingTodo === todo.ts ? "exploding" : ""}>
      <td>
        {editedTodo?.ts === todo.ts ? (
          <input
            value={editedTodo.name}
            onChange={(event) =>
              setEditedTodo({
                ...editedTodo,
                name: event.target.value,
              })
            }
          />
        ) : (
          todo.name
        )}
      </td>
      <td>
        {editedTodo?.ts === todo.ts ? (
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
          todo.description
        )}
      </td>
      <td>
        <input
          type="checkbox"
          onChange={() => changeTodoStatus(todo)}
          checked={todo.isDone}
        />
      </td>
      <td>
        {editedTodo?.ts === todo.ts ? (
          <>
            <button onClick={saveChanges}>Save changes</button>
            <button onClick={cancelEditMode}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => removeTodo(todo)}>Remove</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default React.memo(TodoItem);
