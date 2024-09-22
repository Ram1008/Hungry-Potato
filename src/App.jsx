import { Route, Routes } from 'react-router-dom';
import {AuthState, DishState, OrderState, UserState, AdminState, ManagerState} from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register, Cart, Profile, Cook, Admin, Manager } from './container';

const App = () => {
  return (
    <AuthState>
      <AdminState>
        <UserState>
          <OrderState>
            <DishState>
              <ManagerState>
                <Routes>
                  <Route path="/" element={ <Home />} />
                  <Route path="login" element={<Login />} />    
                  <Route path="register" element={<Register />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="cook" element ={<Cook/>}/>
                  <Route path="admin" element ={<Admin/>}/>
                  <Route path="manager" element ={<Manager/>}/>
                </Routes>
                <ToastContainer />
              </ManagerState>
            </DishState>
          </OrderState>
        </UserState>
      </AdminState>
    </AuthState>
  );
};

export default App;
