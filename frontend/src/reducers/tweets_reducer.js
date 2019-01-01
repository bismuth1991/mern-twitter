import { RECEIVE_TWEETS, RECEIVE_USER_TWEETS, RECEIVE_NEW_TWEET } from '../actions/tweet_actions';

const initalState = {
  all: {},
  user: {},
  new: undefined,
};

const tweetsReducer = (state = initalState, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        all: action.tweets,
      };
    case RECEIVE_USER_TWEETS:
      return {
        ...state,
        user: action.tweets,
      };
    case RECEIVE_NEW_TWEET:
      return {
        ...state,
        new: action.tweet,
      };
    default:
      return state;
  }
};

export default tweetsReducer;
