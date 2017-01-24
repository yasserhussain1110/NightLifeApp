import React,{Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ""
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    this.props.kickOffSearch(this.state.searchTerm);
  }

  updateSearchTerm(e) {
    this.setState({searchTerm: e.target.value});
  }

  render() {
    return (
      <SearchDiv
        value={this.state.searchTerm}
        updateSearchTerm={this.updateSearchTerm}
        onSubmitForm={this.onSubmitForm}
      />
    );
  }
}

const SearchDiv = ({value, updateSearchTerm, onSubmitForm}) => {
  return <div className="search">
    <input className="search-input" onChange={updateSearchTerm}
           placeholder="WHERE YOU AT?" value={value}/>
    <button onClick={onSubmitForm}>GO</button>
  </div>
};

export default Search;
