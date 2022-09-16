import { dbService, storageService } from "fbase";
import { collection, addDoc, serverTimestamp, query, doc, onSnapshot, getDocs, orderBy } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";
import {ref, uploadString, getDownloadURL } from "@firebase/storage"
import { v4 as uuidv4 } from "uuid";
import NweetFactory from "components/NweetFactory";
const Home = ({userObj}) => {
  console.log(userObj)
  
  const [nweets, setNweets] = useState([]);
  
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
  
  return(
  <div>
    <NweetFactory userObj={userObj} />
    <div>
      {nweets.map((nweet) => (
        <Nweet 
          key={nweet.id} 
          nweetObj={nweet} 
          isOwner={userObj.uid === nweet.creatorId} 
        />
      ))}
    </div>
  </div>)
}

export default Home;