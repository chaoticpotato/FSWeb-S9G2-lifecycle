import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import TodoList from "./TodoList";

/*
POSTMAN ÖRNEK GÖRSELLERİ images KLASÖRÜNDE
*/

/*
Önceden şöyle yapıyorduk:
Stateten verileri göstermek - değişiklik olduğunda statei güncellemek

Backend sisteme dahil olduğunda şöyle yapacağız:
Verileri serverdan almak - state'e yazmak - değişiklikleri servera göndermek - serverdan güncellenmiş verileri almak - güncellenmiş verileri tekrar state yazmak
*/

/*
BAŞLANGIÇ: todo listesini serverdan almak
Önceden state içerisinde başlangıç değeri olarak verdiğimiz todo listesini bu sefer GET ile alacağız
1. todos state'i başlangıç değerine boş bir array veriyoruz
2. todolariGetir isminde bir fonksiyon yazıyoruz, bu fonksiyon axios ve GET ile todo listesini serverdan çekmemizi sağlayacak
3. todolariGetir fonksiyonunu useEffect içerisinde kullanıyoruz, ve yalnızca ilk renderda çalışması için dependency arrayi olarak boş bir array veriyoruz

YENİ TODO EKLEMEK
Yeni todo eklendiğinde bunu state içerisine eklemek yerine, servera gönderip yeni verileri tekrar serverdan çekeceğiz
1. handleSubmit içerisinde yeniTodo isminde bir obje oluşturuyoruz, tamamlandi değeri false, isim değeri ise Form'dan gelecek olan input alanı değeri.
2. Bu objeyi axios ve POST ile servera gönderiyoruz
3. Eğer bu işlem başarılıysa, todo listesini tekrar çekmek için todolariGetir fonksiyonunu tekrar çalıştırıyoruz

TODOYU TAMAMLANDI OLARAK İŞARETLEMEK
Readme dosyasından:
PATCH http://localhost:9000/api/todos/:id
  - Payload gerektirmez
  - URL'den gönderilen id üzerinde tamamlandi değişkenini günceller
  - 200 OK cevabı ile güncellenen todo yu döndürür
*/

export default function App() {
  const [hideDone, setHideDone] = useState(false);

  const [todos, setTodos] = useState([]);

  const todolariGetir = () => {
    axios
      .get("http://localhost:9000/api/todos")
      .then((res) => {
        setTodos(res.data.data);
      })
  }

  useEffect(() => {
    todolariGetir();
  }, [])

  // etütte elemanda Todo.js içerisinde yaptığımızı burada yapıyoruz
  const handleCheckItem = (id) => {
    axios
      .patch("http://localhost:9000/api/todos/" + id)
      .then(res => {
        if (res.status === 200) {
          todolariGetir();
        }
      })
  }

  // etütte elemanda Form.js içerisinde yaptığımızı burada yapıyoruz
  const handleSubmit = (yeni) => {
    const yeniTodo = {
      isim: yeni,
      tamamlandi: false
    }
    axios
      .post("http://localhost:9000/api/todos", yeniTodo)
      .then((res) => {
        if (res.status === 201) {
          // ekleme başarılı, todo listesini tekrar çek
          todolariGetir();
        } else {
          console.log("Todo ekleme başarısız")
        }
      });
  }

  const handleToggle = () => {
    setHideDone(!hideDone)
  }

  return (
    <>
      <TodoList
        list={hideDone ? todos.filter(oge => oge.tamamlandi !== true) : todos}
        checkItem={handleCheckItem}
      />

      <Form doSubmit={handleSubmit} />

      <button onClick={handleToggle}>
        Tamamlananları {hideDone ? "goster" : "gizle"}
      </button>
    </>
  );
}
