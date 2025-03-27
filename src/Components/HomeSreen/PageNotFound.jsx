import React from 'react'
import { Button, Image } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



const PageNotFound = () => {
  return (
    <>
      <Container fluid className=" border-4">
      <Row className="mx-auto my-5 d-flex justify-content-center align-items-center">
        <Col xs={11} md={4} lg={5} className="mb-3">
        <Image src="https://m.media-amazon.com/images/M/MV5BNmNiZGFmZjktYTVkMi00ODNmLWJjZTMtMDI2NjgxNzc0MmM4XkEyXkFqcGc@._V1_.jpg" className="w-100" rounded/>
        </Col>
        <Col xs={10} md={4} lg={4} className="d-flex flex-column justify-content-center align-items-start gap-4">
        <h1 className="" >OOPS! PAGE NOT FOUND</h1>
      <div>You must have picked the wrong foor because I have not beeen able to lay my eye on the page you have been searching for.</div>
      <Button variant="success"> Back to Home </Button>
        </Col>
      </Row>
    </Container>
    <div>
   </div>
   </>
  )
}

export default PageNotFound

// github 404 not found page