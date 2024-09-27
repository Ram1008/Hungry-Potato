import { Route, Routes } from 'react-router-dom';
import {AuthState, DishState, OrderState, UserState, AdminState} from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register, Cart, Profile, Cook, Admin, Manager, ManagerState, CookState, StatusDisplay, StatusDisplayState, AS } from './container';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <AuthState>
      <AdminState>
        <UserState>
          <OrderState>
            <DishState>
                <Routes>
                  <Route path="/" element={ <Home />} />
                  <Route path="login" element={<Login />} />    
                  <Route path="register" element={<Register />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="cook" element ={<CookState><Cook/></CookState>}/>
                  <Route path="admin" element ={<AS><Admin/></AS>}/>
                  <Route path="manager" element ={<ManagerState><Manager/></ManagerState>}/>
                  <Route path="status" element ={<StatusDisplayState><StatusDisplay/></StatusDisplayState>}/>
                </Routes>
                <ToastContainer />
              </DishState>
          </OrderState>
        </UserState>
      </AdminState>
    </AuthState>
  );
};

export default App;
