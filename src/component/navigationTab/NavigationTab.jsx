import { useContext } from 'react';
import { dishContext } from '../../context';

const NavigationTab = ({tab}) => {
  const {filterDishesByTags} = useContext(dishContext);

  const handleClick = () =>{
    filterDishesByTags(tab.tag);
  }
  return (
         <div onClick={handleClick}>{tab.labal}</div>
    
  )
}

export default NavigationTab;