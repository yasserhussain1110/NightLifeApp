import React from 'react';

const ResultArea = ({yelpSearchResult}) => {

  if (yelpSearchResult.length == 0) {
    return <ul>
      <li></li>
    </ul>;
  }


  return (
    <ul className="bar-list">{yelpSearchResult.map((bar) =>
      <li key={bar.url} className="bar clearfix">
        <img src={bar.image_url} />
        <a className="bar-name" href={bar.url}>{bar.name}</a>
        <a className="number-goers">0 GOING</a>
        <p><i className="snippet">"{bar.snippet_text}"</i></p>
      </li>)}
    </ul>
  );
};

export default ResultArea;
