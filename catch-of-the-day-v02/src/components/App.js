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

  componentDidMount() {
    // console.log("MOUNTED");
    const { params } = this.props.match;

    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      // console.log(`Restoring the localStorageRef ${params.storeId} for it!`);
      // console.log(JSON.parse(localStorageRef));
      this.setState({ order: JSON.parse(localStorageRef) });
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
    // console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // component "lifecycle" method - componentWillUnmount
  componentWillUnmount(){
    // console.log("UNMOUNTED");
    base.removeBinding(this.ref);
  }

  // create addFish method
  addFish = (fish) => {
    // console.log('Adding a FISH!');
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes };
    // 2. Add our new fish to our fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      // fishes: fishes
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state (fish)
    // we are already in the component where the state lives
    const fishes = {...this.state.fishes};
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    // console.log('Loading Fishes');
    this.setState({ fishes: sampleFishes });
  }

  deleteFish = (key) => {
   console.log('Deleting a fish');
   // 1. take a copy of state
   // because it is an object, we first take a copy of it
   const fishes = { ...this.state.fishes }
   // 2. update the state
   fishes[key] = null;
   // 3. update state
   this.setState({ fishes });

  }

  addToOrder = (key) => {
    console.log('Adding to the order');
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to updated our state object
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    console.log('Removing from the order');
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove that itemf from order
    delete order[key];
    // 3. Call setState to update our state object
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
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
