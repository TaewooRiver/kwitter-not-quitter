import React, {useState} from "react";
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup} from "firebase/auth";
import { authService, firebaseInstance } from "fbase";

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
  const onSocialClick = async (event) => {
    const {target:{ name }} = event;
    
    try{
      if (name==="google"){
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
          }).catch((error) => {
            console.log(error);
          })
        /* const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(authService, provider);
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result); */
      }
    } catch(err) {
      console.log(err);
    }
  };
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
      <button onClick={onSocialClick} name="google">Continue With Google</button>
    </div>
  </div>) 
}
export default Auth;