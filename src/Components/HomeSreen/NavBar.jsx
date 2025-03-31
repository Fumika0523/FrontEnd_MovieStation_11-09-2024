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
      <Navbar className=" border-danger sticky-top border-3 " collapseOnSelect expand="lg" 
        style={{ backgroundColor: mode == "light" ? "	rgb(250, 249, 246)" : "black" }}  >

        <Container fluid className="border d-flex justify-content-between"  >
       
          {/* LEFT SIDE */}
          {/* Nowrap */}
          <Nav className="me-auto border ">
          {/* <div className="d-flex flex-row justify-content-between "> */}
          <Navbar.Brand
          style={{cursor:"pointer"}}
          onClick={() => navigate('/')}
           className="d-flex fw-bold align-items-center flex-row text-nowrap">
            <i style={{ color: mode == "light" ? amberColor1 : amberColor }} className="fa-solid  fa-couch"></i>
            <i className="fa-solid  fa-wine-glass" style={{ color: mode == "light" ? amberColor1 : amberColor }}></i>
            <span className="fs-4 d-none d-sm-block ms-1"
              style={{ color: mode == "light" ? "black" : amberColor }}>MovieStation</span>
          </Navbar.Brand>
        
          {/* Toggler Icon */}
          <Navbar.Toggle 
          aria-controls="responsive-navbar-nav"
            style={{backgroundColor: mode == "light" ? null : amberColor }} />
            {/* </div> */}
          <Navbar.Collapse className="" id="responsive-navbar-nav">
            <Nav className="me-start" >

              {/* <!-- Home --> */}
              <Nav.Link href="#" className="">
                <Button variant="none"  className="d-flex  text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/about')}
                >
                  <FaHome className="me-1 text-nowrap fs-3"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  <div>Home</div>
                </Button>
              </Nav.Link>

              {/* <!-- About Us --> */}
              <Nav.Link href="#" className="" >
                <Button variant="none"
                   className="d-flex  text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/about')}
                >
                  <FaPersonCircleQuestion className=" fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }}
                  />
                  About Us
                </Button>
              </Nav.Link>

              {/* MOVIE */}
              <Nav.Link href="#" className="" >
                <Dropdown  className="d-flex  text-nowrap justify-content-center align-items-center"
              >
                  <Dropdown.Toggle variant="none" id="dropdown-basic" 
                  className=" d-flex text-nowrap justify-content-center align-items-center"
                  >
                  < PiFilmSlateFill
                  className=" fs-3 me-1"
                  style={{ color: mode == "light" ? amberColor1 : amberColor }}/>
                  <span  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}>Movies</span>
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
                  All Movie</Dropdown.Item>

                  {
                token &&
                    <Dropdown.Item 
                    onClick={() => navigate('/addmovie')}
                    href=""
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                    >
           
                   {/* <Button variant="none"
                  //    className="d-flex  text-nowrap justify-content-center align-items-center"
                  //   style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  //   onClick={() => navigate('/addmovie')}
                  // > */}
                  
                    < MdAddPhotoAlternate className="fs-3 me-1"
                      style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                    Add Movie
                  {/* </Button> */}
                             
                    </Dropdown.Item>
                     } 
                  </Dropdown.Menu>

                </Dropdown>
              </Nav.Link>

                {/* Movie */}
              {/* <Nav.Link href="#" className="">
                <Button variant="none"
                   className="d-flex text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/allmovies')}
                >
                  <GiFilmProjector
                    className="fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  All Movie
                </Button>
              </Nav.Link> */}

              {/* AddMovie */}
              {/* {
                token &&
                <Nav.Link href="#" className="">
                  <Button variant="none"
                     className="d-flex  text-nowrap justify-content-center align-items-center"
                    style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                    onClick={() => navigate('/addmovie')}
                  >
                    < MdAddPhotoAlternate className="fs-3 me-1"
                      style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                    Add Movie
                  </Button>
                </Nav.Link>
              } */}

              {/* <!-- Service --> */}
              <Nav.Link href="#" className="">
                <Button variant="none"
               className="d-flex  text-nowrap justify-content-center align-items-center"
                  style={{ color: mode == "light" ? "black" : "rgb(160, 161, 161)" }}
                  onClick={() => navigate('/services')}>
                  <FaHandHoldingHeart className="fs-3 me-1"
                    style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  Service
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
                  Contact
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
                    <ShoppingCartIcon className="fs-3" style={{ color: mode == "light" ? amberColor1 : amberColor }} />
                  </Badge>
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Nav>         

          {/* RIGHT SIDE */}
          <Nav className="border d-flex text-nowrap justify-content-center align-items-center flex-row">
            {token ?
              <>
              
                {/* USERNAME */}
                <Dropdown className="">
                  {/* <Dropdown.Toggle variant="none" id="dropdown-basic"
                  className="d-sm-none d-none d-md-block d-flex text-nowrap justify-content-center align-items-center">
                  <span 
                    style={{ color: "rgb(252, 126, 15)" }}             
                    className="fw-bold fs-5 ms-1 me-2 " >{username[0].toUpperCase()+username.slice(1)}</span>
                  </Dropdown.Toggle> */}
                  <Dropdown.Toggle variant="none" id="dropdown-basic" 
                  className=" d-flex text-nowrap justify-content-center align-items-center"
                  >
                  <span style={{ color: "rgb(252, 126, 15)" }} className="fw-bold  fs-4 ms-1 me-2" >{username[0].toUpperCase()}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu 
                  className="bg-dark" >
                    <Dropdown.Item 
                    className="d-flex justify-content-center align-items-center"
                      href="/ordersummary">
                    <FaCartShopping className="me-1 fs-4 text-warning"/><span className="fs-6 text-white">My Order</span></Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>

                {/* Power Off */}
                {/* <Nav.Link href="#" className="border"> */}
                  <Button variant="none"
                    type="submit" className=""
                    onClick={() => handleSignOut()}
                  >
                    <FaPowerOff className="fs-5" style={{ color: "red" }} />
                  </Button>
                {/* </Nav.Link> */}

                {/* Dark / Light Mode */}
                {/* <Nav.Link href="#" className="mx-auto"> */}
                  <Button variant="none" className="d-flex text-nowrap justify-content-center align-items-center"
                    style={{ color: mode == "light" ? greyColor : amberColor }}
                    onClick={() => {
                      //setMode("light")
                      //true?"truedata":"falsedata"
                      setMode(mode == "light" ? "dark" : "light")//setMode(light)
                      console.log(mode)
                    }}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                  </Button>
                {/* </Nav.Link> */}
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

                <OverlayTrigger
                      placement="bottom"
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

                <OverlayTrigger
                      placement="bottom"
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
          
        </Container>
      
      </Navbar>

    </>
  )
}
export default NavBar