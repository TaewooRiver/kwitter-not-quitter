import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase"
import { useHistory } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    
  }
  const getMyNweets = async() => {
    const nweetsRef = collection(dbService, "nweets");
    const q = query(nweetsRef, where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data())
    })
  }
  useEffect(() => {
    getMyNweets();
  }, [])
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await updateProfile(authService.currentUser, {displayName: newDisplayName})
    }
    refreshUser();
  }
  return(
    <>
    <form onSubmit={onSubmit}>
      <input 
        onChange={onChange} 
        value={newDisplayName}
        type="text" 
        placeholder="Display name" 
      />
      <input type="submit" value="Update Profile" />
    </form>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
    </>
)} ;
