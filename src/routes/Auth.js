import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
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
      setError(err.message)
    }
  };
  const toggleAcccount =() => setNewAccount(prev => !prev)
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
      {error}
    </form>
    <span onClick={toggleAcccount}>{newAccount ? "Sign In" : "Create Account"}</span>
    <div>
      <button>Continue With Google</button>
    </div>
  </div>) 
}
export default Auth;