import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = (key) => {
    console.log('Rendering order');
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 }
    };
    const transitionOptions2 = {
      classNames: "count",
      key: count,
      timeout: { enter: 250, exit: 250 }
    };

    // make sure fish is loaded before we continue
    if(!fish) return null;

    if(!isAvailable){
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available.
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <TransitionGroup component="span" className="count">
            <CSSTransition {...transitionOptions2}>
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          {count} lbs {fish.name}
          &nbsp;{formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </li>
      </CSSTransition>
    )
  };

  render(){
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';  // create an isAvailable variable based on the fishes object
      // if the fish is available,
      if(isAvailable){
        return prevTotal + (count * fish.price); // then return the previous total plus the count * fish price
      }
      return prevTotal; // otherwise return just the previous total
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;
