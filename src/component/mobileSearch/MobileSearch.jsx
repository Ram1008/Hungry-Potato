import { useContext } from 'react';
import { dishContext } from '../../context';
import './MobileSearch.scss';
import { CiSearch } from "react-icons/ci";

const MobileSearch = () => {
  const {setSearchTerm, searchTerm} = useContext(dishContext);

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
        name = 'searchTerm'
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default MobileSearch;
