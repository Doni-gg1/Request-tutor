import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ItemContext } from "./context/ItemContext";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState({title: '', id: null});
  const { mood } = useContext(ItemContext);

  console.log(mood)

  function createItem() {
    fetch(process.env.REACT_APP_MAIN_URL, {
      ...options,
      body: JSON.stringify({ title: value }),
    })
      .then((response) => response.json())
      .then((data) => getItems());
  }

  function getItems() {
    fetch(process.env.REACT_APP_MAIN_URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  function deleteItem(id) {
    fetch(process.env.REACT_APP_MAIN_URL + `/${id}`, {
      ...options,
      method: "DELETE",
    }).then((response) => getItems());
  }

  function editItem() {
    fetch(process.env.REACT_APP_MAIN_URL + `/${editValue.id}`, {
      ...options,
      method: "PATCH",
      body: JSON.stringify({ title: editValue.title }),
    }).then(() => getItems())
  }

  function onEdit(id, title) {
    setEditValue( {id, title} )
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => createItem()}>Create Item</button>
      </div>
      <div>
        <input
          value={editValue.title}
          onChange={(event) => setEditValue({...editValue, title: event.target.value})}
        />
        <button onClick={() => editItem()}>Save Item</button>
      </div>
      {data?.map(({ id, title }) => (
        <h3 key={id} onDoubleClick={() => deleteItem(id)} onClick={() => onEdit(id, title)}>
          {title}
        </h3>
      ))}
    </div>
  );
}

export default App;
