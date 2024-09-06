import UserProfilePhoto from '../assets/images/UserProfilePhoto.svg';
import ChickenBurger from '../assets/images/ChickenBurger.svg';
import Avatar1 from '../assets/images/avatar1.png';
import Avatar2 from '../assets/images/avatar2.png';
import Avatar3 from '../assets/images/avatar3.png';
import Avatar4 from '../assets/images/avatar4.png';
import Avatar5 from '../assets/images/avatar5.png';
import Avatar6 from '../assets/images/avatar6.png';
import Avatar7 from '../assets/images/avatar7.png';
import Avatar8 from '../assets/images/avatar8.png';
import Avatar9 from '../assets/images/avatar9.png';
import Avatar10 from '../assets/images/avatar10.png';
import Avatar11 from '../assets/images/avatar11.png';
import Avatar12 from '../assets/images/avatar12.png';
import Avatar13 from '../assets/images/avatar13.png';
import Avatar14 from '../assets/images/avatar14.png';


export const avatars = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14

]

export const cook = {
  _id: "66ab5c4881f639d8c84d0ec1",
    name: "John Doe",
    email: "john@gmail.com",
    role: "cook",
    phone: "1234567890",
    address: "Mandir Street",
    profilePicture: UserProfilePhoto,
    dateOfBirth: "2000-10-22T00:00:00.000Z",
    isActive: false,
}

export const user = {
    _id: "66ab5c4881f639d8c84d0ec1",
    name: "Ramkrishna Birla",
    email: "rmkbirla@gmail.com",
    role: "admin",
    phone: "+916263415869",
    address: "Mandir Street Sanawad MP India 451113",
    profilePicture: UserProfilePhoto,
    dateOfBirth: "2000-10-22T00:00:00.000Z",
    isActive: false,
  };

export const pastOrders = [
    {
      _id: "12345",
      name: "Chicken Burger",
      image: ChickenBurger,
      servingSize: "Small",
      price: "280",
      addons: ["Coke", "Cheese dip"],
    },
    {
      _id: "23456",
      name: "Cheese Burger",
      image: ChickenBurger,
      servingSize: "Small",
      price: "280",
      addons: ["Coke", "Cheese dip"],
    },
    {
      _id: "34567",
      name: "Farm Veggy Burger",
      image: ChickenBurger,
      servingSize: "Large",
      price: "320",
      addons: ["Coke", "Cheese dip"],
    },
  ];