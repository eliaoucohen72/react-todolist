import React from "react";
import { Todo } from "../interfaces";

type CreateTodoProps = {
  newTodo: Todo;
  setNewTodo: React.Dispatch<React.SetStateAction<Todo>>;
  addTodo: () => void;
};

const CreateTodo: React.FC<CreateTodoProps> = ({
  newTodo,
  setNewTodo,
  addTodo,
}) => {
  return (
    <div className="input-group">
      <input
        placeholder="Name"
        value={newTodo.name}
        onChange={(event) =>
          setNewTodo({ ...newTodo, name: event.target.value })
        }
      />
      <input
        className="description"
        placeholder="Description"
        value={newTodo.description}
        onChange={(event) =>
          setNewTodo({ ...newTodo, description: event.target.value })
        }
      />
      <button
        disabled={!newTodo.name || !newTodo.description}
        onClick={addTodo}
      >
        Add
      </button>
    </div>
  );
};

export default React.memo(CreateTodo);
