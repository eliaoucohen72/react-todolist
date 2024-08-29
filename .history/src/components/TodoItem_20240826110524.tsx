import React from "react";
import { Todo } from "../interfaces";
import "../styles/App.css";

type TodoItemProps = {
  todo: Todo;
  editedTodo: Todo | null;
  removingTodo: number | null;
  setEditedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  changeTodoStatus: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
  saveChanges: () => void;
  cancelEditMode: () => void;
  onDragStart: (
    event: React.DragEvent<HTMLTableRowElement>,
    todo: Todo
  ) => void;
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
  onDragStart,
}) => {
  return (
    <tr
      key={todo.ts}
      className={removingTodo === todo.ts ? "exploding" : ""}
      draggable
      onDragStart={(event) => onDragStart(event, todo)}
    >
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
      <td style={{ float: "right" }}>
        <div>
          {editedTodo?.ts === todo.ts ? (
            <>
              <button onClick={() => changeTodoStatus(todo)}>
                {todo.isDone ? "Mark as todo" : "Mark as done"}
              </button>
              <button onClick={saveChanges}>Save changes</button>
              <button onClick={cancelEditMode}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => changeTodoStatus(todo)}>
                {todo.isDone ? "Mark as todo" : "Mark as done"}
              </button>
              <button onClick={() => editTodo(todo)}>Edit</button>
              <button onClick={() => removeTodo(todo)}>Remove</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(TodoItem);
