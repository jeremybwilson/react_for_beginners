import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},  // empty object to be filled with fishes
    order: {}  // order object to store order information
  };
  
  static propTypes = {
    match: PropTypes.object
  }
  
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    // console.log(localStorageRef);
    
    if(localStorageRef){
      // console.log("Restoring it!");
      console.log(JSON.parse(localStorageRef));
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    // this.ref = base.syncState(`${ this.props.match.params.storeId }`);
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }
  
  componentDidUpdate(){
    // console.log('Updating');
    // console.log(this.state.order);
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  
  componentWillUnmount(){
    console.log('Unmounting');
    base.removeBinding(this.ref);
  }
  
  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    // this.state.fishes.push(fish);
    this.setState({
      // fishes: fishes
      fishes
    });
  };
  
  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };
  
  deleteFish = (key) => {
    // console.log(deletedFish);
    // 1.  Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Update the state, setting fishes[key] to null
    fishes[key] = null;
    // Update state
    this.setState({ fishes });
  }
  
  loadSampleFishes = () => {
    // alert('Loading Sample');
    this.setState({ fishes: sampleFishes });
  };
  
  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update our state object
    this.setState({ order });
  };
  
  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove the item from our order
    delete order[key];
    console.log('Removing from order!');
    // 3. call setState to update our state object
    this.setState({ order });
  }
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header  tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
        </div>
    );
  }
}
// {Object.keys(this.state.fishes).map(key => 
//   <Fish key={key} details={this.state.fishes[key]} />
// )}

export default App;