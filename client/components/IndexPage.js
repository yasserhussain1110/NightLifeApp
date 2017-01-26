import React from 'react';
import Header from './Header';
import Search from './Search';
import ResultArea from './ResultArea';
import SearchSpinner from './SearchSpinner';

export default ({bars, searching}) => (
  <div id="#app">
    <Header/>
    <Search/>
    {searching ? <SearchSpinner /> : ""}
    <ResultArea bars={bars}/>
  </div>
);
