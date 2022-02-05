import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner, Button } from "react-bootstrap";
function Contact() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    document.title = "Contact";
    axios.get(`/api/admin/contact`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setContacts(res.data.contacts);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  var display_Contacts = "";
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
          Loading Contacts...
        </Button>
      </h4>
    );
  } else {
    display_Contacts = contacts.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.message}</td>
          <td>
            <Link
              to={`view-order/${item.id}`}
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
        <h4>Contact</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E mail</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>{display_Contacts}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Contact;
