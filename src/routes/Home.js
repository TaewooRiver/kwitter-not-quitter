import { dbService } from "fbase";
import { collection, addDoc, serverTimestamp, query, doc, onSnapshot, getDocs, orderBy } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";
const Home = ({userObj}) => {
  console.log(userObj)
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  /* const getNweets = async () => {
    const querySnapshots = await getDocs(collection(dbService, "nweets"));
    querySnapshots.forEach(document => {
      const nweetObj = {
        ...document.data(),
        id: document.id,
      }
      setNweets(prev => [nweetObj, ...prev]);
    })
    
  } */
  useEffect(() => {
  const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snapshot) => {
    const nweetArray = snapshot.docs.map(doc => ({
      id:doc.id, 
      ...doc.data()
    }))
    setNweets(nweetArray)
    })
  }, []);
    
  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      const docRef = await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });} catch(e) {
      console.error("Error adding document: ", e);
    }
    setNweet("");
  };
  const onChange = (event) => {
    const { target:{value}} = event;
    setNweet(value)
  }
  const onFileChange = (event) => {
    const {target:{files}} =event;
    const  theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {target:{result}} = finishedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => {
    setAttachment(null)
    fileInput.current.value = null;
  };
  const fileInput = useRef();
  console.log(nweets)
  return(
  <div>
    <form onSubmit={onSubmit}>
      <input 
        onChange={onChange} 
        value={nweet} 
        type="text" 
        placeholder="What's on your mind?" 
        maxLength={120} 
      />
      <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput}/>
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
        )}
    </form>
    <div>
      {nweets.map((nweet) => (
        <Nweet 
        key={nweet.id} 
        nweetObj={nweet} isOwner={userObj.uid === nweet.creatorId} />
      )
      )
      }
    </div>
  </div>)
}

export default Home;