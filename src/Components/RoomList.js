import React, { Component } from "react";
import * as firebase from "firebase";
import { Form, Text } from "react-form";

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
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  render() {
    return (
      <section className="rooms">
        <table>
          <tbody>
            {this.state.rooms.map((rooms, index) => (
              <tr className="room" key={index}>
                <td>{rooms.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
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
          <input
            type="submit"
            onClick={() => this.createRoom()}
            value="Add Room"
          />
        </form>
      </section>
    );
  }
}

export default RoomList;
