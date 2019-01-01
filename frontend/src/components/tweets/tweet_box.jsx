import React from 'react';
import { string } from 'prop-types';

const TweetBox = (props) => {
  const { text } = props;

  return (
    <>
      <h3>{text}</h3>
    </>
  );
};

TweetBox.propTypes = {
  text: string.isRequired,
};

export default TweetBox;
