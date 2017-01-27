import React from 'react';
import Header from './Header';
import Search from './Search';
import BarList from './BarList';
import SearchSpinner from './SearchSpinner';
import About from './About';

export default ({bars, searching, goerButtonClick}) => (
  <div id="#app">
    <Header/>
    <Search/>
    {searching ? <SearchSpinner /> : ""}
    <BarList
      goerButtonClick={goerButtonClick}
      bars={bars}/>
    <About />
  </div>
);
