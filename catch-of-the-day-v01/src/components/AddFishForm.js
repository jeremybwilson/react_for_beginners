import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();
  
  static propTypes = {
    addFish: PropTypes.func
  }
  
  createFish = event => {
    // 1. stop the form from submitting
    event.preventDefault();
    console.log(this.nameRef.current.value);
    // 2. create the individual fish object
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };
    // state   // console.log(fish);
    this.props.addFish(fish);
    // refresh the form
    event.currentTarget.reset();

  };
  render(){
    return (
      <form action="" className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="description" ref={this.descRef} type="text" placeholder="description"></textarea>
        <input name="image" ref={this.imageRef} type="text" placeholder="image" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;