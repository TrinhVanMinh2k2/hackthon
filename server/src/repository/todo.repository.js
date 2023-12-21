const db = require("../config/db.config");

//thêm todo
async function addTodos(nameTodo) {
  // console.log(discrible);
  const [result] = await db.execute("INSERT INTO todos (nameTodo) values (?)", [
    nameTodo,
  ]);
  return result;
}

//render todo
async function renderTodo(nameTodo) {
  const [result] = await db.execute("select * from todos");
  return result;
}

//xóa todo
async function deleteTodo(id) {
  const [result] = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  return result;
}
//sửa
async function update( id, status) {
  const [result] = await db.execute(
    "UPDATE todos SET status = ? where id = ?",
    [ "true" , id]
  );
  return result;
}

module.exports = {
  addTodos,
  renderTodo,
  deleteTodo,
  update,
};
