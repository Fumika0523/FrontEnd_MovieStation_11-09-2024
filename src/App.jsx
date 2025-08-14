import './App.css';
import AboutUs_Section from './Components/AboutUs_page/AboutUs_Section';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/HomeSreen/NavBar';
import Service_Section from './Components/Service_page/Service_Section';
import ContactUs_Section from './Components/Enquiries/ContactUs_Section';
import Homepage from './Components/HomeSreen/Homepage';
import Footer from './Components/HomeSreen/Footer';
import MovieTrailer from './Components/Movie/MovieTrailer';
import React, { useEffect, useState } from 'react';
import AddMovie from './Components/Movie/AddMovie';
import EditMovie from './Components/Movie/EditMovie';
import store from './utils/store';
import { Provider } from 'react-redux';
import Cartpage from './Components/Cart/Cartpage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './Components/SignIn_Up_Out/SignUp';
import SignIn from './Components/SignIn_Up_Out/SignIn';
import axios from 'axios';
import AllEnquiries from './Components/Enquiries/AllEnquiries';
import Table from './Components/Enquiries/CustomizedTables';
import OrderSummary from './Components/Order/OrderSummary';
import { url } from './utils/constant';
import PageNotFound from './Components/HomeSreen/PageNotFound';
import EditEnquiry from './Components/Enquiries/EditEnquiry';
import ProfileEdit from './Components/Profile/ProfileEdit';
import MovieDisplay_Debounce from './Components/Movie/MovieDisplay_Debounce';
import WishlistDisplay from './Components/Movie/MyWishList/WishlistDisplay';
import MyMoviesDisplay from './Components/Movie/MyMovie/MyMovieDisplay';
import MyPurchaseDisplay_Debounce from './Components/Movie/MyPurchaseMovies/MyPurchaseDisplay_Debounce';

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <SignIn />;
};

function App() {
  const [movieData, setMovieData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // Fetch movies
  const getMovieData = async () => {
    try {
      let res = await axios.get(`${url}/movie`);
      setMovieData(res.data.movieData || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <NavBar
          mode={mode}
          setMode={setMode}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <Routes>
          {/* Private routes */}
          <Route path='/addmovie' element={<PrivateRoute><AddMovie setMovieData={setMovieData} mode={mode} /></PrivateRoute>} />
          <Route path="/editmovie/:id" element={<PrivateRoute><EditMovie movieData={movieData} mode={mode} /></PrivateRoute>} />
          <Route path="/editenquiry/:id" element={<PrivateRoute><EditEnquiry mode={mode} /></PrivateRoute>} />
          <Route path="/ordersummary" element={<PrivateRoute><OrderSummary mode={mode} /></PrivateRoute>} />
          <Route path="/mywishlist" element={<PrivateRoute><WishlistDisplay mode={mode} /></PrivateRoute>} />
          <Route path="/cartpage" element={<PrivateRoute><Cartpage mode={mode} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfileEdit mode={mode} /></PrivateRoute>} />
          <Route path="/my-purchase" element={<PrivateRoute><MyPurchaseDisplay_Debounce mode={mode} /></PrivateRoute>} />
          <Route path="/my-movie" element={<PrivateRoute><MyMoviesDisplay mode={mode} /></PrivateRoute>} />

          {/* Public routes */}
          <Route path="/" element={<Homepage mode={mode} movieData={movieData} />} />
          <Route path='/allmovies' element={<MovieDisplay_Debounce mode={mode} setMode={setMode} movieData={movieData} setMovieData={setMovieData} />} />
          <Route path='/about' element={<AboutUs_Section mode={mode} setMode={setMode} />} />
          <Route path='/services' element={<Service_Section mode={mode} />} />
          <Route path='/contact' element={<ContactUs_Section mode={mode} />} />
          <Route path="/allenquiries" element={<AllEnquiries />} />
          <Route path="/movietrailer/:id" element={<MovieTrailer mode={mode} movieData={movieData} setMovieData={setMovieData} />} />
          <Route path="/signin" element={<SignIn isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} mode={mode} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/table" element={<Table />} />
          <Route path="/pagenotfound" element={<PageNotFound mode={mode} />} />

          {/* Catch-all */}
          <Route path="*" element={<PageNotFound mode={mode} />} />
        </Routes>

        <Footer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
