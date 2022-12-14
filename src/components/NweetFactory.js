import { dbService, storageService } from "fbase";
import { collection, addDoc, serverTimestamp, query, doc, onSnapshot, getDocs, orderBy } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";
import {ref, uploadString, getDownloadURL } from "@firebase/storage"
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = ""
    try {
      if (attachment !== ""){
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
      }
      const nweetObj = {
        nweet,
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        attachmentUrl,
      }
      await addDoc(collection(dbService, "nweets"), nweetObj);
    } catch(e) {
      console.error("Error adding document: ", e);
    }
    setNweet("");
    setAttachment("");
    fileInput.current.value = null;
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
    setAttachment("")
    fileInput.current.value = null;
  };
  const fileInput = useRef();
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
      
    </div>
  )
}

export default NweetFactory;