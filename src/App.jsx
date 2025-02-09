import './App.css'
import AboutUs_Section from './Components/AboutUs_page/AboutUs_Section';
import MovieDisplay from './Components/Movie/MovieDisplay';
import NavBar from './Components/HomeSreen/NavBar';
import Service_Section from './Components/Service_page/Service_Section';
import ContactUs_Section from './Components/Enquiries/ContactUs_Section';
import Homepage from './Components/HomeSreen/Homepage';
import {Navigate, Route,Routes} from 'react-router-dom';
import Footer from './Components/HomeSreen/Footer';
import MovieTrailer from './Components/Movie/MovieTrailer';
import React, {useEffect,useState} from 'react'
import AddMovie from './Components/Movie/AddMovie'
import EditMovie from './Components/Movie/EditMovie';
import store from './utils/store';
import {Provider} from 'react-redux'; 
import Cartpage from './Components/Cart/Cartpage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './Components/SignIn_Up_Out/SignUp';
import SignOut from './Components/SignIn_Up_Out/SignOut';
import SignIn from './Components/SignIn_Up_Out/SignIn';
import axios from 'axios';
import AllEnquiries from './Components/Enquiries/AllEnquiries';
import Table from './Components/Enquiries/CustomizedTables'
import OrderSummary from './Components/Cart/OrderSummary'
import {url} from './utils/constant'
import { Box, Container } from "@mui/material"


function App() {
  const [movieData,setMovieData] = useState([])

// signin part
const [isAuthenticated,setIsAuthenticated]=useState(false)
// const [accessAddMovie,setAccessAddMovie] = useState("")


useEffect(()=>{
   const token = sessionStorage.getItem('token')
  console.log(token)
  setIsAuthenticated(true)
  // setAccessAddMovie(token) // if you have token
},[])

// console.log(accessAddMovie)
  
const getMovieData = async () => {
  const token=sessionStorage.getItem('token')
  let config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  console.log("Movie data is called....");
  let res = await axios.get(`${url}/movie`,config)//response in res.data >> moviedata
  console.log(res.data.movieData);
  console.log("movieData")
  setMovieData(res.data.movieData);
};

  useEffect(()=>{
    getMovieData()
  },[]) //API Call
//initial value is stored as dark
const [mode, setMode]=useState("dark")

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // If there is a token, you should access to AddMovie.
  //check if the token is stored in sessionstorage after login.
  //if no token >> signup/signin page

  return (
   
    <>
  <ThemeProvider theme={theme}>
  <CssBaseline /> 
  <Provider store={store}>
    <NavBar mode={mode} setMode={setMode} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

    <Box sx={{ my: 2 }}> 
    <Routes>
      <Route path="/" element={<Homepage movieData={movieData}/>}/>
      <Route path='/allmovies' element={<MovieDisplay mode={mode} setMode={setMode} movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path='/about' element={<AboutUs_Section/>}/>
      <Route path='/services' element={<Service_Section/>}/>
      <Route path='/contact' element={<ContactUs_Section/>}/>
      <Route path="/movietrailer/:id" element={<MovieTrailer movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path="/signin" element={<SignIn isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    }></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      {/* <Route path="/signout" element={<SignOut/>}></Route> <<< check*/} 
      <Route path="allenquiries" element={<AllEnquiries/>}/>
      <Route path="/cartpage" element={<Cartpage/>}/>
      <Route path="/table" element={<Table/>}/> 

      {/* {!isAuthenticated? (
        <> */}
           <Route path='/addmovie'  element={<AddMovie setMovieData={setMovieData}/>}/>
           <Route path="/editmovie/:id" element={<EditMovie movieData={movieData} />}/>
           <Route path="/ordersummary" element={<OrderSummary/>}/>
           {/* </>
           ):(
            <Route path="*" element={<Navigate to ="/" />}/>
           )
      }   */}
    </Routes>
    <div style={{position:"relative"}}>
    <Footer />
    </div>
    </Box>
    </Provider>
  </ThemeProvider>
  </>
  )}


export default App

