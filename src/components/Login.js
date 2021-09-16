import React from 'react'
import { useState } from 'react'
import {auth} from './firebase'
import { useHistory } from 'react-router'
export default function Login() {
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
        // console.log(credentials)
        try {
            const result=await  auth.signInWithEmailAndPassword(credentials.email,credentials.password);
            // console.log(result.user.email)
            alert("login success full")
            history.push('/')
            // let token=JSON.stringify(result.user.uid)
            // console.log(token)
        } catch (error) {
             
            console.log(error.message,error.code)
            alert(error.message)
        }
    }
    return (
        <div>
            <h3>Login here</h3>
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
