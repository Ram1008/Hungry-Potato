import './desktopSearch.scss';
import { CiSearch } from "react-icons/ci";

const DesktopSearch = ({setSearchTerm}) => {

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
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default DesktopSearch;
1