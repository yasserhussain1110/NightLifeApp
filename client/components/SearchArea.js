import React from 'react';

export default ({value, updateSearchTerm, onSubmitForm, onPressEnter}) => (
  <div className="search">
    <input onKeyPress={onPressEnter} className="search-input" onChange={updateSearchTerm}
           placeholder="WHERE YOU AT?" value={value}/>
    <button onClick={onSubmitForm}>GO</button>
  </div>
);
