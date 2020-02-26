import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  goToStore = (event) => {
    // 1. stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.current.value;
    console.log(storeName);
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  componentDidMount() {
    console.log('MOUNTED!');
    console.log(this);
  }

  render() {
    return (
      <div>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          {/* <button onClick={this.handleClick}>Click Me</button> */}
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
            />
        <button type="submit">Visit Store →</button>
        </form>
      </div>
    );
  }
}

export default StorePicker;
