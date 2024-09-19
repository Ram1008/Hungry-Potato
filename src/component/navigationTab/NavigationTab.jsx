import { useContext } from 'react';
import { dishContext } from '../../context';
import { NavigationOptions } from '../../constants/dishConstants';

const NavigationTab = () => {

  const {setFilterTag} = useContext(dishContext);

  const handleClick = (val) =>{
    setFilterTag(val);
  }

  return (
    <>
      {NavigationOptions.map((tab) => (
        <div key={tab.tag} onClick={() => handleClick(tab.tag)}>{tab.labal}</div>
        ))}
    </>
  )
}

export default NavigationTab;