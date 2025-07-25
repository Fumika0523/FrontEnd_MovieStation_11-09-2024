import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { grey, amber, red, pink, blueGrey } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import { PiSignInFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from "react-icons/fa";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GiFilmProjector } from "react-icons/gi";
import Button from 'react-bootstrap/Button';
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCartShopping } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { TbLetterMSmall } from "react-icons/tb";
import { TbLetterS } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


function NavBar({ mode, setMode }) {
  const greyColor = grey[900]; // #212121
  const amberColor = amber[500];
  const amberColor1 = amber[700];

  // const [showToggle,setShowToggle] = useState(true)

  const token = sessionStorage.getItem('token')
  const name = sessionStorage.getItem('name')
  //console.log("token", token)

  const handleSignOut = () => {
    // sessionStorage.removeItem('token')
    // sessionStorage.removeItem('userId')
    sessionStorage.clear()// Removes all session data
    navigate('/')
  }

  const navigate = useNavigate()
  const location = useLocation();
  //console.log(location)


  //paths where header should be excpluded
  const includedPaths = ["/", "/allmovies", "/about", "/services", "/contact", "/signup", "/signin"] //2nd option, rount you wanted you mention the all pages that you want to show
  //Check if current path is in the excludedPaths array
  const shouldRenderHeader = includedPaths.includes(location.pathname)
  //console.log(shouldRenderHeader)

  //subscribing to the store
  // const cartItems = useSelector(store => store.cart.items)
  // console.log(cartItems.length)

 
  return (
    <>
    <div className="d-flex navbarAll shadow-sm align-items-center justify-content-between ">
      <Navbar className="d-flex align-items-center  justify-content-center me-auto" collapseOnSelect expand="lg">
        <Container fluid className=" d-flex flex-row align-items-center  justify-content-start"  >   

          {/* Toggle */}
          <Navbar.Toggle 
          aria-controls="basic-navbar-nav" className="border border-secondary opacity-50"
         />
  
          <Navbar.Brand
          style={{cursor:"pointer"}}
          onClick={() => navigate('/')}
           className="d-flex  fw-bold align-items-center justify-content-start flex-row text-nowrap">
            <span className="p-0 m-0 d-block d-sm-block d-md-block d-flex fs-4 align-items-center justify-content-center"
            style={{ color: mode == "light" ? "black" : amberColor}}><TbLetterMSmall className=" fs-1 p-0 m-0 border-end " /><TbLetterS className=" fs-1  p-0 m-0" /></span>
          </Navbar.Brand>
        
           {/* </div> */}
          <Navbar.Collapse className="ms-auto mt-sm-0 mt-2"  id="responsive-navbar-nav">
            <Nav className=""  >
              {/* <!-- Home --> */}
              <Nav.Link href="#" className=" p-0">
                <Button variant="none"  className="d-flex  text-nowrap 
                justify-content-center align-items-center"
                onClick={() => navigate('/')}
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                >
                  <FaHome className="me-1 text-nowrap fs-3"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                   <span className="fs-5"
                   style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Home</span>
                </Button>
              </Nav.Link>

              {/* <!-- About Us --> */}
              <Nav.Link href="#" className=" p-0">
                <Button variant="none"
                   className="d-flex  text-nowrap justify-content-center align-items-center"
                  onClick={() => navigate('/about')}>
                  <FaPersonCircleQuestion className=" fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }}
                  />
                   <span className="fs-5"
                   style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >About Us</span>
                </Button>
              </Nav.Link>

          {/* MOVIE */}
          <Dropdown 
            align={{ lg: 'down' }}
            className="d-flex  dropdownMenu  p-0  justify-content-start justify-content-lg-center align-items-start align-items-lg-center">
          
          <Dropdown.Toggle variant="none" id="dropdown-basic" 
           className="d-flex text-nowrap justify-content-start p-2 align-items-center"
           style={{color:mode == "light" ? "black":"white"}} 
            >
              < PiFilmSlateFill
                className=" fs-3 me-1"
                style={{ color: mode == "light" ? amberColor1 : amberColor }}
                />
                 <span className="fs-5 me-1 "
                style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                 >Movies</span> 
                  </Dropdown.Toggle>
                  <Dropdown.Menu 
                  className="dropdownMenu px-2 " 
                  style={{ backgroundColor: mode == "light" ? "white" : "#121212" }}>
                   <Dropdown.Item href="#" 
                      className="border-bottom d-flex justify-content-start align-items-center flex-row"
                      onClick={() => navigate('/allmovies')}     
                      style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)"}}
                      >
                    <GiFilmProjector
                    className="fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                     <span className=""
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" ,}}
                    >All Movie</span>  
                  </Dropdown.Item>
                  {
                token &&
                    <Dropdown.Item href="#" 
                    onClick={() => navigate('/addmovie')}
                    className=" d-flex justify-content-center align-items-center flex-row"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                    >               
                    < MdAddPhotoAlternate className="fs-3 me-1"
                      style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                    <span className=""
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Add Movie</span>                
                  </Dropdown.Item>
                 }
                  </Dropdown.Menu>
          </Dropdown>
          
              {/* <!-- Service --> */}
              <Nav.Link href="#" className=" p-0">
                <Button variant="none"
                  className="d-flex text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/services')}>
                  <FaHandHoldingHeart className="fs-3 me-1"
                  style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  <span className="fs-5"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Service</span>  
                </Button>
              </Nav.Link>

              {/* <!-- Contact Us --> */}
              <Nav.Link className="p-0" href="#" style={{ color: mode == "light" ? greyColor : amberColor }}>
                <Button variant="none"
                  className="d-flex  text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/contact')}>
                  <FaPhone  className="fs-4 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                    <span className="fs-5"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Contact</span>  
                </Button>
              </Nav.Link>

              {/* Redux  -->> Badge*/}
              {/* <Nav.Link href="#" className=" p-0">
                <Button  className="d-flex border  justify-content-center align-items-end"
                  variant="none"
                  onClick={() => navigate('/cartpage')}>
                  <Badge variant="text"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.7rem", // Reduce font size
                        minWidth: "10px",   // Adjust width to fit smaller content
                        height: "16px",     // Adjust height
                        right: 3,
                        top: -2,
                      },
                    }}
                    color="primary" badgeContent={cartItems.length}
                    // style={{ color: mode == "light" ? greyColor : amberColor, }}
                    >
                  <ShoppingCartIcon className="fs-3 me-1" style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  </Badge>
                  {/* <span className="fs-5"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}>My Cart</span> */}
                {/* </Button>
              </Nav.Link> */} 

             {/* Wish list
                <Nav.Link href="#" className=" p-0">
                <Button  className="d-flex border  justify-content-center align-items-end"
                  variant="none"
                  onClick={() => navigate('/mywishlist')}>
                  <Badge variant="text"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.7rem", // Reduce font size
                        minWidth: "10px",   // Adjust width to fit smaller content
                        height: "16px",     // Adjust height
                        right: 3,
                        top: -2,
                      },
                    }}
                    color="primary" badgeContent={cartItems.length}
                    // style={{ color: mode == "light" ? greyColor : amberColor, }}
                    >
                  <FaHeart className="fs-3 me-1" style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  </Badge>
                  {/* <span className="fs-5"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}>My Cart</span> */}
                {/* </Button>
              </Nav.Link> */} 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

          {/* RIGHT SIDE */}
          <Nav className=" d-flex text-nowrap justify-content-center align-item-center align-item- flex-row position-absolute "
          style={{right:"3px",top:"10px"}}
          >
          {  token ?
              <>
          {/* USERNAME */}
          <Dropdown  style={{width:"65px"}} 
          className="dropdownMenu border border-0 d-flex align-items-center">
          <Dropdown.Toggle variant="none" id="dropdown-basic" 
          className="border-0 border
           mx-auto d-flex text-nowrap px-1 justify-content-center align-items-center"
          style={{ color: mode == "light" ? "black" : "white" }}>
          <span style={{ color: "rgb(246, 217, 98)",backgroundColor:"rgb(148, 72, 2)",width:"36px",height:"34px"}} className="fw-bold d-flex align-items-center justify-content-center rounded-circle fw-bold rounded fs-4 " >{name[0].toUpperCase()}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu 
          className="dropdownMenu  px-2" style={{ backgroundColor: mode == "light" ? "white" : "#121212",border:"1px solid gray", }}>
          
          {/* MY ACCOUNT */}
          <Dropdown.Item className="d-flex justify-content-start align-items-center border-bottom" href="/profile" >
          <FaUser className="me-1 fs-4 text-warning" />
          <span className="fs-6" style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" ,}}>
          My Account</span></Dropdown.Item>

          {/* MY ORDER */}
          <Dropdown.Item className="d-flex  justify-content-start align-items-center" href="/ordersummary">
          <FaCartShopping className="me-1 fs-4 text-warning"/><span className="fs-6" 
          style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" ,}}>My Order</span>
          </Dropdown.Item>
        </Dropdown.Menu>
          </Dropdown>
 
      {/* Power Off */}
      <Nav.Link href="#" className="d-flex align-items-center justify-content-center "
       onClick={() => handleSignOut()}>
        <FaPowerOff className="fs-4" style={{color: "rgb(161, 1, 1)"}} />
      </Nav.Link>

      {/* Dark / Light Mode */}
      {/* <Nav.Link href="#" style={{width:"55px"}} className=" px-0">
      <Button variant="none" className=" border border-0 outline-none
                  mx-auto d-flex text-nowrap justify-content-center align-items-center"
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      // console.log(mode)
                    }}>
                    {mode === "light" ? 
                    <DarkModeIcon className="fs-4"/> : <LightModeIcon className="fs-4" />}
     </Button>
      </Nav.Link> */}
         <Nav.Link href="#" className="d-flex align-items-center justify-content-center"
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      // console.log(mode)
                    }}
                   
                   >
                    {mode === "light" ? 
                    <DarkModeIcon className="fs-3"/> : <LightModeIcon className="fs-3" />}
                  {/* </Button> */}
                </Nav.Link>
      </>
              :
              <>
               {/* Sign in */}
                <Nav.Link href="/signin" className="d-flex align-items-center justify-content-center " >
                    <PiSignInFill 
                          className="fs-4" style={{ color: mode == "light" ? "black" : "white" }} />
                 </Nav.Link>

                {/* Sign up */}
                <Nav.Link href="/signup" className="d-flex align-items-center justify-content-center "
                 >
                  <FaUser
                    className="fs-5 mx-auto" style={{ color: mode == "light" ? "black" : "white" }}
                          />

                 </Nav.Link>
           
                   {/* Dark / Light Mode */}
                   <Nav.Link href="#" className="d-flex align-items-center justify-content-center"
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      // console.log(mode)
                    }}              
                   >

                    {mode === "light" ? 
                    <DarkModeIcon className="fs-3"/> : <LightModeIcon className="fs-3" />}
                  {/* </Button> */}
                </Nav.Link>
              </>
            }
          </Nav >
      </div>
    </>
  )
}
export default NavBar