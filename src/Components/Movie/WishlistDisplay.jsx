import { url } from '../../utils/constant';
import axios from 'axios';
import MovieActionButtons from './MovieActionButtons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const WishlistDisplay = ({mode}) => {

const wishlist = useSelector(store => store.wishlist.wishItems); 
console.log("wishlist",wishlist) 
const navigate = useNavigate();

  const addWishItemToServer = async (element) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("server",token)
      const response = await axios.post(
        `${url}/add-wish-list`,
        element,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Added to Wishlist:', response.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  const removeWishItemFromServer = async (element) => {
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(
        `${url}/delete-wish-item/${element._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Removed from Wishlist:', response.data);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  
  return (
    <div>WishlstDisplay

      <MovieActionButtons
    mode={mode}
    navigate={navigate}
    wishlistCount={wishlist.length}
/>


      
    </div>
  )
}

export default WishlistDisplay