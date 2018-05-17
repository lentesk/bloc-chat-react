import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList.js'
import MessageList from './Components/MessageList.js'
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
  constructor(props){
    super(props)

    this.state = {
      activeRoom: '',
    };
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room})
    console.log(room);
  }


  render() {
    const displayMessages = this.state.activeRoom;

    return (
      <div className="App">
        <header className="chat-header">
          <h1 className="chat-title">Welcome to Bloc Chat</h1>
        </header>
        <aside className="room-list">
        <RoomList
            firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
        </aside>
        <div>
          <main className="active-room">
            <h2>{this.state.activeRoom.name}</h2>
            {displayMessages ?

              (<MessageList
                firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
              : (null)}
          </main>
       </div>
      </div>
    );
  }
}

export default App;
