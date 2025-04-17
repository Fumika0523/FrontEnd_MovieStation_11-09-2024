import './App.css'
import AboutUs_Section from './Components/AboutUs_page/AboutUs_Section';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDisplay from './Components/Movie/MovieDisplay';
import NavBar from './Components/HomeSreen/NavBar';
import Service_Section from './Components/Service_page/Service_Section';
import ContactUs_Section from './Components/Enquiries/ContactUs_Section';
import Homepage from './Components/HomeSreen/Homepage';
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
import SignIn from './Components/SignIn_Up_Out/SignIn';
import axios from 'axios';
import AllEnquiries from './Components/Enquiries/AllEnquiries';
import Table from './Components/Enquiries/CustomizedTables'
import OrderSummary from './Components/Order/OrderSummary'
import {url} from './utils/constant'
import UserMovies from './Components/Movie/UserMovies';
import PageNotFound from './Components/HomeSreen/PageNotFound';
import EditEnquiry from './Components/Enquiries/EditEnquiry';
import ProfileEdit from './Components/Profile/ProfileEdit';


function App() {
  const [movieData,setMovieData] = useState([])
  const token =sessionStorage.getItem('token')
  let config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }

// signin part
const [isAuthenticated,setIsAuthenticated]=useState(false)
const [accessAddMovie,setAccessAddMovie] = useState("")

useEffect(()=>{
  //  const token = sessionStorage.getItem('token')
  console.log(token)
  setIsAuthenticated(true)
  setAccessAddMovie(token) // if you have token
},[])

// console.log(accessAddMovie)
  
const getMovieData = async () => {
  console.log("Movie data is called....");
  let res = await axios.get(`${url}/movie`)//response in res.data >> moviedata
  console.log(res.data.movieData)
  console.log("movieData")
  setMovieData(res.data.movieData)
}
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
const [userData,setUserData]=useState([])

  return (
    <>
  <ThemeProvider theme={theme}>
  <CssBaseline /> 
  <Provider store={store}>
    <NavBar mode={mode} setMode={setMode} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    <Routes> 
    { 
    token &&
       <>
       <Route path='/addmovie'  mode={mode}  element={<AddMovie setMovieData={setMovieData}/>}/>
       <Route path="/editmovie/:id" element={<EditMovie movieData={movieData} />}/>
       <Route path="/editenquiry/:id" element={<EditEnquiry />} mode={mode} />
       <Route path="/ordersummary" mode={mode} element={<OrderSummary/>}/>
       <Route path="/usermovies" element={<UserMovies mode={mode}/>}/>
       <Route path="/cartpage" mode={mode} element={<Cartpage/>}/>
       <Route path="/profile" mode={mode} element={<ProfileEdit/>}/>
       </>

    }
      <Route path="/" element={<Homepage movieData={movieData}/>}/>
     {/* <NavBar mode={mode} setMode={setMode} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> */}
      <Route path='/allmovies' element={<MovieDisplay mode={mode} setMode={setMode} movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path='/about' element={<AboutUs_Section mode={mode} setMode={setMode}/>}/>
      <Route path='/services' mode={mode} element={<Service_Section/>}/>
      <Route path='/contact'  mode={mode} element={<ContactUs_Section/>}/>
      <Route path="/allenquiries" mode={mode} element={<AllEnquiries/>}/>
      <Route path="/movietrailer/:id" mode={mode}  element={<MovieTrailer mode={mode} movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path="/signin" mode={mode} element={<SignIn isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    }/>
      <Route path="/signup" mode={mode} element={<SignUp/>}/>
      {/* <Route path="/signout" element={<SignOut/>}></Route> <<< check*/} 
     
      <Route path="/table" mode={mode} element={<Table/>}/> 
      <Route path="/pagenotfound" mode={mode} element={<PageNotFound/>}/> 
     
    </Routes>
    <Footer />
    </Provider>
  </ThemeProvider>

  </>
 
  )}
export default App
