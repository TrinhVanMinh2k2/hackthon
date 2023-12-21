const {
  addTodos,
  renderTodo,
  deleteTodo,
  update,
} = require("../repository/todo.repository");

//thêm todo
async function addTodo(req, res) {
  const { nameTodo } = req.body;
  await addTodos(nameTodo);
  res.status(201).json({
    message: "Bạn đã thêm thành công",
  });
}

//render todo
async function render(req, res) {
  const result = await renderTodo();
  // console.log(result);
  res.status(200).json(result);
}
async function removeTodo(req, res) {
  const { id } = req.params;
  await deleteTodo(id);
  const result = await renderTodo();
  res.status(201).json(result);
}

async function updateTodo1(req, res) {
     const { id } = req.params;
     const { status} = req.body;
     const result = await update( id , status);
     res.status(200).json(result);
}

module.exports = {
  addTodo,
  render,
  removeTodo,
  updateTodo1,
};
