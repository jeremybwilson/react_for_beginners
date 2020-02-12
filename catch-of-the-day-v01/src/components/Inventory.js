import React from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import base, { fireBaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };
  
  state = {
    uid: null,
    owner: null
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user });
      }
    })
  }
  
  authHandler = async (authData) => {
    // console.log(authData);
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. We claim it if there is no owner
    if(!store.owner){
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, { 
        data: authData.user.uid
       })
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData);
  };
  
  authenticate = (provider) => {
    // alert(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    fireBaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  
  logout = async () => {
    // console.log('Log out!');
    await firebase.auth().signOut();
    // Now we want to clear state
    this.setState({ uid: null });
  }

  render(){
    // Make the logout button
    const logout = <button onClick={this.logout}>Log Out!</button>
    
    // 1. Check if the user is logged in
    if(!this.state.uid){
      return (
        <Login authenticate={this.authenticate} />
      );
    }
    
    // 2. Check if the user is not the owner of the store
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are not the store owner!</p>
          {/* add the logout button here */}
          {logout}
        </div>
      );
    }
    
    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {/* add the logout button here */}
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm 
            key={key} 
            index={key} 
            fish={this.props.fishes[key]} 
            updateFish ={this.props.updateFish} 
            deleteFish={this.props.deleteFish}
           />
        ))}
        {/* <AddFishForm addFish={this.props.addFish} /> */}
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;