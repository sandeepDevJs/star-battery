import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios"
import { TableContainer } from "@mui/material";
import {API_URL} from '../../config'


const Datatable = () => {
  const { data, isLoading,refetch, isError, error } = useQuery('GetAllUsers', () => {

    return axios.get(`${API_URL}user/all`).then((res) => res.data)
  })
  
  const handleDelete = (id) => {

    return axios.delete(`${API_URL}user/delete/${id}`).then((res)=>{
      if (res.status='200'){
        alert('Deleted Succesfully')
        
        refetch()
      }else{
        alert('Problem Deleting data')

      }
    }
    

    )


  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      {/* Not Ready   */}
    
      <table>
        <thead>
        <tr>
          <td>S.r.No</td>
          <td>Username</td>
          <td>Email</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
        </thead>
    { 
      data?.map((User,index)=>{
        const viewURL=`/users/detail?id=${User._id}`
        return(
        <tbody>
        
            <td>{index+1}</td>
            <td>{User.username}</td>
            <td>{User.email}</td>
            <td>{User.isactive ? 'Active':'Not Active'}</td>
            <td><div className="cellAction">
            <Link to={viewURL} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
            onClick={() => handleDelete(User._id)}
            >
              Delete
            </div>
          </div></td>

          
        </tbody>

        )

      })

        
    }
    </table>

        

          {/* </TableContainer> */}
          
          </div >

      
  );
};

export default Datatable;
