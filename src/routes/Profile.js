import React, { useEffect } from "react";
import { authService, dbService } from "fbase"
import { useHistory } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default ({userObj}) => {
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
  return(
    <>
      <button onClick={onLogOutClick}>
        Log Out
      </button>
    </>
)} ;

//testforgitpush