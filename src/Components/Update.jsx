import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update(){

    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:33/studentGet/" + id)
            .then(res => {
                console.log(res);
                setValues({...values,student_name: res.data[0].student_name,student_email:res.data[0].student_email,student_password:res.data[0].student_password,student_gender:res.data[0].student_gender,language:res.data[0].language});
            })
            .catch(err => console.log(err))

    }, [])
    const [values,setValues]=useState({
        student_name:'',
        student_email:'',
        student_password:'',
        student_gender:'',
        language:''
    })
    //update operations
    const handleUpdate=(event)=>{
        event.preventDefault();
        axios.put("http://localhost:33/studentUpdate/"+id,values)
        .then(res =>{
            console.log(res);
            navigate('/')
        })
        .catch(err =>console.log(err));
    }
    return(
        <>
   <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-70 bg-white rounded p-3">
                    <form onSubmit={handleUpdate}>
                        <h2>Add Student</h2>
                        <div>
                            <label htmlFor="studentName">Student Name</label>
                            <input
                                type="text"
                                id="studentName"
                                className="form-control"
                               value={values.student_name}
                                onChange={e => setValues({ ...values, student_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="studentEmail">Student Email</label>
                            <input
                                type="email"
                                id="studentEmail"
                                className="form-control"
                                value={values.student_email}
                                onChange={e => setValues({ ...values, student_email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="studentPassword">Student Password</label>
                            <input
                                type="password"
                                id="studentPassword"
                                className="form-control"
                                value={values.student_password}
                                onChange={e => setValues({ ...values, student_password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Student Gender</label><br/>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                
                                onChange={e => setValues({ ...values, student_gender: e.target.value })}
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                               
                                onChange={e => setValues({ ...values, student_gender: e.target.value })}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div>
                            <label>Student language</label><br/>
                            <input
                                type="checkbox"
                                id="tamil"
                                name="language"
                                value="tamil"
                              
                                onChange={e => setValues({ ...values, language: e.target.value })}
                            />
                            <label htmlFor="tamil">Tamil</label>
                            <input
                                type="checkbox"
                                id="english"
                                name="language"
                                value="english"
                               
                                onChange={e => setValues({ ...values, language: e.target.value })}
                            />
                            <label htmlFor="english">English</label>
                            <input
                                type="checkbox"
                                id="hindi"
                                name="language"
                                value="hindi"
                               
                                onChange={e => setValues({ ...values, language: e.target.value })}
                            />
                            <label htmlFor="hindi">Hindi</label>
                        </div>
                        <button type="submit" className="btn btn-success">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Update;