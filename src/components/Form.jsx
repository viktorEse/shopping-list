import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

export default function Form({
  userInput,
  setUserInput,
  listItems,
  setListItems,
  editActive,
  setEditActive,
  storageCleared,
  setStorageCleared,
  setStatus,
  filterActive,
  setFilterActive,
}) {
  function handleChange(e) {
    setUserInput(e.target.value);
  }

  function clearStorage() {
    localStorage.clear();
    setStorageCleared(true);
    setTimeout(() => {
      document.location.reload();
    }, 3000);
  }

  function addItem(e) {
    e.preventDefault();
    const firstCapitalized = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
    if (userInput.length > 0) {
      const newItem = { name: firstCapitalized, completed: false, quantity: 1, id: Math.floor(Math.random() * 10000) };
      setListItems((prevItems) => {
        return [newItem, ...prevItems];
      });
    }
    setUserInput("");
  }

  function handleSelect(e) {
    setStatus(e.target.value);
  }

  function handleEdit() {
    if (listItems.length < 1) {
      return;
    }
    setEditActive(!editActive);
  }

  function toggleFilter() {
    setFilterActive(!filterActive);
  }

  return (
    <div>
      <div>
        <p onClick={handleEdit} className="edit">
          {editActive ? "Dejar de editar" : "Editar"} {<MdOutlineEdit />}
        </p>
        <p onClick={clearStorage} className="clear-storage">
          {storageCleared ? "Espera 3seg" : "Borrar Todo"}
        </p>
        <div onClick={toggleFilter} className="filter">
          {filterActive && <span></span>}
          <FaFilter className="filter-icon" />
        </div>
      </div>
      <form className="input-and-button">
        <input onChange={handleChange} name="userInput" value={userInput} type="text" placeholder="¿Qué vas a comprar?" />
        <button onClick={addItem} className="add-item-btn" type="submit">
          <AiOutlinePlus className="plus-icon-item" />
        </button>
        {filterActive && (
          <select onChange={handleSelect} name="items" className="select-option-bar">
            <option value="all">Todos</option>
            <option value="completed">Comprados</option>
            <option value="uncompleted">Falta Comprar</option>
          </select>
        )}
      </form>
    </div>
  );
}
