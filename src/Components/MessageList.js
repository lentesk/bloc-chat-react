import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value
      });

  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  createMessage(e) {
    this.messagesRef.push({
      username: this.props.username,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }


  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });


  }

  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages
      .filter(message => message.roomId === activeRoom)
      .map(message => {
        return (
          <li className="current-message" key={message.key}>
            {message.username}: {message.content} {new Date (message.sentAt).toTimeString().split(' ')[0]}
          </li>
        );
      });



    return (
      <div className="room-messages">
        <ul>{messageList}</ul>
        <div className="message-form">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            New Message:
            <input
              type="text"
              name="newmessage"
              placeholder="Your message here"
              value={this.state.newMessage}
              onChange={e => this.handleChange(e)}
            />
          </label>
          <input
            type="submit"
            onClick={(e) => this.createMessage(e)}
            value="Send"
          />
        </form>
        </div>
      </div>
    );



  }
}
export default MessageList;
