import React from 'react';

const ResultArea = ({bars, goerButtonClick}) => {
  return (
    <ul className="bar-list">{bars.map((bar, id) =>
      <li key={bar.id} className="bar">
        <img src={bar.image_url}/>
        <div className="bar-info">
          <a className="bar-name" href={bar.url}>{bar.name}</a>
          <a className="number-goers" onClick={goerButtonClick.bind(null, id)}>{bar.numberOfGoers} GOING</a>
          <p className="snippet"><i>"{bar.snippet_text}"</i></p>
        </div>
      </li>)}
    </ul>
  );
};

export default ResultArea;
