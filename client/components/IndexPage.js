import React from 'react';
import Header from './Header';
import Search from './Search';
import ResultArea from './ResultArea';
import SearchSpinner from './SearchSpinner';

export default ({bars, searching, goerButtonClick}) => (
  <div id="#app">
    <Header/>
    <Search/>
    {searching ? <SearchSpinner /> : ""}
    <ResultArea
      goerButtonClick={goerButtonClick}
      bars={bars}/>
  </div>
);
