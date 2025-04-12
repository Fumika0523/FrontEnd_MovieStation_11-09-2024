import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  // // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

export default function CustomizedTables({enquiryData}) {
  console.log(enquiryData)
  
  return (

    <TableContainer component={Paper} className='border border-4' style={{}} >
      <Table   aria-label="customized table">
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
              <StyledTableCell align="left">{element.description.substring(0,220)+"..."}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
