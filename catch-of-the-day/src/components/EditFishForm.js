import React from 'react';
import { render } from 'react-dom';

class EditFishForm extends React.Component {

  handleChange = event => {
    console.log('Handling the event!');
    console.log(event.target);
    // update that fish
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // name: event.currentTarget.value,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish);
  }

  render(){
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Available</option>
        </select>
        <textarea
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.desc}></textarea>
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button type="submit" onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;
