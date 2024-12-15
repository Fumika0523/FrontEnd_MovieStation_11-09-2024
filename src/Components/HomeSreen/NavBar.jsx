import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey,amber,red,pink} from '@mui/material/colors';

function NavBar({ mode, setMode, isAuthenticated, setIsAuthenticated }) {
const greyColor = grey[900]; // #212121
const amberColor = amber[500];
const redColor = red[900];
const pinkColor = pink[900]
const darkGreyColor = grey[700]
console.log(greyColor)

  const token = sessionStorage.getItem('token')
  console.log("token", token)

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

  //navbar-scrolled
  // const navEl = document.querySelector('.navbar');

  // window.addEventListener('scroll', () => {
  //   if (window.scrollY > 100) {
  //     navEl.classList.add('navbar-scrolled');
  //   } else if (window.scrollY < 50) {
  //     navEl.classList.remove('navbar-scrolled');
  //   }
  // })
  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }

  let username = sessionStorage.getItem('username')
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg"
      style={{backgroundColor:mode=="light"? "white":"black"}}
       >
        <div className="container-fluid" >
          {/* Brand */}
          <span className="ms-3 fs-4 navbar-brand" style={{color:mode=="light"? greyColor:amberColor}}><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass"></i><a className="navbar-brand fs-4 ms-1" href="#"
          style={{color:mode=="light"? greyColor: amberColor}}>MovieStation</a></span>

        {/* Toggler Icon */}
          <button className="navbar-toggler  border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <div className="navbar-toggler-icon"></div>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  mb-lg-0 text-warning">

              {/* <!-- Home --> */}
              <Button variant="text" 
              // color={mode == "light" ? greyColor : "inherit"}
              style={{color:mode=="light" ? greyColor: amberColor}}
               onClick={() => navigate('/')}>Home</Button>
              {/* <!-- About Us --> */}
              <Button variant="text" 
              style={{color:mode=="light"? greyColor:amberColor}}
               onClick={() => navigate('/about')}>ABOUT US</Button>

              {/* Movie */}
              <Button variant="text" 
              style={{color:mode=="light" ? greyColor:amberColor}}
              onClick={() => navigate('/allmovies')}>All movies</Button>

              {/* AddMovie */}
              {/* conditional rendering where you dont want else value / false value */}
              {
                token &&
                <Button variant="text" 
                style={{color:mode=="light" ? greyColor:amberColor}} onClick={() => navigate('/addmovie')}>Add movie</Button>
              }
           
     
              {/* <!-- Service --> */}
              <Button variant="text" 
              style={{color:mode=="light"? greyColor:amberColor}} onClick={() => navigate('/services')}>Service</Button>
              {/* <!-- Contact Us --> */}
              <Button variant="text" 
              style={{color:mode=="light"? greyColor:amberColor}} onClick={() => navigate('/contact')}>Contact</Button>
               
              {/* Redux  -->> Badge*/}
              <Button variant="text" 
              style={{color:mode=="light"? greyColor:amberColor}} onClick={() => navigate('/cartpage')}><ShoppingCartIcon />{cartItems.length}</Button>
            
            
             {/* Sign Out */}
             <ThemeProvider theme={theme}>
              
                {token ?
                  <>
                    <Button className="mx-2"
                    style={{color:mode=="light"? pinkColor:"white"}}>Hi, {username}</Button>
                    <Button variant="text" color="primary"
                    className=" text-nowrap mx-2 " type="submit" 
                    style={{color:mode=="light"? darkGreyColor:"grey"}} 
                    onClick={() => handleSignOut()}>Sign out</Button>
                  </>
                  // otherwise
                  :
                  <>
                    {/* Sign in */}
                    <Button variant="text" color="primary"
                    className="mx-2" type="submit" onClick={() => { navigate('/signin') }}>Sign in</Button>

                    {/* Sign up */}
                    <Button variant="text" color="secondary"  type="submit" className=" me-3 py-1 " onClick={() => { navigate('/signup') }}><i class="fa-solid fa-user me-1"></i>Sign up</Button>
                  </>
                }

              </ThemeProvider>

              {/* Light Dark Mode */}
            <Button variant="text" 
              style={{color:mode=="light"? greyColor:amberColor}}
              onClick={() => {
                //setMode("light")
                //true?"truedata":"falsedata"
                setMode(mode == "light" ? "dark" : "light")//setMode(light)
                console.log(mode)
              }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
              </ul>   
           </div>
        </div>
      </nav>
      {/* {shouldRenderHeader && <Header/>} */}
    </>
  )
}
export default NavBar