import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }
  
  handleChange = event => {
    console.log(event.currentTarget.value);
    // Update that fish
    // 1. Take a copy of the existing state
    const updatedFish = { 
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value  // computed property names example
     };
    console.log(updatedFish);
    // this.props.updateFish(key, updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };
  
  render(){
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
        <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
        <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
        <input type="text" onChange={this.handleChange} name="image" value={this.props.fish.image} />
        {/* <button type="submit">+ Edit Fish</button> */}
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;