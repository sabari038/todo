import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ToDo() {
  const [activetask, settask] = useState({ name: "" });
  const [tasks, setTasks] = useState([]);
  const [Editing, setEditing] = useState(false);
  const [curId, setId] = useState(0);

  useEffect(() => {
    fetchTask();
  }, []);

  const handleChange = (e) => {
    settask({ name: e.target.value });
  };

  const fetchTask = async () => {
    await axios
      .get("https://crudcrud.com/api/2f12e0b08fb14c2fb230f5f30b85a0cd/todo/")
      .then((res) => {
        setTasks(res.data);
      });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(
        "https://crudcrud.com/api/2f12e0b08fb14c2fb230f5f30b85a0cd/todo/",
        activetask
      )
      .then((res) => {
        console.log(activetask);
        fetchTask();
        settask({ name: "" });
      })
      .catch((error) => {
        console.log(`Error:${error}`);
      });
  }

  async function handleDelete(id) {
    await axios
      .delete(
        `https://crudcrud.com/api/2f12e0b08fb14c2fb230f5f30b85a0cd/todo/${id}`
      )
      .then((res) => {
        fetchTask();
      });
  }
  async function handleUpdate(e) {
    e.preventDefault();
    await axios
      .put(
        `https://crudcrud.com/api/2f12e0b08fb14c2fb230f5f30b85a0cd/todo/${curId}`,
        activetask
      )
      .then((res) => {
        fetchTask();
        settask({ name: "" });
        setEditing(false);
        setId(0);
      });
  }
  function handleEdit(task) {
    setId(task._id);
    settask({ name: task.name });
    setEditing(true);
  }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          value={activetask.name}
          type="text"
        ></input>
        {Editing ? (
          <button onClick={handleUpdate}>update</button>
        ) : (
          <button onClick={handleSubmit}>Add</button>
        )}
      </form>
      <ol>
        {tasks.map((task) => {
          return (
            <li key={task._id}>
              {task.name}
              <button onClick={() => handleDelete(task._id)}>Delete</button>
              <button onClick={() => handleEdit(task)}>Edit</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}