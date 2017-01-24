import React, {Component} from 'react';
import Header from './Header';
import Search from './Search';
import ResultArea from './ResultArea';
import request from 'superagent';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: []
    };

    this.kickOffSearch = this.kickOffSearch.bind(this);
  }

  kickOffSearch(location) {
    var _this = this;
    makeApiRequest('/api/searchBars', {location: location},
      bars => _this.setState({bars}),
      errors => console.log(errors)
    );
  }

  render() {
    return (
      <div id="#app">
        <Header/>
        <Search kickOffSearch={this.kickOffSearch}/>
        <ResultArea bars={this.state.bars}/>
      </div>
    );
  }
}

export default App;


const logError = err => console.log(err);

const makeApiRequest = (url, data, apiSuccessCallback, apiFailureCallBack) => {
  request
    .post(url)
    .type('form')
    .send(data)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      var apiRes = res.body;

      if (err) {
        apiFailureCallBack(apiRes.errors);
        return;
      }

      apiSuccessCallback(apiRes.bars);
    });
};
