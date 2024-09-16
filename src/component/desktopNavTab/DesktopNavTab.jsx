import { useContext } from 'react';
import './DesktopNavTab.scss';
import { adminContext } from '../../context';

const DesktopNavTab = () => {
  const {activeTab, setActiveTab, tabData} = useContext(adminContext);

  return (
    
      <ul className='desktopNav_container'>
        
        {tabData.map(tab => (
          <li
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    
  );
};

export default DesktopNavTab;
