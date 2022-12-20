import React from "react";
import Todo from "./Todo";


export default function TodoList({ list, checkItem }) {
  return (
    <div>
      <ul>
        {list.map((todo) => (
          <Todo item={todo} key={todo.id} onCheck={checkItem} />
        ))}
      </ul>
    </div>
  );
}
