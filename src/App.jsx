import './App.css'
import AboutUs_Section from './Components/AboutUs_page/AboutUs_Section';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import PageNotFound from './Components/HomeSreen/PageNotFound';
import EditEnquiry from './Components/Enquiries/EditEnquiry';
import ProfileEdit from './Components/Profile/ProfileEdit';
import MovieDisplay_Debounce from './Components/Movie/MovieDisplay_Debounce'
import WishlistDisplay from './Components/Movie/MyWishList/WishlistDisplay';
import MyMoviesDisplay from './Components/Movie/MyMovie/MyMovieDisplay';
import MyPurchaseDisplay_Debounce from './Components/Movie/MyPurchaseMovies/MyPurchaseDisplay_Debounce';


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
       <Route path='/addmovie'   element={<AddMovie setMovieData={setMovieData} mode={mode} />}/>
       <Route path="/editmovie/:id"   element={<EditMovie movieData={movieData} mode={mode} />}/>
       <Route path="/editenquiry/:id"  element={<EditEnquiry mode={mode} />} />
       <Route path="/ordersummary"  element={<OrderSummary mode={mode} />}/>
       <Route path="/mywishlist"  element={<WishlistDisplay mode={mode}/>}/>
       <Route path="/cartpage" element={<Cartpage mode={mode} />}/>
       <Route path="/profile" element={<ProfileEdit mode={mode} />}/>
        <Route path="/my-purchase"  element={<MyPurchaseDisplay_Debounce mode={mode} />}/>
         <Route path="/my-movie" element={<MyMoviesDisplay mode={mode} />}/>
       </>
    }
    {/* whenever you access to the page which need token, then signin component shows */}
      <Route path="*" element={<SignIn isAuthenticated = {isAuthenticated} mode={mode}  setIsAuthenticated={setIsAuthenticated} />}/>
      {/* From here public pages will be easily accessible when there is no token*/}
      <Route path="/" element={<Homepage mode={mode} movieData={movieData}/>}/>
      <Route path='/allmovies' element={<MovieDisplay_Debounce mode={mode} setMode={setMode} movieData={movieData} setMovieData={setMovieData}/>}/> 
      <Route path='/about' element={<AboutUs_Section mode={mode} setMode={setMode}/>}/>
      <Route path='/services'  element={<Service_Section mode={mode}/>}/>
      <Route path='/contact'  element={<ContactUs_Section  mode={mode} />}/>
      <Route path="/allenquiries" mode={mode} element={<AllEnquiries/>}/>
      <Route path="/movietrailer/:id" mode={mode}  element={<MovieTrailer mode={mode} movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path="/signin" element={<SignIn isAuthenticated = {isAuthenticated} mode={mode}  setIsAuthenticated={setIsAuthenticated} />
    }/>
      <Route path="/signup" mode={mode} element={<SignUp/>}/>
      {/* <Route path="/signout" element={<SignOut/>}></Route> <<< check*/} 
      <Route path="/table" mode={mode} element={<Table/>}/> 
      <Route path="/pagenotfound" mode={mode} element={<PageNotFound mode={mode}/>}/> 
    </Routes>
    <Footer />
    </Provider>
  </ThemeProvider>

  </>
 
  )}
export default App