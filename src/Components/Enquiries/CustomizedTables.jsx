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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white,
    fontSize: 16,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
  backgroundColor: theme.palette.action.hover.grey,

  },
}));

export default function CustomizedTables({enquiryData,setEnquiryData}) {
  console.log(enquiryData)
  // const [specificEnquiryData,setSpecificEnquiryData] = useState([])
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

const navigate=useNavigate()
const token = sessionStorage.getItem('token')
console.log("token",token)
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
// console.log('userId',userId)


// Smaller screen size = description is 30letter
// larger screen size >>
//edit option is only for logged in user who added this enquiry

  return (
  <>
    <TableContainer component={Paper} className='border border-2 border-secondary' style={{}} >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell noWrap="false" align="left" >First Name</StyledTableCell>
            <StyledTableCell noWrap="false" align="left">Last Name</StyledTableCell>
            <StyledTableCell noWrap="false" align="centnper">Email</StyledTableCell>
            <StyledTableCell noWrap="false" align="left">Phone No.</StyledTableCell>
            <StyledTableCell noWrap="false" align="left">Subject</StyledTableCell>
            <StyledTableCell noWrap="false" align="left">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{fontWeight:"light"}}>
          {enquiryData?.map((element) => (
            <StyledTableRow hover={true} >
              <StyledTableCell  align="left" scope="row">
                {element.firstname}
              </StyledTableCell>
              <StyledTableCell align="left">{element.lastname}</StyledTableCell>
              <StyledTableCell align="left">{element.email}</StyledTableCell>
              <StyledTableCell align="left">{element.phone_number}</StyledTableCell>
              <StyledTableCell align="left">{element.subject}</StyledTableCell>
              {
                (element.description.length) <= 290 ?
              <StyledTableCell align="left">
               {element.description}

               { element.owner == userId  && token  ?
               (
                <>
                <div className='text-end'>
                {/* Edit Icon */}
               <Button variant="outlined" color="success" className='ms-3'
               onClick={() => handleEditClick(element)}>
                <MdOutlineModeEdit className='fs-5'
                />
                </Button>
                </div>
                </>
               )
               :
               (
                <>
                {/* NOTHING  */}
                </>
               )        
              }
               </StyledTableCell>
                  :
                <StyledTableCell align="left">
                {element.description.substring(0,290)+"..."}
                <div className='text-end'>
                {/* READMORE */}
                <Button 
                onClick={()=>handleDescriptionClick(element)}
                variant="contained" style={{fontSize:"10px",textWrap:"noWrap",backgroundColor:"#E4A11B"}}>Read more</Button>

              {
                element.owner == userId  && token   ?
                (
                  <>
                
                 {/* EDIT */}
                <Button variant="outlined" color="success" className='ms-3 ' 
                onClick={() => handleEditClick(element)}>
                <MdOutlineModeEdit className=' fs-5'/>
                </Button>
                  </>
                )
                :
                <>
                {/* NO ICON */}
                </>
              }
                </div>
                </StyledTableCell>
                }
                {/* If you have posted, then the edit option should show */}
                {/* <StyledTableCell align="left">
            
                </StyledTableCell> */}
            </StyledTableRow>
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
      />
    )}
  </>
  );
}
