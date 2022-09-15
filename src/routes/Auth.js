import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewaccount] = useState(true);
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    let data
    try{
      if (newAccount) {
        const auth = getAuth();
        data = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        const auth = getAuth();
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data);
    } catch(err) {
      console.log(err)
    }
  }
  return (<div>
    <form onSubmit={onSubmit}>
      <input 
        name="email"
        type="text" 
        placeholder="Email" 
        required 
        value={email} 
        onChange={onChange}
      />
      <input 
        name="password"
        type="password" 
        placeholder="password" 
        required 
        value={password} 
        onChange={onChange}
      />
      <input type="submit" value={newAccount ? "Create Acccount" : "Log In"} />
    </form>
    <div>
      <button>Continue With Google</button>
    </div>
  </div>) 
}
export default Auth;