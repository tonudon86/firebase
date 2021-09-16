import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { useHistory } from 'react-router';
import todoItem from './todoItem';
export default function Todo() {
    const [suser, setsuser] = useState(null)
    const [mytodos, setmytodos] = useState([])
    let history = useHistory()
    useEffect(async () => {


        auth.onAuthStateChanged(user => {
            if (user) {
                setsuser(user)
                //    console.log(user.uid)
                const docRef = db.collection('todos').doc(user.uid)
                docRef.onSnapshot(docsnap => {
                    if (docsnap.exists) {

                        setmytodos(docsnap.data().todo)


                    }
                    else {
                        console.log("no data")
                        //    setmytodos([])
                    }
                })

            }
            else {
                setsuser(null)

                history.push('/login')
            }


        })
    }, [])
    const [todo, settodo] = useState({
        title: "",
        description: ""
    });
    const onChange = (e) => {
        e.preventDefault();

        settodo({ ...todo, [e.target.name]: e.target.value })
        console.log(todo)


    };



    const handlesubmit = async (e) => {
        e.preventDefault();
        mytodos.push(todo)

        console.log(mytodos)
        db.collection('todos').doc(suser.uid).set({
            todo: mytodos
        })

    }
    // console.log(mytodos)
    const deleteTodo=(deleteTodo)=>{
        const docRef = db.collection('todos').doc(suser.uid)
        // console.log(suser.uid)
        docRef.get().then(docsnap=>{
const result=docsnap.data().todo.filter(noob=> noob.title != deleteTodo.title )
docRef.update({
    todo:result
})
        })
    }
    return (
        <div>
            <div className="addtodo">
                <h1>add todo</h1>
                <form onSubmit={handlesubmit} autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="title" aria-describedby="emailHelp" required onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" name="description" className="form-control" required onChange={onChange} id="exampleInputPassword1" />
                    </div>

                    <button disabled={todo.title.length < 5 || todo.description.length < 8} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className="yourtodo ">
                <h1>your todos</h1>
                <div className="todo d-flex">

                    {mytodos.map((todo) => { 
                        return (<div class="card mx-2 my-2" >

                            <div class="card-body">
                                <h5 class="card-title">{todo.title}</h5>
                                <p class="card-text"> {todo.description}</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                <i class="fas fa-trash-alt" onClick={()=>deleteTodo(todo)}></i>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
