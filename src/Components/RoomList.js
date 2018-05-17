import React, { Component } from "react";
import * as firebase from "firebase";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  selectRoom(key) {
    this.props.activeRoom(key);
  }

  render() {
    return (
      <section className="rooms">
<<<<<<< HEAD
        <table>
          <tbody>
            {this.state.rooms.map((rooms, index) => (
              <tr className="room" key={index}>
                <td>{rooms.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Room Name:
=======
        <ul>
          {this.state.rooms.map(rooms => {
            return (
              <div key={rooms.key} onClick={e => this.selectRoom(rooms, e)}>
                {" "}
                {rooms.name}{" "}
              </div>
            );
          })}

          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Room Name:
              <input
                type="text"
                name="newroom"
                placeholder="New Room"
                value={this.state.newRoom}
                onChange={e => this.handleChange(e)}
              />
            </label>
>>>>>>> list-messages
            <input
              type="submit"
              onClick={() => this.createRoom()}
              value="Add Room"
            />
          </form>
        </ul>
      </section>
    );
  }
}

export default RoomList;
