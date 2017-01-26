import IndexPage from './IndexPage';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bars: props.bars,
      searching: props.searching
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bars: nextProps.bars,
      searching: nextProps.searching
    });
  }

  render() {
    return (
      <IndexPage bars={this.state.bars} searching={this.state.searching} />
    );
  }

}

function mapStateToProps(state) {
  return {
    bars: state.bars,
    searching: state.searching
  };
}

export default connect(mapStateToProps)(App);
