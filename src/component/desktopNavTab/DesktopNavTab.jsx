import './DesktopNavTab.scss';
import { useState } from 'react';

const DesktopNavTab = () => {
  const [activeTab, setActiveTab] = useState('Customers');

  return (
    <div className='desktopNav_container'>
      <ul>
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
    </div>
  );
};

export default DesktopNavTab;
