import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  }

  goToStore = (event) => {
    // prevent the form from submitting
    event.preventDefault();
    // 2. Get the text from the input
    const storeName = this.myInput.current.value;
    // 3. Change the page to the /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  // componentDidMount() {
  //   console.log('MOUNTED!!!');
  //   console.log(this);
  // }

  render(){
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        { /* comment */ }
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker;
