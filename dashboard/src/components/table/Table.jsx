import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import {API_URL} from "../../config"


const List = () => {
  
  const [url,setUrl]=useState('')
  let [response,setResponse]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [limit,setLimit]=useState(4)
  

  const { data , isLoading , isError , error ,isSuccess,refetch} =useQuery('Get_warrenty_claim', async () => {
    
  
    return  await axios.get(`${API_URL}getWarrentyClaims?page=${currentPage}&limit=${limit}`).then((res)=>setResponse(res.data))

  });
  
  // setResponse(data)
  
  if (isLoading) {
    
    return (<div>
      <h1>Loading</h1>
    </div>)
  }
  if (isError) {
    return (<div>
      <h1>'Problem Getting Data':{error}</h1>
    </div>)
  }
  console.log(response)
  
  const HandlePagination= (page)=>{
    setCurrentPage(page)

    return  axios.get(`${API_URL}getWarrentyClaims?page=${page}&limit=${limit}`).then((res)=>setResponse(res.data))
    



  }

    
    
  
  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className="tableCell">Ticket No</TableCell>
            <TableCell className="tableCell">Full Name</TableCell>
            <TableCell className="tableCell">Contact No</TableCell>
            <TableCell className="tableCell">Battery Brand</TableCell>
            <TableCell className="tableCell">Battery Type</TableCell>
            <TableCell className="tableCell">Battery Sr.No</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        
    {response && response.result && response?.result.map((row,index) => {
          return(
          <TableBody>
            <TableRow key={row.ticket_no}>
              
              <TableCell className="tableCell">{row.ticket_no}</TableCell>
              <TableCell className="tableCell">{row.Name} {row.last_name}</TableCell>
              <TableCell className="tableCell">{row.contact}</TableCell>
              <TableCell className="tableCell">{row.battery_brand}</TableCell>
              <TableCell className="tableCell">{row.battery_type}</TableCell>
              <TableCell className="tableCell">{row.battery_serialNumber}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          </TableBody>
          )
          
        })}
      </Table>
    </TableContainer>
    <div>
     {
      response && response.prev &&
      
      <input type="button" value="Previous"  onClick={()=>{
        HandlePagination(response.prev.page)}}/>
     }
      {
      response && response.next &&
      <input type="button" value="Next" onClick={()=>{
        HandlePagination(response.next.page)
      
      }}className="float-end"/>

      // <button  onClick={()=>setUrl(data.data.next)}className="float-end">Next</button>
}
    </div>
  </>
  );
};


export default List;
