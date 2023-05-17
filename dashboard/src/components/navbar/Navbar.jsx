import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect,useState } from "react";
import Cookies from "js-cookie";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
// import GetUser from '../../userInfo'
// import {useSession} from "../../UserSession";
import decryptToken from "../../userInfo"
import { SessionContext } from '../../userInfo';

function CheckLoggedIn(){

  const token = Cookies.get('token');

  if (!token || token===null){
    const decodedCookie = decodeURIComponent(token);
    const expirationDate = new Date(decodedCookie.split('; expires=')[1]);
    const currentDate = new Date();
    if (currentDate.getTime() > expirationDate.getTime()) {
      // cookie has expired
      Cookies.remove(token);
      return false;
    }
    return token
  }else{
    return token
  }

  
  
}



const Navbar = () => {
  
  let navigate=useNavigate()
  
 
  
 useEffect(() => {
  
  
  const isLoggedIn=CheckLoggedIn();
  if (!isLoggedIn||isLoggedIn===null){
    navigate('/login');
  }else{
    
    
   
  }

 })


  
  const { dispatch } = useContext(DarkModeContext);


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">99</div>
          </div>
          <div className="item">
            <AccountCircleIcon className="icon"/>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
