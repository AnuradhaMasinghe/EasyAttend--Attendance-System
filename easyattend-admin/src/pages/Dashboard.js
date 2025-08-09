import { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({}); // { userId: 'present' | 'absent' }
  const [searchText, setSearchText] = useState('');
  const [entries, setEntries] = useState(10); // default show 10 entries

  useEffect(() => {
    api.getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleMarkAttendance = (userId, status) => {
    api.markAttendance({
      user_id: userId,
      date: new Date().toISOString().split('T')[0],
      status: status
    }).then(() => {
      alert(`Marked ${status}`);
      setAttendanceStatus(prev => ({ ...prev, [userId]: status }));
    }).catch(() => {
      alert('Failed to mark attendance');
    });
  };

  // Filter users by name or role based on searchText (case insensitive)
  const filteredUsers = users.filter(u => {
    const lower = searchText.toLowerCase();
    return (
      u.name.toLowerCase().includes(lower) ||
      u.role.toLowerCase().includes(lower)
    );
  });

  // Limit users displayed based on entries selected
  const displayedUsers = filteredUsers.slice(0, entries);

  return (
    <div className="container">
     <h3 className="title">User List</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label>
            Show{' '}
            <select
              className="form-select d-inline-block"
              style={{ width: '80px' }}
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              {[5, 10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>{' '}
            entries
          </label>
        </div>

        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or role"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ minWidth: '250px' }}
          />
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Attendance</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((u) => {
            const status = attendanceStatus[u.id];
            return (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleMarkAttendance(u.id, 'present')}
                    disabled={status === 'present'}
                  >
                    Present
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleMarkAttendance(u.id, 'absent')}
                    disabled={status === 'absent'}
                  >
                    Absent
                  </button>
                </td>
                <td>
                  {status === 'present' && <span className="badge bg-success">Present</span>}
                  {status === 'absent' && <span className="badge bg-danger">Absent</span>}
                  {!status && <span className="text-muted">Not marked</span>}
                </td>
              </tr>
            );
          })}

          {displayedUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
