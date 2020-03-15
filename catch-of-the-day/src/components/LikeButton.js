import React from 'react';
import { render } from 'react-dom';

const el = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return el(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
      );
    }
  }

// const domLikeButtonContainer = document.querySelectorAll('.like_button_container');

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    render(
      el(LikeButton, { commentID: commentID }),
      domContainer
    );
  });

export default LikeButton;
