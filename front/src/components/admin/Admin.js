import React, { useState, useEffect, Fragment } from "react";
import socketIOClient from "socket.io-client";
import { logout, getUser } from "../../services/auth";
import api from "../../services/api";
import './Admin.css';
import Tweet from '../common/tweet/tweet';

const ENDPOINT = process.env.REACT_APP_SOCKET_HOST;
const socket = socketIOClient(ENDPOINT);

const Admin = (props) => {
  const [listTweets, setListTweets] = useState([]);
  const [tweetSelected, setTweetSelected] = useState(null);
  const [field, setField] = useState("");

  useEffect(() => {
    stopSearch();

    socket.on("tweet", data => {
      console.log(data)
      setListTweets(list => [data, ...list.slice(0, 30)]);
    });

    socket.on("tweet-change", data => {
      setTweetSelected(data);
    });
  }, []);

  const search = async () => {
    setListTweets([]);
    api.post("/search", { field }).catch(error => {
      _logout();
    });
  }

  const stopSearch = () => {
    api.post("/search", { field: null });
  }

  const remove = () => {
    setTweetSelected(null);
    socket.emit("set-tweet", null);
  }

  const approve = (tweet) => {
    socket.emit("set-tweet", tweet);
  }

  const disapprove = (index) => {
    setListTweets(list => [...list.slice(0, index), ...list.slice(index + 1, list.length)]);
  }

  const _logout = () => {
    logout();
    remove();
    props.history.push("/login");
  }

  return (
    <div className="container">
      <div className="header">
        Bem vindo, {getUser()} |
      <a className="logout" onClick={() => { _logout() }}>Logout</a>
      </div>
      <div className="tweet-selected">
        <span className="title">Tweet sendo exibido</span>
        <Tweet
          tweet={tweetSelected}
          concealable={false}
          actions={[<button className="disapprove" onClick={() => remove()}>Remover</button>]}
        />
      </div>
      <div className="tweets-container">
        <span className="title">Tweets mais recentes</span>
        <div className="search-form">
          <input
            type="text"
            placeholder="Buscar por..."
            onChange={e => setField(e.target.value)}
          />
          <button className="default" type="submit" onClick={() => search()}>Buscar</button>
          <button className="default" type="submit" onClick={() => stopSearch()}>Parar</button>
        </div>

        {listTweets && listTweets.map((tw, index) =>
          <Tweet
            tweet={tw}
            concealable={false}
            actions={[
              <button className="approve" onClick={() => approve(tw)}>Sim</button>,
              <button className="disapprove" onClick={() => disapprove(index)}>Não</button>
            ]}
          />
        )}
      </div>
    </div>

  );
}

export default Admin;
