import React from 'react';

const TweetBox = (props) => {
  const { text } = props;

  return (
    <>
      <h3>{text}</h3>
    </>
  );
};

export default TweetBox;
