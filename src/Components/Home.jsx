import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:33/")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    })

    //delete operation
    const handleDelete = (id) => {
        axios.delete("http://localhost:33/studentDelete/" + id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <h1 className="text-center">Student CRUD Operation</h1>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">

                <div className="w-70 bg-white rounded p-3">
                    <h1>Student List</h1>
                    <div className="d-flex justify-content-end">
                        <Link to='/create' ><button className='btn btn-success'>Create +</button></Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Language</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index) => {
                                return <tr>
                                    <td>{value.id}</td>
                                    <td>{value.student_name}</td>
                                    <td>{value.student_email}</td>
                                    <td>{value.student_gender}</td>
                                    <td>{value.language}</td>
                                    <td className="p-2">
                                        <Link to={`/read/${value.id}`}>  <button className="btn btn-sm btn-info">Read</button></Link>
                                        <Link to={`/edit/${value.id}`}> <button className="btn btn-sm btn-primary m-2">Edit</button></Link>
                                        <button onClick={() => handleDelete(value.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default Home;