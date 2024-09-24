import './DesktopNavTab.scss';

const DesktopNavTab = ({activeTab, setActiveTab, tabData}) => {

  return (
    
      <ul className='desktopNav_container'>
       { tabData.map(tab => (
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
