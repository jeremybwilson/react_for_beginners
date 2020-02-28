import React from 'react';
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">Of</span>
          <span className="the">The</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  )
}

// stateless functional component so propTypes go after the component function
Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;
