import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  /* reason propTypes are static is we are declaring the propTypes for all of the fish
   *  so by putting it on the main Fish component
   *  we are not unnecessarily copying those propTypes to every single instance */

  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    }),
    addToOrder: PropTypes.func
  };

  handleClick = () => {
    console.log('Adding to Order!');
    this.props.addToOrder(this.props.index);
  }

  render(){
    const { name, price, status, desc, image } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={ image } alt={ name } />
        <h3 className="fish-name">
          { name }
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{ desc }</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>{isAvailable ? 'Add to Order' : 'Out of Stock'}</button>
      </li>
    )
  }
}

export default Fish;
