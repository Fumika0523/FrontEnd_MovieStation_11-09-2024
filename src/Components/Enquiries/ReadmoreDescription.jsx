import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";


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

const ReadmoreDescription = ({show,setShow,singleEnquiry,setEnquiryData}) => {
    // console.log("singleEnquiry",singleEnquiry)

    const token = sessionStorage.getItem('token')
    // console.log('token',token)
    const navigate = useNavigate()
    const handleClose = () => {
            setShow(false)
            navigate('/allenquiries')
            }

  return (
    <>
    <Modal className=' sign_up_in_container '
     show={show} onHide={handleClose} size='lg'
     style={{margin:"12% 0"}}
      >
          <Modal.Header className='text-black' 
          closeButton>
            Description
        </Modal.Header>
 
        <Modal.Body className='text-black'>
        {singleEnquiry.description}
        </Modal.Body>
    </Modal>
    </>

  )
}

export default ReadmoreDescription