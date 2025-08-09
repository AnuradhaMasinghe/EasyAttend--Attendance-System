import { useEffect, useState } from 'react';
import api from '../services/api';

function AttendanceReport() {
  const [groupedRecords, setGroupedRecords] = useState({});
  const [searchDate, setSearchDate] = useState('');
  const [searchRole, setSearchRole] = useState(''); // '' means no role filter (all roles)
  const [searchGroupId, setSearchGroupId] = useState(''); // '' means no group filter
  const [allGroupIds, setAllGroupIds] = useState([]); // To populate dropdown

  useEffect(() => {
    Promise.all([api.getAttendance(), api.getUsers()])
      .then(([attendanceRes, usersRes]) => {
        const attendance = attendanceRes.data;
        const users = usersRes.data;

        // Merge user data (name, role, group_id) into each attendance record
        const merged = attendance.map((record) => {
          const user = users.find((u) => u.id === record.user_id);
          return {
            ...record,
            name: user?.name || 'Unknown',
            role: user?.role || 'Unknown',
            group_id: user?.group_id || 'Unknown',
          };
        });

        // Collect all unique group IDs for filter dropdown
        const uniqueGroupIds = Array.from(
          new Set(merged.map((rec) => rec.group_id).filter((id) => id !== 'Unknown'))
        );
        setAllGroupIds(uniqueGroupIds);

        const normalizeDate = (dateStr) => {
          if (typeof dateStr !== 'string') return 'Unknown Date';
          return dateStr.split('T')[0];
        };

        const byDate = merged.reduce((acc, record) => {
          const date = normalizeDate(record.date);
          if (!acc[date]) acc[date] = [];
          acc[date].push(record);
          return acc;
        }, {});

        const grouped = {};
        Object.entries(byDate).forEach(([date, records]) => {
          grouped[date] = records.reduce((acc, record) => {
            if (!acc[record.role]) acc[record.role] = [];
            acc[record.role].push(record);
            return acc;
          }, {});
        });

        setGroupedRecords(grouped);
      });
  }, []);

  // Filter groupedRecords by searchDate, searchRole, and searchGroupId
  const filteredGroupedRecords = Object.entries(groupedRecords)
    .filter(([date]) => {
      if (!searchDate) return true;
      return date.includes(searchDate);
    })
    .map(([date, roles]) => {
      let filteredRoles = {};

      Object.entries(roles).forEach(([role, records]) => {
        // Normalize role filter for leader
        let normalizedRole = role.toLowerCase();
        if (normalizedRole === 'group_leader') normalizedRole = 'leader';

        // Filter by role
        if (searchRole && normalizedRole !== searchRole.toLowerCase()) {
          return; // skip this role group
        }

        // Filter by group id inside the records
        const filteredRecords = searchGroupId
          ? records.filter((r) => r.group_id.toString() === searchGroupId)
          : records;

        if (filteredRecords.length > 0) {
          filteredRoles[role] = filteredRecords;
        }
      });

      return [date, filteredRoles];
    })
    .filter(([_, roles]) => Object.keys(roles).length > 0);

  return (
    <div className="container">
      <h3>Attendance Records</h3>

      {/* Search inputs side by side */}
      <div className="mb-3 d-flex align-items-end" style={{ gap: '15px', maxWidth: '900px' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="dateSearch" className="form-label">
            Search by Date:
          </label>
          <input
            type="date"
            id="dateSearch"
            className="form-control"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="roleSearch" className="form-label">
            Filter by Role:
          </label>
          <select
            id="roleSearch"
            className="form-select"
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="intern">Intern</option>
            <option value="leader">Leader</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="groupSearch" className="form-label">
            Filter by Group ID:
          </label>
          <select
            id="groupSearch"
            className="form-select"
            value={searchGroupId}
            onChange={(e) => setSearchGroupId(e.target.value)}
          >
            <option value="">All Groups</option>
            {allGroupIds.map((gid) => (
              <option key={gid} value={gid}>
                {gid}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Object.entries(groupedRecords).length === 0 && <p>Loading...</p>}

      {filteredGroupedRecords.map(([date, roles]) => (
        <div key={date} className="mb-4">
          <h5>Date: {date}</h5>
          {Object.entries(roles).map(([role, records]) => (
            <div key={role} className="ms-3 mb-3">
              <h6>{role}</h6>
              <table className="table table-sm table-bordered w-100">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Group ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td>{r.user_id}</td>
                      <td>{r.name}</td>
                      <td>{r.group_id}</td>
                      <td
                        style={{
                          color:
                            r.status.toLowerCase() === 'present'
                              ? 'green'
                              : r.status.toLowerCase() === 'absent'
                              ? 'red'
                              : 'black',
                        }}
                      >
                        {r.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" style={{ fontWeight: '600', textAlign: 'right' }}>
                      Total Present: {records.filter((r) => r.status.toLowerCase() === 'present').length} |{' '}
                      Total Absent: {records.filter((r) => r.status.toLowerCase() === 'absent').length}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AttendanceReport;
