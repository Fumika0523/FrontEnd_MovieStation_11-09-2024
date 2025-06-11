import { Button } from "react-bootstrap";
import { Badge } from "@mui/material";
import { FaHeart, FaPlusCircle, FaBookmark } from "react-icons/fa";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MovieActionButtons = ({ mode, navigate, wishlistCount }) => {
// mode >> theme
// navigation
// wishlistCount >>store
  return (
    <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 border-danger">

      {/* My Cart */}
      <Button
        variant="none"
        onClick={() => navigate('/cartpage')}
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
              fontSize: "0.7rem",
              minWidth: "10px",
              height: "16px",
              right: 5,
              top: -2,
            },
          }}
          color="primary"
          badgeContent={2}
        >
          <ShoppingCartIcon className="fs-4 me-md-1 myCartIcon" />
        </Badge>
        <span className="d-md-block d-none">My Cart</span>
      </Button>

      {/* Wish List */}
      <Button
        variant="none"
        onClick={() => {
          const token = sessionStorage.getItem('token');
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
              fontSize: "0.7rem",
              minWidth: "10px",
              height: "16px",
              right: 0,
              top: -2,
            },
          }}
          color="success"
          badgeContent={wishlistCount}
        >
          <FaHeart className="fs-5 iconHeart me-md-1" />
        </Badge>
        <span className="d-md-block d-none">My Wish List</span>
      </Button>

       <Button
            variant="none"
            onClick={() => navigate('/usermovies')}
            className="movieDisplayBtn"
            style={{
              backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
              border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
              color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
            }}
          >
            <FaBookmark className="fs-5 me-md-1 myMovieIcon" />
            <span className="d-md-block d-none">My Movies</span>
        </Button>
    </div>
  );
};

export default MovieActionButtons;
