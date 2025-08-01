import axios from "axios";
import { url } from "../../utils/constant";
import { useEffect, useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { FaBagShopping } from "react-icons/fa6";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdDownloading } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { Button, Fade } from 'react-bootstrap';
import MovieActionButtons from "../Movie/MovieActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundUp } from "react-icons/io";
import Pagination from '@mui/material/Pagination';
import { setWishlist } from '../../utils/WishCartSlice';

function OrderSummary({ mode }) {
  const cart = useSelector((store) => store.cart.cartItems || []);
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [sortedData, setSortedData] = useState("createdAt:desc");
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(2); // Change to how many orders per page
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${url}/wish-list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.wishData)
        if (response.data.wishData) {
          dispatch(setWishlist(response.data.wishData)); 
          console.log("Wishlist:", response.data);
        } else {
          dispatch(setWishlist([])); // wrap empty
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
        dispatch(setWishlist([]));
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [dispatch, token]);

  const fetchOrders = async (sortBy) => {
    try {
      const res = await axios.get(`${url}/sorted-order?sortBy=${sortBy}`, config);
      setOrderData(res.data.OrderData);
      console.log(res.data.OrderData)
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(sortedData);
    // console.log("sortedData",sortedData)
  }, [sortedData]); // runs every time sort order changes

  const toggleSortOrder = () => {
    const newSortOrder =
      sortedData === "createdAt:asc" ? "createdAt:desc" : "createdAt:asc";
    setSortedData(newSortOrder);
    console.log("newSortOrder",newSortOrder)
   // fetchOrders(newSortOrder);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = async ({ element }) => {
    const orderdate = formatDate(element.updatedAt);
    // const totalprice = element.movies.length * 250;
    const totalprice = element.movies.map((p) => p.amount).reduce((acc, cv) => acc + cv, 0)
    // console.log(newTotalPrice)
    // console.log(element)

    const movies = element.movies;
    const downloadUrl = `${url}/getinvoice?orderid=${element._id}&orderdate=${orderdate}&totalprice=${totalprice}`;

    try {
      const response = await fetch(downloadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderid: element._id,
          orderdate,
          totalprice,
          movies,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `order-summary-${element._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Download as PDF
    </Tooltip>
  );

    const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
// useEffect(()=>{
//   axios.get(`${url}/order`).then ((res)=>setPageData(res.data))
  
// },[])


  return (
    <>
      <div className="border-warning  mx-auto px-5">
        {/* <div className="row mx-auto "> */}
        <MovieActionButtons
          mode={mode}
          navigate={navigate}
          wishlistCount={wishlist?.length}
          cartCount={cart?.length || 0}
          cart={cart}
            />
        {/* </div> */}
      
        <div className="mx-auto col-lg-8 col-11 rounded-4 my-4 px-sm-5 py-4" style={{border:"1.5px solid rgba(33, 33, 35, 1)", backgroundColor:"rgba(13, 13, 13, 1)"}}>
          <div className="fs-2 justify-content-between mx-2 align-items-center pb-3 d-flex flex-row">
            <div className="d-flex flex-row">
              <div>
                <FaBagShopping className="fs-1 me-1 text-warning" />
              </div>
              <div>My Orders</div>
            </div>
            <Button variant="outline-secondary"
                 onClick={toggleSortOrder}>
              <BiSort
                className="fs-4 "
              />
            </Button>
          </div>

  {orderData?.map((element) => (
            <div key={element._id} className="mb-4">
              <div className="d-flex mx-3 flex-row justify-content-between align-items-center my-2">
                <div className="fs-6 fw-bold">Order ID : {element._id}</div>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}>
                  <Button
                    variant="none"
                    onClick={() => handleDownload({ element })} >
                    <MdDownloading
                      className="fs-2"
                      style={{ color: "rgb(251, 181, 4)" }}/>
                  </Button>
                </OverlayTrigger>
              </div>

              {element.movies.map((movie) => (
                <OrderSummaryCard
                  key={movie._id}
                  {...movie}
                  updatedAt={element.updatedAt}
                />
              ))}
               <div className="text-end fw-bold fs-4 mx-2">
                Total Price :
                <span className="fw-bold ms-1 fs-4">
                  $
                  {element.movies
                    .map((p) => p.amount)
                    .reduce((acc, cv) => acc + cv, 0)}
                </span>
              </div>
              <hr />
            </div>
          ))}
  

 {orderData?.slice((page - 1) * postPerPage, page * postPerPage).map((item) => (
          <div key={item._id} className="mb-4">
          {item.title}
        </div>
      ))}


    <Pagination
        page={page}
        onChange={(e, value) => setPage(value)} // 1 , 2, 3.....
        count={Math.ceil(orderData.length / postPerPage)}
         // 100/10 >>10
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        size="small"
        defaultPage={1}
      />

    <Fade in={show}>
      <div className="position-fixed bottom-0 end-0 m-4">
        <Button
          variant="success"  
          onClick={scrollToTop}
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '50px', height: '50px' }}
        >
           <IoMdArrowRoundUp  className="text-white fs-1"/>
        </Button>
      </div>
    </Fade>

        </div>
      </div>
    </>
  );
}

export default OrderSummary;
