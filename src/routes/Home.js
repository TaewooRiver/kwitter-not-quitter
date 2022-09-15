import React from "react";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const { target:{value}} = event;
    setNweet(value)
  }
  return(<div>
    <form>
      <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input onSubmit={onSubmit} type="submit" value="Kweet" />
    </form>
  </div>)
}

export default Home;