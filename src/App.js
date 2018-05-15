import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList.js'
import './App.css';

var config = {
    apiKey: "AIzaSyCVet_6Fyd1gFpYzfKG0xlG1yEcEoX3J9o",
    authDomain: "bloc-chat-react-4202.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-4202.firebaseio.com",
    projectId: "bloc-chat-react-4202",
    storageBucket: "bloc-chat-react-4202.appspot.com",
    messagingSenderId: "997106748595"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="chat-header">
          <h1 className="chat-title">Welcome to Bloc Chat</h1>
        </header>
        <RoomList
            firebase={firebase}/>
      </div>
    );
  }
}

export default App;
