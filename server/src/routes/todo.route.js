const {
  render,
  addTodo,
  removeTodo,
  updateTodo1,
} = require("../controller/todo.controller");

const todoRouter = (app) => {
  app.get("/todo", render);
  app.post("/todo", addTodo);
  app.delete("/todo/:id", removeTodo);
  app.put("/todo/:id", updateTodo1);
};

module.exports = {
  todoRouter,
};
