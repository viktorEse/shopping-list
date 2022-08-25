import React from "react";
import Item from "./components/Item";
import Form from "./components/Form";

export default function App() {
  const [userInput, setUserInput] = React.useState("");
  const [listItems, setListItems] = React.useState([]);
  const [editActive, setEditActive] = React.useState(false);
  const [filterActive, setFilterActive] = React.useState(false);
  const [storageCleared, setStorageCleared] = React.useState(false);
  const [status, setStatus] = React.useState("all");
  const [filteredItems, setFilteredItems] = React.useState([]);

  React.useEffect(() => {
    const check = localStorage.getItem("listItems");
    if (check) {
      setListItems(JSON.parse(check));
    }
  }, []);

  React.useEffect(() => {
    if (listItems.length < 1) {
      setEditActive(false);
    }
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

  React.useEffect(() => {
    filterHandler();
  }, [listItems, status]);

  function filterHandler() {
    switch (status) {
      case "completed":
        setFilteredItems(listItems.filter((item) => item.completed === true));
        break;
      case "uncompleted":
        setFilteredItems(listItems.filter((item) => item.completed === false));
        break;
      default:
        setFilteredItems(listItems);
        break;
    }
  }

  return (
    <div className="App">
      <div className="form-container">
        <Form
          userInput={userInput}
          setUserInput={setUserInput}
          listItems={listItems}
          setListItems={setListItems}
          editActive={editActive}
          setEditActive={setEditActive}
          storageCleared={storageCleared}
          setStorageCleared={setStorageCleared}
          setStatus={setStatus}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
        />
        <div className="items">
          {filteredItems.map((item) => {
            return (
              <Item
                editActive={editActive}
                key={item.id}
                id={item.id}
                listItems={listItems}
                setListItems={setListItems}
                item={item.name}
                quantity={item.quantity}
                completed={item.completed}
                setFilteredItems={setFilteredItems}
                filteredItems={filteredItems}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
