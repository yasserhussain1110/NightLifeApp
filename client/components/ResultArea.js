import React from 'react';

const ResultArea = ({bars}) => {
  return (
    <ul className="bar-list">{bars.map(bar =>
      <li key={bar.id} className="bar">
        <img src={bar.image_url}/>
        <div className="bar-info">
          <a className="bar-name" href={bar.url}>{bar.name}</a>
          <a className="number-goers">0 GOING</a>
          <p className="snippet"><i>"{bar.snippet_text}"</i></p>
        </div>
      </li>)}
    </ul>
  );
};

export default ResultArea;
