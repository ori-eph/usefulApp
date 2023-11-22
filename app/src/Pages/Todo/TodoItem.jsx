function TodoItem({ item, removeItem, checkItem, setErr }) {
  async function handleCheck() {
    checkItem();
    try {
      const updateItem = await fetch(`http://localhost:3000/todos/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !item.completed }),
      });
      if (!updateItem.ok) {
        throw Error(
          "an error has accrued, please reload the page and try agin."
        );
      }
    } catch (err) {
      console.log("err!");
      setErr(err);
    }
  }
  return (
    <>
      <div>
        <h2>{item.title}</h2>
        <h4>{item.id}</h4>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleCheck}
        />
        <button onClick={removeItem}>trash</button>
      </div>
    </>
  );
}
export default TodoItem;
