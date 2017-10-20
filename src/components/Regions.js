import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '.';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Regions extends Component {
  onSelectRegion = (e, region) => {
    e.preventDefault();
    this.props.onSelectRegion(region);
  };

  render() {
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align">Regions</h2>
        <div className="collection">
          {this.props.regions.map(region => (
            <a
              key={region}
              href="#!"
              onClick={e => this.onSelectRegion(e, region)}
              className={['collection-item', region === this.props.region ? 'active' : ''].join(
                ' '
              )}>
              {region}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

class _RegionsPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchRegions());
  }

  onSelectRegion = region => {
    const root =
      window.location.hostname === 'react-bootcamp.github.io' ? '/react-wines-103/' : '/';
    this.context.router.push({
      pathname: `${root}regions/${region}`,
    });
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <Regions onSelectRegion={this.onSelectRegion} regions={this.props.regions} region={{}} />
    );
  }
}

function mapFromStoreToProps(store) {
  return {
    regions: store.regions,
    loading: store.loading === 'HTTP_LOADING',
  };
}

export const RegionsPage = connect(mapFromStoreToProps)(_RegionsPage);
