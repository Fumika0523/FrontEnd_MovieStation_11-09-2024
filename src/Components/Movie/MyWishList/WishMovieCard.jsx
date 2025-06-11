import React from "react";
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function WishMovieCard({ movieposter, moviename,}) {
    return (
        <>
            <div className="d-flex border border-4 row mx-auto align-items-center justify-content-center pt-4 pb-2 ">
            <div className="row mx-auto border border-danger ">
                {/* Movie Poster */}
                <div className="col-12  col-lg-5 col-md-5 col-sm-6 border border-warning border-3">
                <img src={movieposter} className="mx-auto w-100 text-center d-flex justify-content-center rounded" style={{height:"250px",objectFit:"cover"}} alt=""  />
                </div>
                {/* moviename */}
                {/* <div className="border flex-row d-flex border d-sm-none border-primary border-3 justify-content-center align-items-center">
                    <div className="fs-5">{moviename}</div>                 
                </div> */}
      
                <div className="d-md-flex align-items-center col-lg-3 col-md-3 col-12 d-sm-block  border  ">
                    <div className="fs-5">{moviename}</div>                 
                </div>

            {/* Delete */}
            <div className="text-start border border-primary border gap-3 col-lg-4  col-md-3 col-12 border d-flex flex-row justify-content-md-center justify-content-end align-items-center ">
                <Button variant="" style={{backgroundColor:"rgb(53, 53, 54)"}}><DeleteIcon className="text-light fs-3"/></Button>               


            {/* Add Cart */}
                <Button variant="warning" className="d-flex gap-1 align-items-center"><span className="d-none d-md-block">Add to Cart</span><ShoppingCartIcon className="fs-3"/></Button>               
            </div>
            </div>
        </div>
        </>
    )
}
export default WishMovieCard