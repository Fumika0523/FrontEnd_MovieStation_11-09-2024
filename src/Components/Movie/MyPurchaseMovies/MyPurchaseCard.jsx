import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaCirclePlay } from "react-icons/fa6";
import React, { useState, useRef, useEffect } from 'react';



const MyPurchaseCard = ({movieposter,moviename,amount,updatedAt,trailer,element,rating,mode}) => {
  //console.log("moviecard",movieposter)
const [playing, setPlaying] = useState(false);
  const wrapperRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
  };

  // As soon as `playing` flips to true, fire the fullscreen request
  useEffect(() => {
    if (playing && wrapperRef.current) {
      const el = wrapperRef.current;

      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    }
  }, [playing]);

  // Optional: reset `playing` when user exits fullscreen
  useEffect(() => {
    const onFsChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setPlaying(false);
      }
    };

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    document.addEventListener('mozfullscreenchange', onFsChange);
    document.addEventListener('MSFullscreenChange', onFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
      document.removeEventListener('mozfullscreenchange', onFsChange);
      document.removeEventListener('MSFullscreenChange', onFsChange);
    };
  }, []);

  return (
   <>
    <Card  style={{backgroundColor: mode === "light" ? "white" : "rgba(33, 33, 35, 0.52)",color: mode === "light" ? "black" : "rgb(243, 243, 255)",
    }} className='mb-3 col-md-5 col-12'>
      <Card.Img variant="top" style={{height:"200px",objectFit:"cover"}} src={movieposter} />
      <Card.Body>
        <Card.Title>{moviename}</Card.Title>
        <div className='justify-content-end d-flex'>
           {/* <Button variant="warning" className='d-flex flex-row gap-1 align-items-center'>Play Now <FaCirclePlay className='fs-4'/></Button> */}
          {!playing && (
        <Button
          variant="warning"
          className="d-flex flex-row gap-1 align-items-center"
          onClick={handlePlay}
        >
          Play Now <FaCirclePlay className="fs-4" />
        </Button>
      )}

      {playing && (
        <div
          ref={wrapperRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 2147483647 // max z-index to ensure on top
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`${trailer}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="YouTube Fullscreen Player"
          />
        </div>
      )}

        </div>
      </Card.Body>
    </Card>

   </>
  )
}

export default MyPurchaseCard