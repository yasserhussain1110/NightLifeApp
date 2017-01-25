import React from 'react';

export default ({value, updateSearchTerm, onSubmitForm}) => (
  <div className="search">
    <input className="search-input" onChange={updateSearchTerm}
           placeholder="WHERE YOU AT?" value={value}/>
    <button onClick={onSubmitForm}>GO</button>
  </div>
);
