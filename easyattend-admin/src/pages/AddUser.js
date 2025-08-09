import { useEffect, useState } from 'react';
import api from '../services/api';

function AddUser() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'intern',
    group_id: ''
  });

  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.getUsers();
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (editingUserId) {
  await api.editUser(editingUserId, form); // ✅ Use correct function name
  setEditingUserId(null);
} else {
  await api.addUser(form);
}

    setForm({ name: '', email: '', password: '', role: 'intern', group_id: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: '', // Don't pre-fill password
      role: user.role,
      group_id: user.group_id || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await api.deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">{editingUserId ? 'Edit User' : 'Add User'}</h3>

      <form onSubmit={handleSubmit} className="mb-5">
  <div className="row g-3 mb-3">
    <div className="col-md-4">
      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-4">
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-4">
      <input
        type="password"
        name="password"
        className="form-control"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required={!editingUserId}
      />
    </div>
  </div>

  <div className="row g-3 align-items-center">
    <div className="col-md-3">
      <select
        name="role"
        className="form-select"
        value={form.role}
        onChange={handleChange}
      >
        <option value="intern">Intern</option>
        <option value="group_leader">Group Leader</option>
       
      </select>
    </div>
    <div className="col-md-3">
      <input
        type="number"
        name="group_id"
        className="form-control"
        placeholder="Group ID"
        value={form.group_id}
        onChange={handleChange}
      />
    </div>
    <div className="col-md-2 d-grid">
      <button type="submit" className="btn btn-primary">
        {editingUserId ? 'Update' : 'Add'}
      </button>
    </div>
  </div>
</form>


      <h4>User List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Group</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.group_id}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(u)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddUser;
