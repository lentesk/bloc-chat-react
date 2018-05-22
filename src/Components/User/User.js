import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.props.setUser(user);
      });
  }

  signOut() {
    this.props.firebase
      .auth()
      .signOut()
      .then(result => {
        this.props.setUser(null);
      });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <div>
        <p> Hello {this.props.activeUser}</p>
        <button className="sign-in" onClick={() => this.signIn()}>
          Sign In
        </button>

        <button className="sign-out" onClick={() => this.signOut()}>
          Sign Out
        </button>
      </div>
    );
  }
}
export default User;
