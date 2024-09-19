import { useContext } from 'react';
import './DesktopSearch.scss';
import { CiSearch } from "react-icons/ci";
import { adminContext } from '../../context';

const DesktopSearch = () => {
  const {setSearchTerm, searchTerm} = useContext(adminContext);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search-bar'>
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

export default DesktopSearch;
