import React, { useEffect, useState } from "react";
import publicAxios from "../config/publicAxios";
import { success } from "../until/nofication";
import './Home.scss'
import { Input } from "antd";

export default function Home() {
  const [allTodo, setAllTodo] = useState([]);
  const [newTodo, setNewTodo] = useState({
    nameTodo: ""
  });
  const [flag, setFlag] = useState(false);

  //render
  const getAllTodo = async () => {
    try {
      const res = await publicAxios.get("/todo");
      setAllTodo(res.data);
      setNewTodo({
        nameTodo: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTodo();
  }, [flag]);

  //lấy value input
  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  //thêm todo
  const handleAdd = async () => {
      try {
        const respoine = await publicAxios.post("/todo", newTodo);
        success(respoine.data.message);
        setTimeout(() => {
          setFlag(!flag);
        }, 3200);
      } catch (error) {
        console.log(error);
      }
  };

  //xóa

  const handleDelete = async (id) => {
    try {
      if (confirm("Bạn có muốn xóa không")) {
        const res = await publicAxios.delete(`/todo/${id}`);
        setAllTodo(res.data);
        success("Xóa thành công");
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //sửa
  const handleEdit = async(item) => {
    try {
        await publicAxios.put(`/todo/${item.id}`, item);
        getAllTodo();
        setNewTodo({
          nameTodo: "",
        });
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="home">
      <div className="home-form">
        <Input
          type="text"
          name="nameTodo"
          id=""
          value={newTodo.nameTodo}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>{newTodo.id ? "Lưu" : "Thêm"}</button>
      </div>
      <div className="home-table">
        {allTodo.map((item, i) => {
          return (
            <ul key={i}>
              <li className="name">{item.nameTodo}</li>
              <li className="status">{item.status == "true" ? "Hoàn thành": ""}</li>
              <li className="edit" onClick={() => handleEdit(item)}><b>{item.status == "true" ? "": "Sửa"}</b></li>
              <li className="delete" onClick={() => handleDelete(item.id)}><b>Xóa</b></li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
