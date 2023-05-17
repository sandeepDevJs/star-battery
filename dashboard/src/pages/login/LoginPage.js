import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import "./LoginPage.css"
import logo from "./logo2.png"
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
// import AuthContext from '../../context/AuthContext';
import {API_URL} from '../../config'

function LoginPage() {
  const navigate= useNavigate();


  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [msg, setMsg] = useState('');

  

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try{

      const response= await axios.post(`${API_URL}login`,formData,{
        headers: {
          'Content-Type': 'application/json'
        }
      })  
      console.log(response)
  
      
      if(response.status===200){
        Cookies.set('token', response.data, { expires: 2 });
        navigate('/')
      }
    }catch(err){


      if(err.response.status===401){
        
        setMsg('Invalid Credentials')
      }
    }
    


  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="container">
      <img src={logo} alt="Logo" style={{ width: "300px", height: "auto" }} />
      <h3>LOGIN </h3>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            name="username"
            variant='outlined'
            margin="normal"
            autoComplete="off"
            fullWidth
            value={formData.username}
            onChange={handleChange} required />

          <TextField
            label="Password"
            type="password"
            name="password"
            variant='outlined'
            margin="normal"
            autoComplete="off"
            fullWidth
            value={formData.password}
            onChange={handleChange} required />

          {/* {
            isLoading && <div>
              Loading...
            </div>
          }  */}
          {
            msg && <div style={{ color: 'red', marginBottom: "10px", fontsize: "1.2rem" }}>{msg}</div>}
          <div style={{ marginTop: "1rem" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
