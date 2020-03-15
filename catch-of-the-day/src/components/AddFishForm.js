import React from 'react';
import { render } from 'react-dom';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    // 1. stop the form from submitting
    event.preventDefault();
    console.log('Making a Fish!');
    // 2. create a fish object
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),  // eg., 1054 cents
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    // 3. set the fish into state
    this.props.addFish(fish);
    // 4. refresh the form
    event.currentTarget.reset();

  }

  render(){
    return (
      <form action="" className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" ref={this.nameRef} placeholder="Name" />
        <input type="text" name="price" ref={this.priceRef} placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" ref={this.descRef} placeholder="Description"></textarea>
        <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;
