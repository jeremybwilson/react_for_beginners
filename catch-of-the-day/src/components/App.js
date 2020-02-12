import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  // create the state object
  state = {
    fishes: {},
    order: {}
  };
  
  static propTypes = {
    match: PropTypes.object
  }
  // component "lifecycle" method - componentDidMount
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      console.log('Restoring it!');
      console.log(JSON.parse(localStorageRef));
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  
  // component "lifecycle" method - componentDidUpdate
  componentDidUpdate(){
    const { params } = this.props.match;
    console.log("IT UPDATED!");
    console.log(this.state.order);
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  
  // component "lifecycle" method - componentWillUnmount
  componentWillUnmount(){
    // console.log("UNMOUNTING!!!!");
    base.removeBinding(this.ref);
  }
  
  // create addFish method
  addFish = (fish) => {
    console.log('Adding a Fish!');
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };
  
  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = {...this.state.fishes};
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };
  
  deleteFish = (key) => {
    console.log('Removing Fish!');
    // 1. Take a copy of the current state
    const fishes = {...this.state.fishes};
    // 2. Update that state
    fishes[key] = null;
    // 3. Set that to state
    this.setState({ fishes });
  };
  
  loadSampleFishes = () => {
    // console.log("Loading Sample Fishes");
    this.setState({ fishes: sampleFishes });
  };
  
  addToOrder = (key) => {
    console.log('Adding to Order');
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or updated the number in our order
    order[key] = order[key] + 1 || 1;
    //3. Call setState to update our state object
    this.setState({ order });
  }
  
  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. remove that item from the order
    delete order[key];
    // 3. call the setState to update our state object
    this.setState({ order });
  }
  
  render (){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
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
        {/* <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} fish={this.state.fishes} /> */}
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;