import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {url} from '../../utils/constant'
import { useState } from 'react';
import ReadmoreDescription from './ReadmoreDescription';
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditEnquiryForm from './EditEnquiryForm'
import { useEffect } from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white,
    fontSize: 16,
    padding: '10px 5px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // Padding:0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover.grey,
    height: "55px",
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
    //  height: "55px",
  // },
  '& td': {
    padding: '10px 11px',
    //  height: "20px"
    },
}));


export default function CustomizedTables({enquiryData,setEnquiryData}) {

const [singleEnquiry,setSingleEnquiry] = useState(null)
const [specificEnquiryData,setSpecificEnquiryData ] = useState([])
const [show, setShow] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const handleDescriptionClick = (element) =>{
    setShow(true);
    setSingleEnquiry(element)
}

const handleEditClick = (element) => {
  setShowEditModal(true);
  setSingleEnquiry(element);
};

const token = sessionStorage.getItem('token')
// console.log("token",token)
let config = {
  headers:{
  Authorization:`Bearer ${token}`
  }
}

const getSpecificEnquiryData = async()=>{
  console.log("Specific Enquiry Data is calledd...")
  let res = await axios.get(`${url}/specificenquiry`,config)
  console.log("getSpecificEnquiryData",res.data.getEnquiry)
  setSpecificEnquiryData(res.data.getEnquiry)
}
useEffect(()=>{
  getSpecificEnquiryData()
},[])
console.log("getSpecificEnquiryData",specificEnquiryData)
const userId = sessionStorage.getItem('userId')
console.log('userId',userId)
// console.log(element.owner)



 return (
  <>
    <TableContainer component={Paper}  >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell noWrap="false" align="center" style={{width:"3%"}}>No.</StyledTableCell>
            <StyledTableCell noWrap="false" align="center" style={{width:"10%"}}>First Name</StyledTableCell>
            <StyledTableCell noWrap="false" align="center" style={{width:"10%"}}>Last Name</StyledTableCell>
            <StyledTableCell noWrap="false" align="center" style={{width:"15%"}}>Email</StyledTableCell>
            <StyledTableCell noWrap="false" align="center" style={{width:"10%"}}>Phone No.</StyledTableCell>
            <StyledTableCell style={{width:"12%"}} noWrap="false" align="center">Subject</StyledTableCell>
            <StyledTableCell style={{width:"40%"}} noWrap="false" align="center">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{fontWeight:"light"}}>
          {enquiryData?.map((element,index) => (
          // console.log(element.owner)
          // console.log(element)
           <StyledTableRow >
                 <StyledTableCell  align="center" style={{width:"3%"}}  >
                  {index + 1}
                  </StyledTableCell> 
              <StyledTableCell  align="center" style={{width:"10%"}} >
              {element.firstname}
              </StyledTableCell>
              <StyledTableCell align="center" style={{width:"10%"}}>{element.lastname}</StyledTableCell>
               <StyledTableCell align="center" style={{width:"15%"}}>{element.email}</StyledTableCell>
               <StyledTableCell align="center" style={{width:"10%"}}>{element.phone_number}</StyledTableCell>
               <StyledTableCell style={{width:"12%"}} align="center">{element.subject}</StyledTableCell>
              <StyledTableCell style={{width:"40%",padding:"5px 35px 5px 16px"}} align="center">
              <>
              <div className=' d-flex flex-row  position-relative align-items-start' style={{textAlign:"justify"}}>
                {/* Description */}
                    {
                    (element.description.length) >=200 ?
                        <>
                        { element.description.substring(0,195)+"..."}
                        </>
                        :
                        <>
                         {element.description}
                        </>
                      }
                     
                     {/* EDIT Btn*/}
                     {
                      element.owner == userId  && token   ?
                     <div className='position-absolute translate-middle' style={{right:"-43px",marginTop:'2.5%'}} >
                     <button className=' hover-edit rounded-circle btn btn-success d-flex justify-content-center p-0 align-items-center'
                     style={{height:"24px",width:"24px",right:"60px"}}
                     onClick={() => handleEditClick(element)}>
                     <MdOutlineModeEdit className='fs-6' /> 
                     </button>
                     </div>
                     :
                     null
}
                   </div>           
                   {/* READMORE */}
                   {
                   (element.description.length) >= 200 ?
                   <div className='text-end' style={{marginTop:"-3%"}} >
                   <Button className='py-0 px-1'
                   onClick={()=>handleDescriptionClick(element)}
                 variant="contained" style={{fontSize:"9px",textWrap:"noWrap",backgroundColor:"#E4A11B"}}>Read more</Button>
                   </div>
                   :
                   null
                  }
                   </>
                 </ StyledTableCell >
                 </StyledTableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    

    {show && (
      <ReadmoreDescription
      show={show}
      setShow={setShow}
      singleEnquiry={singleEnquiry} 
      setSingleEnquiry={setSingleEnquiry} 
  />
    )}
    
    {showEditModal && (
      <EditEnquiryForm
      showEditModal={showEditModal} 
      setShowEditModal={setShowEditModal}
      singleEnquiry={singleEnquiry} 
      setSingleEnquiry={setSingleEnquiry}
      setEnquiryData ={setEnquiryData}
      />
    )}
  </>
  );
}
