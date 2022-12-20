import React from 'react'

export default function Todo(props) {
  const { item, onCheck } = props;

  const handleClick = () => {
    onCheck(item.id)
  }


  return (
    <li className="test" onClick={handleClick}>
      {item.isim} {item.tamamlandi ? "(ok)" : ""}
    </li>
  )
}
