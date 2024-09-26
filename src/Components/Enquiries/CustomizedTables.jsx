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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({enquiryData}) {

  return (
    <TableContainer component={Paper} style={{width:"80%", margin:"2% 10%", }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone No.</StyledTableCell>
            <StyledTableCell align="center">Subject</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enquiryData.map((element) => (
            <StyledTableRow>
              <StyledTableCell  align="center" scope="row">
                {element.firstname}
              </StyledTableCell>
              <StyledTableCell align="center">{element.lastname}</StyledTableCell>
              <StyledTableCell align="center">{element.email}</StyledTableCell>
              <StyledTableCell align="center">{element.mobilePhoneNum}</StyledTableCell>
              <StyledTableCell align="center">{element.subject}</StyledTableCell>
              <StyledTableCell align="center">{element.description}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
