import Layout from '../../wrapper/desktopLayout/Layout';
import './Manager.scss';
import { DesktopProfile } from '../../component';
import { useContext, useEffect} from 'react';
import { adminContext, managerContext, userContext } from '../../context';
import { activeOrders} from '../../constants/managerConstants';

const Manager = () => {
  
  const { getActiveOrders, completeOrder, showSummary, setShowSummary, summaryDetail, setSummaryDetail } = useContext(managerContext);
  const { setEditData, setShowTab, setTabData, showProfile, setShowProfile,  setShowEditModal, showEditModal, editData, activeTab, searchTerm, setShowSearch } = useContext(adminContext);
  const {user, editUser, getUser} = useContext(userContext);
  

  let viewOrders = activeTab === 'All' ? activeOrders : activeOrders.filter(order => order.seating === activeTab)

  if (searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
  
    viewTables = viewOrders.filter(order => {

      return (
        order.tableNumber.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
  }

  const handleShowSummary = (order) => {
      setSummaryDetail(order);
      setShowSummary(true);
  };

  const uniqueSeatings = (activeOrders) => {
    console.log(activeOrders)
    const uniqueSeatings = new Set();
    uniqueSeatings.add('All');
    activeOrders.forEach((table) => {
      uniqueSeatings.add(table.seating);
    });
    return Array.from(uniqueSeatings);
  };
  


  useEffect( () =>{
    getUser();
    getActiveOrders();
    setShowSearch(true);
    setShowTab({show: true, data: uniqueSeatings(activeOrders)});
  }, [])

  return (
    <Layout heading="Welcome Manager">
      {!showProfile ? showSummary ? <div> </div> :
       <div className='manager_container'>
           {viewOrders.map((order, index) => 
            <div key={index}>
              {order.tables.map((table, idx) =>(

              <div key={idx} className={`table_status ${table.status.toLowerCase()}`}>
                {table.status.toUpperCase()}
              </div>
              )
            )}
            </div>
           )}
        </div>:
      <DesktopProfile editUser = {editUser} user = {user? user.user: null} setShowProfile={setShowProfile}/>}
    </Layout>
  );
};

export default Manager;
