import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import {auth} from './firebase'
export default function Singup() {
    const history=useHistory()
    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    })
    const onChange =(e)=>{
        e.preventDefault();
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handlesubmit = async (e)=>{
         
        e.preventDefault();
        console.log(credentials)
    try {
        const result=await  auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
        // console.log(result.user)
        alert("sinup success full")
        history.push('/')
    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }
    }
    return (
        <div>
                <h3>Singup  here</h3>
        <form onSubmit={handlesubmit} autoComplete="off">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"  name="email"   aria-describedby="emailHelp" onChange={onChange} />
                     
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={onChange} id="exampleInputPassword1" />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
