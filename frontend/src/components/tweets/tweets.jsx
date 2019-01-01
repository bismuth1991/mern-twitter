import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  arrayOf, func, shape, number, string,
} from 'prop-types';

import TweetBox from './tweet_box';

class Tweets extends React.Component {
  componentDidMount() {
    const { fetchTweets } = this.props;
    fetchTweets();
  }

  render() {
    const { tweets } = this.props;

    if (tweets.length === 0) {
      return (<div>There are no Tweets</div>);
    }
    return (
      <div>
        <h2>All Tweets</h2>
        {tweets.map(tweet => (
          <TweetBox key={tweet.id} text={tweet.text} />
        ))}
      </div>
    );
  }
}

Tweets.propTypes = {
  fetchTweets: func.isRequired,
  tweets: arrayOf(shape({
    user: number,
    text: string,
  })).isRequired,
};

export default withRouter(Tweets);
