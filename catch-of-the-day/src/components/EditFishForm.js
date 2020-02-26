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
    }
    this.props.updateFish(this.props.index, updatedFish);
    // console.log('Updated Fish!');
    // console.log(updatedFish);
  }

  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    })
  }

  render(){
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.name} />
        <input
          name="price"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.price} />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.desc}></textarea>
        <input
          name="image"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.image} />
        <button type="submit" onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;
