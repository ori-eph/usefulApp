import { handleServerRequest } from "../../utils";

function TodoItem({ item, removeItem, checkItem, setErr }) {
  async function handleCheck() {
    checkItem();
    try {
      await handleServerRequest(`http://localhost:3000/todos/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !item.completed }),
      });
    } catch (err) {
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
