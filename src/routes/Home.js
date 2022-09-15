import { dbService } from "fbase";
import { collection, addDoc, serverTimestamp, query, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const querySnapshots = await getDocs(collection(dbService, "nweets"));
    querySnapshots.forEach(doc => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      }
      setNweets(prev => [nweetObj, ...prev]);
    })
    
  }
  useEffect(() => {
    getNweets();
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: serverTimestamp(),
    });
    setNweet("");
  };
  const onChange = (event) => {
    const { target:{value}} = event;
    setNweet(value)
  }
  console.log(nweets)
  return(<div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input type="submit" value="Nweet" />
    </form>
    <div>
      {nweets.map(nweet => <div key={nweet.id}>
        <h4>{nweet.nweet}</h4>
        </div>)}
    </div>
  </div>)
}

export default Home;