import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import LikeCard from '../Movie/LikeCard';
import { useNavigate } from "react-router-dom";
import { url } from '../../utils/constant';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import ModeIcon from '@mui/icons-material/Mode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

export default function MovieCard({
  mode,
  movieposter,
  moviename,
  rating,
  summary,
  cast,
  _id,
  element,
  disLikeNum,
  likeNum,
  deleteBtn,
  WishBtn,
  amount,
  reduxAddcartBtn
}) {
  const [isCliked, setIsClicked] = useState(false);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const navigate = useNavigate();
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(00deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const token = sessionStorage.getItem('token');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const userId = sessionStorage.getItem('userId');
  const isMovieOwner = userId === element?.owner;

  const starNum = rating / 2;
  const dispatch = useDispatch();

  return (
    <>
      <Grid lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2}>
        <Card
          className="movieCard"
          style={{
            maxWidth: "96%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "auto",
            padding: "0 0 8px 0"
          }}
        >
          <CardHeader
            className=" py-2 fw-bold"
            avatar={
              <Avatar
                style={{
                  color: "white",
                  backgroundColor: mode == "light" ? " rgb(154, 19, 19)" : "rgb(154, 19, 19)"
                }}
                aria-label="movietitle"
              >
                {moviename.substring(0, 1)}
              </Avatar>
            }
            action={
         <span
            className="d-flex flex-row align-items-center justify-content-center"
            style={{
              position: "absolute",
              right: "0px",
              top: "25px",
            }}
          >
                {/* Wishlist icon - always visible */}
                {WishBtn}

                {/* Edit & Delete - visible only if logged in & owner */}
                {token && isMovieOwner && (
                  <>
                    <Tooltip title="Edit">
                    <ModeIcon
                      onClick={() => navigate(`/editmovie/${_id}`)}
                      className="editBtn fs-4 me-1"
                    />
                  </Tooltip>
                    {deleteBtn}
                  </>
                )}

                {/* See More - always visible */}
                <Tooltip title="See More">
                  <MoreVertIcon
                    onClick={() => navigate(`/movietrailer/${_id}`)}
                    className="seeMoreIcon border-danger fs-2"
                  />
                </Tooltip>
              </span>
            }
            titleTypographyProps={{
              fontSize: "20x",
              paddingBottom: "0px",
              marginBottom: "0px"
            }}
            title={
              moviename.length >= 25
                ? moviename.substring(0, 25) + "..."
                : moviename
            }
            subheaderTypographyProps={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: "5px",
              fontSize: "13px"
            }}
            subheader={
              <>
                {rating} /10
                <Rating
                  size="small"
                  readOnly
                  name="half-rating"
                  value={starNum.toFixed(1)}
                  precision={0.5}
                  style={{
                    paddingBottom: "5px",
                    color: "rgb(242, 154, 3)"
                  }}
                />
              </>
            }
          />

          {/* IMAGE */}
         <CardMedia 
          component="img"  
          className=""
          width="100%" image={movieposter} style={{objectFit:"cover",display:"block",height:"210px"}} alt="movieposter"/>
          <div className='content'></div>

          {/* PRICE */}
          <div className='' style={{ right: "40px", top: '63px', position: "absolute" }}>
            ${amount}
          </div>

          {/* CART ICON */}
          <div className='' style={{ right: "5px", top: '63px', position: "absolute" }}>
            {reduxAddcartBtn}
          </div>

          {/* Bottom Card ICONS */}
          <CardActions
            disableSpacing
            className='border-primary border-4 w-100 d-flex flex-row  d-block position-absolute '
            style={{ bottom: "45px", left: "0px" }}
          >
            <LikeCard likeNum={likeNum} disLikeNum={disLikeNum} mode={mode} />
          </CardActions>

          {/* CAST & SUMMARY */}
          <CardContent>
            <div
              className="overlay px-3"
              style={{
                fontSize: "13px",
                textAlign: "justify",
                backgroundColor: mode === "light" ? "white" : "#161718",
                color: mode === "light" ? "black" : "rgba(163, 162, 162, 0.648)",
              }}
            >
              <span
                className='movieCast d-flex align-items-center'
                style={{ paddingTop: "1px" }}
              >
                {cast.length >= 90 ? cast.substring(0, 90) + "..." : cast}
              </span>

              <p className="movieSummary">
                {summary.substring(0, 205) + "..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
