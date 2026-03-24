import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });


  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:58537/authentication/getAll"
      );
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editUserId
      ? `http://127.0.0.1:58537/authentication/save?id=${editUserId}`
      : "http://127.0.0.1:58537/authentication/save";

    try {
      const res = await axios.post(
        url,
        new URLSearchParams(form).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      setMessage(res.data.message || "Success");
      setShowForm(false);
      setEditUserId(null);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Save error:", err);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      await axios.get(
        `http://127.0.0.1:58537/authentication/delete?id=${id}`
      );
      fetchUsers();
    }
  };


  const handleEdit = (user) => {
    setEditUserId(user.ID);
    setForm({
      name: user.NAME,
      email: user.EMAIL,
      password: "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowAdd = () => {
    setEditUserId(null);
    setForm({ name: "", email: "", password: "" });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditUserId(null);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="bg-dark bg-opacity-75 min-vh-100">
        <div className="container mt-5 p-4 bg-light rounded w-75 shadow">

          <div className="d-flex justify-content-between mb-3">
            <h4>Users List</h4>
            <button className="btn btn-success" onClick={handleShowAdd}>
              Add User
            </button>
          </div>

          {message && <div className="alert alert-info">{message}</div>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td>{user.NAME}</td>
                    <td>{user.EMAIL}</td>
                    <td>
                      <button
                        className="btn btn-sm me-2"
                        onClick={() => handleEdit(user)}
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDelete(user.ID)}
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="20px"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {showForm && (
            <div className="border p-4 mt-4 w-50 mx-auto rounded">
              <h5>{editUserId ? "Edit User" : "Add User"}</h5>

              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Name"
                  required
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Email"
                  required
                />

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Password"
                  required={!editUserId}
                />

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editUserId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </>
  );
}