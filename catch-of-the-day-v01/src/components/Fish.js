import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  }
  render(){
    // set multiple variables thru ES6 destructuring
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to Cart' : 'Sold Out!'}</button>
      </li>
    )
  }
}

export default Fish;