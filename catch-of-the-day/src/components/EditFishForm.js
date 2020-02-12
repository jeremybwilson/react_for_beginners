import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    console.log('Editing Fish!');
    console.log(event.currentTarget.name);
    // update the fish
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      desc:  PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }
  
  render(){
    return (
      <div className="fish-edit">
        <input 
          type="text" 
          name="name" 
          onChange={this.handleChange}
          placeholder="Name" 
          value={this.props.fish.name}
        />
        <input 
          type="text" 
          name="price" 
          onChange={this.handleChange}
          placeholder="Price" 
          value={this.props.fish.price}
        />
        <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          name="desc" 
          onChange={this.handleChange}
          placeholder="Description" 
          value={this.props.fish.desc}></textarea>
        <input 
          type="text" 
          name="image" 
          onChange={this.handleChange}
          placeholder="Image" 
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    )
  }
}

export default EditFishForm;