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
import { MdEmail } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import { Row } from "react-bootstrap";

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

      <Navbar   collapseOnSelect expand="lg" className=" border-warning border-2"
        style={{ backgroundColor: mode == "light" ? "white" : "black" }}  >

        <Container fluid className="" >
          {/* Brand */}
          <Navbar.Brand className="fw-bold">
              <i  style={{color: mode == "light" ? amberColor1 :amberColor}} className = "fa-solid  fa-couch"></i>
              <i className="fa-solid  fa-wine-glass" style={{color: mode == "light" ? amberColor1 :amberColor}}></i>
              <span className="fs-4 ms-1"
                style={{ color: mode == "light" ? "black" : amberColor }}>MovieStation</span>
          </Navbar.Brand>

          {/* Toggler Icon */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav"
            style={{ color: mode == "light" ? darkGreyColor : "null", backgroundColor: mode == "light" ? null : amberColor }} />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Navbar.Toggle  
           aria-controls="responsive-navbar-nav"
            style={{color:mode=="light"? darkGreyColor: "null",backgroundColor:mode=="light"? null:amberColor}} />
            <Navbar.Collapse  id="responsive-navbar-nav" > */}
            {/* <Nav className="me-auto">        
            </Nav> */}

            <Nav className="me-auto d-flex align-items-center justify-content-center" >
              {/* <!-- Home --> */}
              <Nav.Link href="#" >
                 <Button variant="none"
                 className="d-flex justify-content-center align-items-end"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                  onClick={() => navigate('/about')} 
                  >
                  <FaHome className="me-1 fs-3"
                   style={{color: mode == "light" ? amberColor1 :amberColor}}               />
                  <div>Home</div>
              </Button>
              </Nav.Link>

              {/* <!-- About Us --> */}
              <Nav.Link href="#" >
              <Button variant="none"
                 className="d-flex text-nowrap justify-content-center align-items-end"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                 onClick={() => navigate('/about')} 
                  >
                   <FaPersonCircleQuestion className=" fs-3 me-1"
                     style={{color: mode == "light" ? amberColor1 :amberColor}}
                    />
                    About Us
                  </Button>
              </Nav.Link>

              {/* Movie */}
              <Nav.Link href="#" className=""
              >
              <Button variant="none"
                 className="d-flex text-nowrap justify-content-center align-items-end"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                  onClick={() => navigate('/allmovies')}
                >
                  <GiFilmProjector 
                  className="fs-3 me-1"
                  style={{color: mode == "light" ? amberColor1 :amberColor}}/>
                  All Movie
                  </Button>
              </Nav.Link>

              {/* AddMovie */}
              {/* conditional rendering where you dont want else value / false value */}
              {
                token &&
                <Nav.Link href="#">
              <Button variant="none"
                 className="d-flex justify-content-center align-items-end text-nowrap"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                  onClick={() => navigate('/addmovie')}
                    >
                      < MdAddPhotoAlternate  className="fs-3 me-1" 
                       style={{color: mode == "light" ? amberColor1 :amberColor}}/>
                      Add Movie
                      </Button>
                </Nav.Link>
              }

              {/* <!-- Service --> */}
              <Nav.Link href="#">              
              <Button variant="none"
                 className="d-flex justify-content-center align-items-end"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                 onClick={() => navigate('/services')}>
                  <FaHandHoldingHeart className="fs-4 me-1"
                   style={{color: mode == "light" ? amberColor1 :amberColor}}/>
                  Service
                  </Button>
              </Nav.Link>

              {/* <!-- Contact Us --> */}
              <Nav.Link className="" href="#" style={{ color: mode == "light" ? greyColor : amberColor }} onClick={() => navigate('/contact')}>             
              <Button variant="none"
                 className="d-flex justify-content-center align-items-end"
                 style={{ color: mode == "light" ? "black" :"rgb(160, 161, 161)" }}
                 onClick={() => navigate('/contact')}>
                  <FaEnvelope className="fs-4 me-1"
                   style={{color: mode == "light" ? amberColor1 :amberColor}}/>
                  Contact
                  </Button>
              </Nav.Link>


              {/* Redux  -->> Badge*/}
              <Nav.Link href="#" >              
                <Button className=""
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
                  style={{ color: mode == "light" ? greyColor : amberColor ,}}
                  onClick={() => navigate('/cartpage')}
                  className=" ms-1 p-0">
                  <ShoppingCartIcon className=""  style={{color: mode == "light" ? amberColor1 :amberColor}} />
                  </Badge>
              </Button>
              </Nav.Link>
              </Nav>
              <Nav className="ms-auto d-flex justify-content-center align-items-center">
              {/* Sign Out */}
              <ThemeProvider theme={theme}>

                {token ?
                  <>
                    <Nav.Link href="#"  
                    >
                      {/* <Button
                        sx={{ padding: 0, minWidth: "130px", fontWeight: "bold", fontSize: "16px" }}
                        className=""
                      > */}
                      <span style={{ color: mode == "light" ? "black" : "lightGray" }} 
                      className="fw-bold">{username}</span>
                      </Nav.Link>
                        <Nav.Link href="#" className=" ">
                          <Button variant="none"
                           type="submit" className="a"
                           onClick={() => handleSignOut()} 
                            >
                            <FaPowerOff className="fs-5" style={{ color: "red" }}/>
                          </Button>
                       
                      {/* </Button> */}
                    </Nav.Link>
                  </>
                  // otherwise
                  :
                  <>
                    {/* Sign in */}

                    <Nav.Link href="#" className="px-2 ">
                      <Button variant="text"
                        style={{ color: mode == "light" ? greyColor : "white" }}
                        className="mx-2" type="submit" onClick={() => { navigate('/signin') }}><PiSignInFill className="fs-5 me-1" />
                        Sign in</Button>
                    </Nav.Link>

                    {/* Sign up */}
                    <Nav.Link href="#" className="px-2 ">
                      <Button variant="text"
                        style={{ color: mode == "light" ? greyColor : "white" }}
                        type="submit" className="py-1 " onClick={() => { navigate('/signup') }}><i class="fa-solid fa-user me-1"></i>Sign up</Button>
                    </Nav.Link>
                  </>
                }
              </ThemeProvider>

              {/* Light Dark Mode */}
              <Nav.Link href="#" className="mx-auto">
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}
export default NavBar