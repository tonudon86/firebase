 
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import Login from './components/Login';
import Singup from './components/Singup';
import {auth} from './components/firebase';
import react ,{useState,useEffect} from 'react';
import Todo from './components/Todo';


function App() {
  const [suser, setsuser] = useState(null)
useEffect(() => {
 auth.onAuthStateChanged(user=>{
   if(user){
   setsuser(user)
  }
   else {setsuser(null)}
 })
}, [])



  return (
    <Router>
 
  <Navbar suser={suser}/>
  <Switch>
     <div className="container">
     <Route exact path="/login">
         <Login/>
          </Route>
          <Route exact path="/singup">
           <Singup/>
          </Route>
          <Route exact path="/">
            <Todo suser={suser}/ >
          </Route>
     </div>
        </Switch>
  
  </Router>
  );
}

export default App;
