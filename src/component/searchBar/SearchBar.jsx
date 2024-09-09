import './search.scss';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='searchBar_container'>
      <CiSearch className='search-icon' />
      <input 
        className='search-input' 
        type='text' 
        placeholder='Search'
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
