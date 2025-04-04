import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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


function NavBar({ mode, setMode }) {
  const greyColor = grey[900]; // #212121
  const amberColor = amber[500];
  const amberColor1 = amber[700];
  const redColor = red[900];
  const pinkColor = pink[900]
  const darkGreyColor = grey[700];
  const blueGreyColor = blueGrey[500]
  console.log(greyColor)

  // const [showToggle,setShowToggle] = useState(true)

  const token = sessionStorage.getItem('token')
  console.log("token", token)

  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const navigate = useNavigate()
  const location = useLocation();
  console.log(location)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#424242',
      },
      secondary: {
        main: '#ffc107',
      },
    },
  });

  // Space between icon &
  //drop down

  //paths where header should be excpluded
  const includedPaths = ["/", "/allmovies", "/about", "/services", "/contact", "/signup", "/signin"] //2nd option, rount you wanted you mention the all pages that you want to show
  //Check if current path is in the excludedPaths array
  const shouldRenderHeader = includedPaths.includes(location.pathname)
  console.log(shouldRenderHeader)

  //subscribing to the store
  const cartItems = useSelector(store => store.cart.items)
  console.log(cartItems.length)

  let username = sessionStorage.getItem('username')
  return (
    <>
    <div className="d-flex align-items-center justify-content-between ">
      <Navbar className="d-flex align-items-center  justify-content-center me-auto" collapseOnSelect expand="lg">
        <Container fluid className=" d-flex flex-row align-items-center  justify-content-start"  >    
          {/* Toggle */}
          <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          style={{backgroundColor: mode == "light" ? null : amberColor }}/>
  
          <Navbar.Brand
          style={{cursor:"pointer"}}
          onClick={() => navigate('/')}
           className="d-flex  fw-bold align-items-center justify-content-start flex-row text-nowrap">
            <span className="p-0 m-0 d-block d-sm-block d-md-block d-flex fs-4 align-items-center justify-content-center"
            style={{ color: mode == "light" ? "black" : amberColor}}><TbLetterMSmall className=" fs-1 p-0 m-0 border-end " /><TbLetterS className=" fs-1  p-0 m-0" /></span>
          </Navbar.Brand>
        
           {/* </div> */}
          <Navbar.Collapse className="ms-auto"  id="responsive-navbar-nav">
            <Nav className=""  >

              {/* <!-- Home --> */}
              <Nav.Link href="#" className="">
                <Button variant="none"  className="d-flex  text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/about')}
                >
                  <FaHome className="me-1 text-nowrap fs-3"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                   <span className="fs-5"
                   style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Home</span>
                </Button>
              </Nav.Link>

              {/* <!-- About Us --> */}
              <Nav.Link href="#" className="" >
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
              {/* <Nav.Link href="#" className="" > */}
                <Dropdown  className="d-flex  text-nowrap justify-content-start align-items-center" >
                  <Dropdown.Toggle variant="none" id="dropdown-basic" 
                  className=" d-flex text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "white" ,fontSize:"18px"}}
                  >
                  < PiFilmSlateFill className=" fs-3 me-1"
                  style={{ color: mode == "light" ? amberColor1 : amberColor }}/>
                  <span className="fs-5 me-1"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                   >Movies</span>                  
                   </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dark"
               
                   >
                    {/* ALL Movie */}
                    <Dropdown.Item 
                      onClick={() => navigate('/allmovies')}                 
                      style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                      >
                    <GiFilmProjector
                    className="fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                     <span className=""
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                    >All Movie</span>  
                  </Dropdown.Item>

              {
                token &&
                    <Dropdown.Item 
                    onClick={() => navigate('/addmovie')}
                    href=""
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
              {/* </Nav.Link> */}

              {/* <!-- Service --> */}
              <Nav.Link href="#" className="">
                <Button variant="none"
                  className="d-flex  text-nowrap justify-content-center align-items-center"
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
              <Nav.Link className="" href="#" style={{ color: mode == "light" ? greyColor : amberColor }}>
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
              <Nav.Link href="#" className="">
                <Button  className="d-flex  justify-content-center align-items-end"
                  variant="none">
                  <Badge variant="text"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.6rem", // Reduce font size
                        minWidth: "10px",   // Adjust width to fit smaller content
                        height: "16px",     // Adjust height
                      },
                    }}
                    color="primary" badgeContent={cartItems.length}
                    style={{ color: mode == "light" ? greyColor : amberColor, }}
                    onClick={() => navigate('/cartpage')}
                    className="p-0">
                    <ShoppingCartIcon className="fs-3 me-1" style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                    <span className="fs-5"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}>My Cart</span>  
                  </Badge>
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

          {/* RIGHT SIDE */}
          <Nav className=" d-flex  gap-0 text-nowrap justify-content-center align-items-center flex-row "
          style={{position:"absolute",right:"0%"}}>
            {token ?
              <>
                {/* USERNAME */}
                <Dropdown className="">
                  <Dropdown.Toggle variant="none" id="dropdown-basic" 
                  className=" d-flex text-nowrap  px-1 justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "white" }}
                  >
                  <span style={{ color: "rgb(248, 228, 118)",backgroundColor:"purple"}} className="rounded-circle fw-bold rounded px-3 py-1 fs-4 ms-1 me-2" >{username[0].toUpperCase()}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu 
                  className="bg-dark px-2 ms-5" >
                   <Dropdown.Item 
                    className="d-flex justify-content-center border-bottom align-items-center"
                      href="/ordersummary">
                    <span className="fs-6 text-white">My Account</span></Dropdown.Item>
                    <Dropdown.Item 
                    className="d-flex justify-content-center align-items-center"
                      href="/ordersummary">
                    <FaCartShopping className="me-1 fs-4 text-warning"/><span className="fs-6 text-white">My Order</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Power Off */}
                <Nav.Link href="#" className="mt-1 p-1">
                  <Button variant="none"
                    type="submit" className=""
                    onClick={() => handleSignOut()}>
                    <FaPowerOff className="fs-4" style={{ color: "red" }} />
                  </Button>
                </Nav.Link>

                {/* Dark / Light Mode */}
                <Nav.Link href="#" className="p-1 mt-1">
                  <Button variant="none" className="d-flex text-nowrap justify-content-center align-items-center"
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      console.log(mode)
                    }}>
                    {mode === "light" ? 
                    <DarkModeIcon className="fs-3"/> : <LightModeIcon className="fs-3" />}
                  </Button>
                </Nav.Link>
              </>
              :
              <>
                <Nav.Link href="#" className="">
                  <Button variant="none" className=""
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      console.log(mode)
                    }}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                  </Button>
                </Nav.Link>

                {/* Sign in */}
                <OverlayTrigger placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Sign In</Tooltip>} 
                  >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="none"
                          ref={ref}
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                          onClick={() => { navigate('/signin') }}
                        >
                        <PiSignInFill 
                          className="fs-4" style={{ color: mode == "light" ? "black" : "white" }} />
                        </Button>
                      )}
                 </OverlayTrigger>

                {/* Sign up */}
                <OverlayTrigger placement="bottom"
                      overlay={<Tooltip id="button-tooltip-2">Sign Up</Tooltip>}
                    >
                      {({ ref, ...triggerHandler }) => (
                        <Button
                          variant="none"
                          ref={ref}
                          {...triggerHandler}
                          className="d-inline-flex align-items-center"
                          onClick={() => { navigate('/signup') }}
                        >
                         <i class="fa-solid fs-5 fa-user" style={{ color: mode == "light" ? "black" : "white" }}></i>
                        </Button>
                      )}
                 </OverlayTrigger>
              </>
            }
          </Nav >
      </div>
    </>
  )
}
export default NavBar