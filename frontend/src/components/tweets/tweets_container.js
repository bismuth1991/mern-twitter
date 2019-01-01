import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweet_actions';
import Tweets from './tweets';

const mapStateToProps = state => ({
  tweets: Object.values(state.tweets.all),
});

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets()),
});

const TweetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tweets);

export default TweetsContainer;
