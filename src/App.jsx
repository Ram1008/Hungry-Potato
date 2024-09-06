import { Route, Routes } from 'react-router-dom';
import {AuthState, DishState, OrderState, UserState} from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register, Cart, Profile, Cook, Admin } from './container';

const App = () => {
  return (
    <AuthState>
      <UserState>
        <DishState>
        <OrderState>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="login" element={<Login />} />    
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cook" element ={<Cook/>}/>
            <Route path="admin" element ={<Admin/>}/>
          </Routes>
          <ToastContainer />
          </OrderState>
        </DishState>
      </UserState>
    </AuthState>
  );
};

export default App;
