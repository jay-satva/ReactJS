import { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItem";

function Dashboard() {
  const [items, setItems] = useState([
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Mango" },
  { id: 4, name: "Orange" },
  { id: 5, name: "Grapes" },
  { id: 6, name: "Pineapple" },
  { id: 7, name: "Strawberry" },
  { id: 8, name: "Watermelon" },
  { id: 9, name: "Papaya" },
  { id: 10, name: "Kiwi" },
])

  const [time, setTime] = useState()

  useEffect(() => {
     setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [])

  const deleteItem = useCallback((id) => {
    setItems(prev =>
      prev.filter(item => item.id !== id)
    )
  }, [])

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Current Time: {time}</p>

      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
}

export default Dashboard
