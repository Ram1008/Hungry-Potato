import { useContext } from 'react';
import { dishContext } from '../../context';

const NavigationTab = () => {

  const NavigationOptions = [
    {
      labal: 'All',
        tag: 'all'
    },
    {
        labal: 'Burgers',
        tag: 'burger'
    },
    {
        labal: 'Pizzas',
        tag: 'pizza'
    },
    {
        labal: 'Cakes',
        tag: 'cake'
    },
    {
        labal: 'Thalis',
        tag: 'thali'
    },

]

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