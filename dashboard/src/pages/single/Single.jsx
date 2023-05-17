import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useQuery } from "react-query";
import axios, { Axios } from "axios";
import { useState } from "react";
// import { Retryer } from "react-query/types/core/retryer";
import {API_URL} from '../../config'
import { Navigate } from "react-router-dom";

const Single = () => {
  const [img, setImg] = useState()

  // Geting id value from URL
  let queryParameters = new URLSearchParams(window.location.search)
  const id =  queryParameters.get('id')
  
  const { data,isLoading,isError,error ,isSuccess}= useQuery('GetUser', ()=>{
  
  return axios.get(`${API_URL}user/single/${id}`)
  
  
})


  if (isError) {
    return <h1>{error.message}</h1>
  }
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />


          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>

            
              <div className="item">
                {/* <img
                  src={'http://127.0.0.1:8000' + data?.data.image}
                  alt="No image Found"
                  className="itemImg"
                /> */}

                <div className="details">
                  <h3 className="itemTitle">{data?.data.first_name} {data?.data.last_name}</h3>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data?.data.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data?.data.phone}</span>
                  </div>
                  {/* <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {data?.data.Address}
                    </span>
                  </div> */}
                  {/* <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">USA</span>
                  </div> */}
                </div>
                

              </div>


            </div>
           


            <div className="right">

            </div>
          </div>


      </div>
    </div>
  );
};

export default Single;
