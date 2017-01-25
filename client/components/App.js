import React, {Component} from 'react';
import {connect} from 'react-redux';
import FirstPage from './FirstPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      searching: false
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
      <FirstPage
        searching={this.state.searching}
        bars={this.state.bars}/>
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
