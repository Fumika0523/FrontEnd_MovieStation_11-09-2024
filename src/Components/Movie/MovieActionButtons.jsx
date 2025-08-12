import { Button } from "react-bootstrap";
import { Badge } from "@mui/material";
import { FaHeart, FaBookmark } from "react-icons/fa";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useNavigate} from "react-router-dom";

const MovieActionButtons = ({ mode,  wishlistCount, cartCount }) => {
  const token = sessionStorage.getItem('token');
  //  console.log("wishlistCount",wishlistCount)
  const navigate = useNavigate()
  
  const location = useLocation();

  return (
    <div className="flex-nowrap justify-content-end d-flex mt-3 flex-row gap-3 border-4 me-2 border-danger">

      {/* My Cart */}
      <Button
        variant="none"
        onClick={() => {
          if (token) {
            navigate('/cartpage');
          } else {
            navigate('/signin', { state: { from: '/cartpage' } });
          }
        }}
        className="movieDisplayBtn"
        style={{
          backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
          border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
          color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
        }}
      >
        <Badge
          variant="text"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              minWidth: "10px",
              height: "16px",
              right: 5,
              top: -2,
            },
          }}
          color="primary"
          badgeContent={cartCount}
        >
          {cartCount == 0 ? (
            <ShoppingCartIcon className="fs-4 me-md-1 "
              style={{ color: "rgba(209, 209, 213, 0.63)" }} />)
            :
            (
              <ShoppingCartIcon className="fs-4 me-md-1 text-warning" />
            )
          }

        </Badge>
        <span className="d-lg-block d-none">My Cart</span>
      </Button>

      {/* Wish List */}
      <Button
        variant="none"
        onClick={() => {
          if (token) {
            navigate('/mywishlist');
          } else {
            navigate('/signin', { state: { from: '/mywishlist' } });
          }
        }}
        className="movieDisplayBtn"
        style={{
          backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
          border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
          color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
        }}
      >
        <Badge
          variant="text"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              minWidth: "10px",
              height: "16px",
              right: 0,
              top: -2,
              backgroundColor: "rgb(252, 140, 220)", // Apply the pink color
              color: "black", // Adjust text color for contrast
            },
          }}

          badgeContent={wishlistCount}
        >
          {
            wishlistCount == 0 ? (
              <FaHeart className="fs-5  me-md-1" style={{ color: "rgba(209, 209, 213, 0.63)" }} />)
              :
              (
                <FaHeart className="fs-5  me-md-1 text-danger" />
              )
          }
        </Badge>
        <span className="d-lg-block d-none">My Wish List</span>
      </Button>

               
      {
          token &&
       <>
       {/* MY MOVIE */}
      <Button
        variant="none"
        onClick={() => navigate('/my-movie')}
        className="movieDisplayBtn"
        style={{
          backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
          border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
          color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
        }}
      >
        <FaBookmark className="fs-5 me-md-1 myMovieIcon" />
        <span className="d-lg-block d-none">My Movies</span>
      </Button>
        
     {/* My Purchase */}
      <Button
        variant="none"
        onClick={() => navigate('/my-purchase')}
        className="movieDisplayBtn"
        style={{
          backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)", border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none", color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
        }}
      >
        <BiSolidMoviePlay className="fs-4 me-md-1" style={{ color: " rgb(63, 158, 79) " }} />
        <span className="d-lg-block d-none">My Purchase</span>
      </Button>
      </>
}
      {/* BACK */}
      {location.pathname !== '/allmovies' &&
        <Button variant="none"
          style={{
            backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
            color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
              border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
          }} className="text-nowrap d-flex align-center" onClick={() => navigate('/allmovies')}>
          <IoChevronBackOutline className="fs-4 me-1"
          style={{
             color: mode === "light" ? "black" : "white",
          }} 
          onClick={() => navigate('/allmovies')} />
          <span className="d-lg-block  d-none">Back</span>
        </Button>
      }

    </div>
  );
};

export default MovieActionButtons;
