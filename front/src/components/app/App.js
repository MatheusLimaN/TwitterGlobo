import React, { useState, useEffect, Fragment } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
import Tweet from '../common/tweet/tweet';

const ENDPOINT = process.env.REACT_APP_SOCKET_HOST;
const socket = socketIOClient(ENDPOINT);

function App() {
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    socket.emit("set-tweet", null);
    socket.on("tweet-change", data => {
      setTweet(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <img src="globo.png"></img>
      <Tweet
        tweet={tweet}
        concealable={true}
      />
    </div>
  );
}

export default App;
