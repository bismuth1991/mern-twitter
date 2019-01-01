import React from 'react';
import { shape, func, string } from 'prop-types';
import TweetBox from './tweet_box';

class TweetCompose extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { text } = this.state;
    const { composeTweet } = this.props;

    const tweet = { text };
    composeTweet(tweet);

    this.setState({ text: '' });
  }

  update() {
    return e => this.setState({
      text: e.currentTarget.value,
    });
  }

  render() {
    const { text } = this.state;
    const { newTweet } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="textarea"
              value={text}
              onChange={this.update()}
              placeholder="Write your tweet..."
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <br />

        <TweetBox text={newTweet.text} />
      </>
    );
  }
}

TweetCompose.propTypes = {
  composeTweet: func.isRequired,
  newTweet: shape({ text: string }).isRequired,
};

export default TweetCompose;
