import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function Read() {
    const { id } = useParams();
    const [user, setUser] = useState([])

    //Read operations
    useEffect(() => {
        axios.get("http://localhost:33/employeeGet/" + id)
            .then(res => {
                console.log(res);
                setUser(res.data[0]);
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-70 bg-white rounded p-3">
                    <div className="p-2">
                        <h2>Employee Read List</h2>
                        <h4>{user.id}</h4>
                        <h4>{user.employee_name}</h4>
                        <h4>{user.employee_address}</h4>
                        <h4>{user.dob}</h4>
                        <h4>{user.salary}</h4>
                    </div>
                    <Link to={'/'}><button className="btn btn-primary me-2">Back</button></Link>
                    <Link to={`/edit/${user.id}`}> <button className="btn btn-info">Edit</button></Link>
                </div>
            </div>
        </>
    );
}
export default Read;