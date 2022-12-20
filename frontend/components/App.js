import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import TodoList from "./TodoList";

export default function App() {
  const [hideDone, setHideDone] = useState(false);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/api/todos")
      .then((res) => {
        setTodos(res.data.data);
      })
  }, [])

  // etütte elemanda Todo.js içerisinde yaptığımızı burada yapıyoruz
  const handleCheckItem = (id) => {
    // todos arrayinin bir kopyasını oluştur
    const todosC = [...todos];
    // hangi ögeye tıklandı
    const ilgiliOge = todosC.filter(i => i.id === id)[0];
    // tıklanan ögenin tamamlandı değerini değiştir
    ilgiliOge.tamamlandi = !ilgiliOge.tamamlandi;
    // bu değişikliğe sahip arrayi todos statine yaz
    setTodos(todosC);
  }

  // etütte elemanda Form.js içerisinde yaptığımızı burada yapıyoruz
  const handleSubmit = (yeni) => {
    setTodos([
      ...todos,
      {
        isim: yeni,
        id: Date.now(),
        tamamlandi: false,
      },
    ]);
  }

  const handleToggle = () => {
    setHideDone(!hideDone)
  }

  return (
    <div>
      Todo App
      <h1>Todos</h1>
      <TodoList
        list={hideDone ? todos.filter(oge => oge.tamamlandi !== true) : todos}
        checkItem={handleCheckItem}

      />
      <Form doSubmit={handleSubmit} />

      <button onClick={handleToggle}>tamamlananları gizle</button>
    </div>
  );
}
