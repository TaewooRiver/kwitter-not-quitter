import React, {useState} from "react";
import { deleteDoc, getFirestore, doc, updateDoc } from 'firebase/firestore';

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.nweet);
  const onDeleteClick = async (event) => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      // delete nweet
      console.log(nweetObj.id);
      await deleteDoc(doc(getFirestore(), "nweets", nweetObj.id))
    }
  }
  const toggleEditing = (event) => {
    setEditing(prev => !prev)
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet)
    await updateDoc(doc(getFirestore(), "nweets", nweetObj.id), {nweet:newNweet})
    setEditing(false)
  }
  const onChange = (event) => {
    const {
      target : {value},
    } = event;
    setNewNweet(value);
  };
  
  return (
  <div>
    {editing ? (
        <>
          {isOwner && (
          <>
            <form onSubmit={onSubmit}>
              <input 
                onChange={onChange}
                type="text" 
                placeholder="Edit your Nweet" 
                value={newNweet} 
                required 
              />
              <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
        </>
        )}
        </>
      ) : (
        <>
          <h4>{nweetObj.nweet}</h4>
          <h1>{isOwner}</h1>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )
    }
  </div>
  )
}

export default Nweet;