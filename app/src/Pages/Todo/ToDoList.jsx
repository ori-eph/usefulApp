import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

function ToDoList() {
  const [list, setList] = useState([]);
  const [err, setErr] = useState(null);
  const [newItem, setNewItem] = useState("");
  const sortOrderRef = useRef("date");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    async function getUserList() {
      console.log(`http://localhost:3000/users/${user.id}/todos`);
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/todos`
      );
      if (!response.ok) {
        throw Error("A loading error has accrued, please try again later.");
      }
      const data = await response.json();
      return data;
    }

    async function makeList() {
      try {
        const listTemp = await getUserList();
        console.log(listTemp);
        setList(listTemp);
      } catch (err) {
        console.log(err);
      }
    }

    makeList();
  }, []);

  async function handleRemoveItem(index, id) {
    setList((prev) => {
      return prev.filter((item, i) => i !== index);
    });
    try {
      const deleteItem = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!deleteItem.ok) {
        throw Error(
          "an error has accrued, please reload the page and try agin."
        );
      }
    } catch (err) {
      setErr(err);
    }
  }

  function handleCheckItem(id) {
    setList((prev) => {
      const updatedList = prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
      handleSortChange(updatedList);
      return updatedList;
    });
  }

  function handleSortChange(listToSort) {
    const order = sortOrderRef.current.value;
    let sortedList = Array.isArray(listToSort) ? [...listToSort] : [...list];

    if (order === "A-Z") {
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "Z-A") {
      sortedList.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === "date") {
      sortedList.sort((a, b) => a.id - b.id);
    } else if (order === "importance") {
      sortedList.sort((a, b) => a.completed - b.completed);
    }

    setList(sortedList);
  }

  async function addItem(e) {
    //not complete:
    e.preventDefault();
    const newItemObj = {
      title: newItem,
      userId: user.id,
      completed: false,
    };
    try {
      const result = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItemObj),
      });
      const savedItem = await result.json();
      setList((prev) => [...prev, savedItem]);
    } catch (err) {
      setErr(err);
    }
  }

  return (
    <>
      <form onSubmit={addItem}>
        <label htmlFor="item">add an item:</label>
        <input
          name="item"
          type="text"
          placeholder="item..."
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button>+</button>
      </form>
      <h1>Your to do list:</h1>
      <label htmlFor="sortOrder">Sort by: </label>
      <select ref={sortOrderRef} id="sortOrder" onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="importance">importance</option>
      </select>
      {list.length && (
        <ul>
          {list.map((item, index) => {
            return (
              <li key={item.id}>
                {
                  <TodoItem
                    err={err}
                    item={item}
                    removeItem={() => {
                      handleRemoveItem(index, item.id);
                    }}
                    sortBy={sortOrderRef.current.value}
                    sortList={handleSortChange}
                    checkItem={() => handleCheckItem(item.id)}
                  />
                }
              </li>
            );
          })}
        </ul>
      )}
      {err && <p>{err.message}</p>}
    </>
  );
}

export default ToDoList;
