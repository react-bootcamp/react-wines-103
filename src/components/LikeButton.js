import React from 'react';
import { Loader } from '.';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const LikeButton = React.createClass({
  componentDidMount() {
    this.updateLike();
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.wine !== nextProps.wine) {
      this.updateLike();
    }
  },
  updateLike() {
    this.props.dispatch(Actions.fetchCurrentWineLiked(this.props.wine.id))
  },
  toggle(e) {
    e.preventDefault();
    if (this.props.liked) {
      this.props.dispatch(Actions.unlikeWine(this.props.wine.id));
    } else {
      this.props.dispatch(Actions.likeWine(this.props.wine.id));
    }
  },
  render() {
    return (
      <a className="waves-effect waves-teal btn-flat" onClick={this.toggle}>
        {this.props.loading && (<Loader />)}
        {this.props.liked === true && (<span>Unlike <i className="material-icons left">thumb_down</i></span>)}
        {this.props.liked === false && (<span>Like <i className="material-icons left">thumb_up</i></span>)}
      </a>
    );
  }
});

function mapFromStoreToProps(store) {
  return {
    liked: store.currentWine ? store.currentWine.liked : false,
    loading: store.loading === 'HTTP_LOADING',
  };
}

exports.LikeButton = connect(mapFromStoreToProps)(LikeButton);
