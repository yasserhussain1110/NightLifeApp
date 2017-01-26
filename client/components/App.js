import IndexPage from './IndexPage';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {asyncPost, asyncGet} from '../serverInteraction/makeServerRequest';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bars: props.bars,
      searching: props.searching
    };

    this.indicateGoing = this.indicateGoing.bind(this);
    this.tryToLogIn = this.tryToLogIn.bind(this);
    this.goerButtonClick = this.goerButtonClick.bind(this);
  }

  tryToLogIn() {
    window.location = "/login"
  }

  indicateGoing(barIndex) {
    let bar = this.state.bars[barIndex];
    asyncPost('/api/indicateGoing', {barId: bar.id},
      res => console.log(res),
      res => console.log(res)
    );
  }

  goerButtonClick(barIndex, event) {
    event.preventDefault();
    event.stopPropagation();

    asyncGet('/isLoggedIn',
      apiRes => {
        if (apiRes.loggedIn) {
          this.indicateGoing(barIndex);
        } else {
          this.tryToLogIn();
        }
      },
      apiRes => console.log(apiRes.loggedIn)
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bars: nextProps.bars,
      searching: nextProps.searching
    });
  }

  render() {
    return (
      <IndexPage
        bars={this.state.bars}
        searching={this.state.searching}
        goerButtonClick={this.goerButtonClick}
      />
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
