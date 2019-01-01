import { connect } from 'react-redux';
import { fetchUserTweets } from '../../actions/tweet_actions';
import Profile from './profile';

const mapStateToProps = state => ({
  tweets: Object.values(state.tweets.user),
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUsertweets: userId => dispatch(fetchUserTweets(userId)),
});

const ProfileContaier = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContaier;
