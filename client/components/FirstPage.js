import Header from './Header';
import Search from './Search';
import ResultArea from './ResultArea';
import SearchSpinner from './SearchSpinner';
import React from 'react';


export default ({bars, searching}) => {
  return (
    <div id="#app">
      <Header/>
      <Search/>
      {searching ? <SearchSpinner /> : ""}
      <ResultArea bars={bars}/>
    </div>
  );
};
