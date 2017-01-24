import React, {Component} from 'react';
import Header from './Header';
import Search from './Search';
import ResultArea from './ResultArea';
import request from 'superagent';
import apiData from '../test/init_data';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: apiData
    };

    this.kickOffSearch = this.kickOffSearch.bind(this);
  }

  kickOffSearch(searchTerm) {
    var _this = this;
    makeApiRequest('/api/searchBars', {term: searchTerm},
      res => _this.setState({bars: res.bars}),
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

const makeApiRequest = (url, data, apiSuccessCallback, apiFailureCallBack, generalErrorCallback = logError) => {
  request
    .post(url)
    .type('form')
    .send(data)
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) {
        generalErrorCallback(err);
        return;
      }


      if (res.errors) {
        apiFailureCallBack(res.errors);
      } else {
        apiSuccessCallback(res);
      }
    });
};
