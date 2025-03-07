import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import { PiSignInFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar({ mode, setMode }) {
const greyColor = grey[900]; // #212121
const amberColor = amber[500];
const amberColor1 = amber[700];
const redColor = red[900];
const pinkColor = pink[900]
const darkGreyColor = grey[700];
const blueGreyColor = blueGrey[500]
console.log(greyColor)

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
      primary : {
        main:'#424242',
    },
    secondary:{
        main:'#ffc107',
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
       <Navbar expand="lg" className="sticky-top  border-warning border-2" 
       style={{backgroundColor:mode=="light"? "white":"black"}}  >
          
        <Container fluid className="mx-2">
          {/* Brand */}
          <Navbar.Brand href="/">
          <span className="ms-3 fs-4 navbar-brand" style={{color:mode=="light"? amberColor1:amberColor, fontWeight:"bold"}}><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass"></i><a className="navbar-brand fs-4 ms-1" href="#"
          style={{color:mode=="light"? "black": amberColor}}>MovieStation</a></span>
          </Navbar.Brand>
     
          {/* Toggler Icon */}
            <Navbar.Toggle  
            aria-controls="basic-navbar-nav" className="navToggle "
            style={{color:mode=="light"? darkGreyColor: "null",backgroundColor:mode=="light"? null:amberColor}} />
            <Navbar.Collapse >
          <Nav className="ms-auto ">

              {/* <!-- Home --> */}
              <Button variant="text " 
              // color={mode == "light" ? greyColor : "inherit"}
              style={{color:mode=="light" ? greyColor: amberColor}}
              className="px-2"
               onClick={() => navigate('/')}>Home</Button>

              {/* <!-- About Us --> */}
              <Button variant="text" 
               className="px-2 "
              style={{color:mode=="light"? greyColor:amberColor}}
               onClick={() => navigate('/about')}>ABOUT US</Button>

              {/* Movie */}
              <Button variant="text" 
              style={{color:mode=="light" ? greyColor:amberColor}}
              className="px-2 "
            >All movies</Button>

              {/* AddMovie */}
              {/* conditional rendering where you dont want else value / false value */}
              {
                token &&
                <Button variant="text" className=""
                style={{color:mode=="light" ? greyColor:amberColor}} onClick={() => navigate('/addmovie')}>Add movie</Button>
              }
           
              {/* <!-- Service --> */}
              <Button variant="text" className=""
              style={{color:mode=="light"? greyColor:amberColor}} onClick={() => navigate('/services')}>Service</Button>

              {/* <!-- Contact Us --> */}
              <Button variant="text" className=""
              style={{color:mode=="light"? greyColor:amberColor}} onClick={() => navigate('/contact')}>Contact</Button>
               
              {/* Redux  -->> Badge*/}
              <Button
               sx={{padding: 0,minWidth: 0}}
                className="pe-2 "><Badge variant="text"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.6rem", // Reduce font size
                    minWidth: "10px",   // Adjust width to fit smaller content
                    height: "16px",     // Adjust height
                  },
                }}
                 color="primary" badgeContent={cartItems.length}

              style={{color:mode=="light" ? greyColor: amberColor}}
              onClick={() => navigate('/cartpage')}
              className="mb-2 ms-1 p-0">
                
                <ShoppingCartIcon className="ms-1" style={{color:mode=="light" ? greyColor: amberColor}} /></Badge>
                </Button>              
                
             {/* Sign Out */}
             <ThemeProvider theme={theme}>
              
                {token ?
                  <>
                    <Button
                    style={{color:mode=="light"? amberColor1:"lightgrey"}}
                    sx={{padding: 0,minWidth:"130px",fontWeight:"bold",fontSize:"16px" }}
                    className=" ps-1"
                    ><span className="pe-1">{username}</span> 
                    
                    <Button variant="text" 
                    className="text-nowrap " type="submit" 
                    sx={{padding: 0,minWidth:"0"}}
                    startIcon={<FaPowerOff className="fs-5 p-0 mb-2 ms-2" style={{color:"red"}}/>}
                    style={{color:mode=="light"? darkGreyColor:"white"}} 
                    onClick={() => handleSignOut()} >

                     {/* <FaPowerOff className="fs-5 bg-dark p-0 m-0"/> */}
                    </Button>
                    </Button>
                  </>
                  // otherwise
                  :
                  <>
                    {/* Sign in */}
                    <Button variant="text"
                    style={{color:mode=="light"? greyColor:"white"}}
                    className="mx-2" type="submit" onClick={() => { navigate('/signin') }}><PiSignInFill className="fs-5 me-1"/>
                  Sign in</Button>

                    {/* Sign up */}
                    <Button variant="text"
                    style={{color:mode=="light"? greyColor:"white"}}
                    type="submit" className="py-1 " onClick={() => { navigate('/signup') }}><i class="fa-solid fa-user me-1"></i>Sign up</Button>
                  </>
                  }

              </ThemeProvider>


            {/* Light Dark Mode */}
            <Button variant="text" className="mb-2 "
             sx={{padding: 0,minWidth: "3px"}}
              style={{color:mode=="light"? greyColor:amberColor}}
              onClick={() => {
                //setMode("light")
                //true?"truedata":"falsedata"
                setMode(mode == "light" ? "dark" : "light")//setMode(light)
                console.log(mode)
              }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
          {/* </ul>    */} 
          </Nav>
          </Navbar.Collapse>
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
      {/* {shouldRenderHeader && <Header/>} */}
      </Container>
      </Navbar>

    </>
  )
}
export default NavBar