import React from 'react';
import { Comment, Loader } from '.';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const CommentList = React.createClass({
  componentDidMount() {
    this.updateList();
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.wine !== nextProps.wine) {
      this.updateList();
    }
  },
  updateList() {
    this.props.dispatch(Actions.fetchCurrentWineComments(this.props.wine.id));
  },
  render() {
    return (
      <div>
        {this.props.comments.length > 0 && <h5>Comments</h5>}
        {this.props.loading && <Loader />}
        {!this.props.loading && this.props.comments.map(comment => <Comment key={comment.date} comment={comment} />)}
      </div>
    );
  }
});

function mapFromStoreToProps(store) {
  return {
    comments: store.currentWine ? store.currentWine.comments : [],
    loading: store.loading === 'HTTP_LOADING',
  };
}

exports.CommentList = connect(mapFromStoreToProps)(CommentList);
