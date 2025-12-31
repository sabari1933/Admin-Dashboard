import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Read() {
  const { id } = useParams(); // get employee id from URL
  const [user, setUser] = useState(null); // initialize as null

  useEffect(() => {
    // Fetch employee data by ID
    axios
      .get(`http://localhost:33/employeeGet/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setUser(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]); // ✅ include 'id' in dependency array

  if (!user) {
    // Loading state while data is fetched
    return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <h2 className="text-white">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-70 bg-white rounded p-3">
        <div className="p-2">
          <h2>Employee Read List</h2>
          <h4>ID: {user.id}</h4>
          <h4>Name: {user.employee_name}</h4>
          <h4>Address: {user.employee_address}</h4>
          <h4>DOB: {user.dob}</h4>
          <h4>Salary: {user.salary}</h4>
        </div>
        <div className="mt-3">
          <Link to="/">
            <button className="btn btn-primary me-2">Back</button>
          </Link>
          <Link to={`/edit/${user.id}`}>
            <button className="btn btn-info">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
