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
import { Height, Padding } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.white,
    fontSize: 16,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    Padding:0,
    Height:1
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover.grey,
    height: "50px"
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  //   height: "55px",
  // },
  '& td': {
    padding: '0',
    height: "50px"
    },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//   backgroundColor: theme.palette.action.hover.grey,

//   },
// }));

export default function CustomizedTables({enquiryData,setEnquiryData}) {
  console.log(enquiryData)
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
            <StyledTableCell noWrap="false" align="left">No.</StyledTableCell>
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
              <StyledTableCell  align="left"  >1</StyledTableCell>
              <StyledTableCell  align="left" scope="row"  >
                {element.firstname}
              </StyledTableCell>
              <StyledTableCell align="left">{element.lastname}</StyledTableCell>
              <StyledTableCell align="left">{element.email}</StyledTableCell>
              <StyledTableCell align="left">{element.phone_number}</StyledTableCell>
              <StyledTableCell align="left">{element.subject}</StyledTableCell>
              {
                (element.description.length) <= 100 ?
              <StyledTableCell align="left">
               {element.description}

               { element.owner == userId  && token  ?
               (
                <>
                {/* <div className='text-end border border-danger border-4'> */}
              {/* EDIT Btn*/}
              <div className='border editBtn  text-end' style={{width:"36px",height:"36px",borderRadius:"50%"}}
                  onClick={() => handleEditClick(element)}>
                  <MdOutlineModeEdit className='fs-5 me-1 mt-1'/>
                  </div>
                {/* </div> */}
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
                  <div className='d-flex justify-content-end '>
                  {/* EDIT Btn*/}
                  <div className=' editBtn  text-end' style={{width:"30px",height:"30px",borderRadius:"50%"}}
                  onClick={() => handleEditClick(element)}>
                  <MdOutlineModeEdit className=' me-1 mt-1' style={{fontSize:"20px"}}/>
                  </div>
                  </div>
         
                {element.description.substring(0,95)+"..."}
                {/* <div className='text-end b-inline '> */}
                {/* READMORE */}
                <Button className='ms-1 py-0 px-2'
                onClick={()=>handleDescriptionClick(element)}
                variant="contained" style={{fontSize:"10px",textWrap:"noWrap",backgroundColor:"#E4A11B"}}>Read more</Button>
              {
                element.owner == userId  && token   ?
                (
                  <>
                  </>
                )
                :
                <>
                {/* NO ICON */}
                </>
              }
                {/* </div> */}
                </StyledTableCell>
                }
                {/* If you have posted, then the edit option should show */}
          
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
      setEnquiryData ={setEnquiryData}
      enquiryData={enquiryData}
      />
    )}
  </>
  );
}
