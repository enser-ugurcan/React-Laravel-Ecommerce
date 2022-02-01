import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
function User() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Users";
    axios.get(`/api/admin/users`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setUsers(res.data.users);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_Users = "";
  if (loading) {
    return (
      <h4>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading Users...
        </Button>
      </h4>
    );
  } else {
    display_Users = users.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.created_at}</td>
          <td>
            <Link
              to={`view-user/${item.id}`}
              className="btn btn-success btn-sm"
            >
              View
            </Link>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>Users</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Enter Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{display_Users}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default User;
