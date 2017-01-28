import React, {Component} from 'react';
import SearchArea from './SearchArea';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lastSearchedLocationActions from '../actions/gotLastSearchedLocationAction';
import * as barActions from '../actions/barsAction';
import * as searchActions from '../actions/searchStatusAction';
import {asyncPost, asyncGet} from '../serverInteraction/makeServerRequest';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ""
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);

    this.getLastSearchedLocation();
  }

  getLastSearchedLocation() {
    var _this = this;
    asyncGet('/lastSearchedLocation',
      res => {
        _this.props.actions.gotLastSearchedLocation(res.location);
        _this.onSubmitForm();
      },
      res => console.log(res.errors)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastSearchedLocation !== this.state.location) {
      this.setState({
        location: nextProps.lastSearchedLocation
      });
    }
  }

  onSubmitForm() {
    var _this = this;

    _this.props.actions.searchStarted();

    asyncPost('/api/searchBars', {location: this.state.location},
      res => {
        _this.props.actions.foundBars(res.bars);
        _this.props.actions.searchEnded();
      },
      res => {
        console.log(res.errors);
        _this.props.actions.searchEnded();
      }
    );
  }

  onPressEnter(e) {
    if (e.key === 'Enter') {
      this.onSubmitForm();
    }
  }

  updateSearchTerm(e) {
    this.setState({location: e.target.value});
  }

  render() {
    return (
      <SearchArea
        value={this.state.location}
        updateSearchTerm={this.updateSearchTerm}
        onSubmitForm={this.onSubmitForm}
        onPressEnter={this.onPressEnter}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    lastSearchedLocation: state.lastSearchedLocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      gotLastSearchedLocation: lastSearchedLocationActions.gotLastSearchedLocation,
      foundBars: barActions.foundBars,
      searchStarted: searchActions.searchStarted,
      searchEnded: searchActions.searchEnded
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
