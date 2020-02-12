import React from "react";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();
  
  createFish = event => {
    // 1. stop the form from submitting
    event.preventDefault();
    // 2. create the individual fish object
    const fish = {
      nameRef: this.nameRef.current.value,
      priceRef: parseFloat(this.priceRef.current.value),
      statusRef: this.statusRef.current.value,
      descRef: this.descRef.current.value,
      imageRef: this.imageRef.current.value
    }
    // state 
    this.props.addFish(fish);
    // refresh the form
    event.currentTarget.reset();
  };
  render(){
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" ref={this.nameRef} placeholder="Name" />
        <input type="text" name="price" ref={this.priceRef} placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
        <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;