import React from "react";
import { AiOutlineCheck, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export default function Item({ item, quantity, listItems, setListItems, id, editActive, completed, filteredItems, setFilteredItems }) {
  function completeItem(id) {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  }

  function handlePlus(id) {
    const plusState = listItems.map((item) => {
      if (item.id === id && !completed) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setListItems(plusState);
  }

  function handleMinus(id) {
    const minusState = listItems.map((item) => {
      if (item.id === id && !completed) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setListItems(minusState);
  }

  function deleteItem(id) {
    setListItems(listItems.filter((item) => item.id !== id));
  }

  function editName(id) {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          const newItemName = prompt("Nuevo Nombre:");
          const newItemToUpper = newItemName[0].toUpperCase() + newItemName.slice(1).toLowerCase();
          return { ...item, name: newItemToUpper };
        }
        return item;
      })
    );
  }

  return (
    <div className={editActive ? "trash-and-item-container" : ""}>
      <div onClick={() => deleteItem(id)} className="trash">
        {editActive && <AiFillDelete className="trash-icon" />}
      </div>
      <div className="item-container">
        <div className="complete-and-p">
          <div onClick={() => completeItem(id)} className="completition">
            {completed && <BsCheckLg className="check-icon" />}
          </div>
          <p onClick={editActive ? () => editName(id) : () => completeItem(id)} className={completed ? "item-text item-completed" : "item-text"}>
            {item}
          </p>
          {editActive && <MdOutlineEdit className="edit-name-icon" onClick={() => editName(id)} />}
        </div>
        <div className="quantity-container">
          {quantity <= 1 && <div className="placehoder-for-minus"></div>}
          {quantity > 1 && <AiOutlineMinus onClick={() => handleMinus(id)} className="quantity-icons" />}
          <p className="quantity-counter">{quantity}</p>
          <AiOutlinePlus onClick={() => handlePlus(id)} className="quantity-icons" />
        </div>
      </div>
    </div>
  );
}
