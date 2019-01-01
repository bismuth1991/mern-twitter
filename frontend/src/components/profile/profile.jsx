import React from 'react';
import {
  func, number, string, arrayOf, shape,
} from 'prop-types';

import TweetBox from '../tweets/tweet_box';

class Profile extends React.Component {
  componentDidMount() {
    const { fetchUserTweets, currentUser } = this.props;

    fetchUserTweets(currentUser.id);
  }

  render() {
    const { tweets } = this.props;

    if (tweets.length === 0) {
      return (<div>This user has no Tweets</div>);
    }
    return (
      <div>
        <h2>All of This User&apos;s Tweets</h2>

        {tweets.map(tweet => (
          <TweetBox key={tweet.user} text={tweet.text} />
        ))}
      </div>
    );
  }
}

Profile.propTypes = {
  fetchUserTweets: func.isRequired,
  currentUser: shape({ id: number }).isRequired,
  tweets: arrayOf(shape({
    user: number,
    text: string,
  })).isRequired,
};

export default Profile;
