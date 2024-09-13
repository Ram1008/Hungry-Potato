import './DesktopNavTab.scss';
import { useState } from 'react';

const DesktopNavTab = () => {
  const [activeTab, setActiveTab] = useState('Customers');

  return (
    
      <ul className='desktopNav_container'>
        {['Customers', 'Staff', 'Admins', 'Cooks'].map(tab => (
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
