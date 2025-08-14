import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import CustomizedTables from "./CustomizedTables"
import MovieActionButtons from "../Movie/MovieActionButtons"
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from "react-redux";


function AllEnquiries({ mode }) {

    const token = sessionStorage.getItem('token')
    const [enquiryData, setEnquiryData] = useState([])
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // ALL
    const getEnquiryData = async () => {
        //console.log("EnquiryData is called..")
        let res = await axios.get(`${url}/allenquiry`)
        //console.log("res.data.allEnquiry", res.data.allEnquiry)
        setEnquiryData(res.data.allEnquiry)
    }
    useEffect(() => {
        getEnquiryData()
    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // You can adjust as needed
     
    const navigate = useNavigate()
     const wishlist = useSelector(store => store.wishlist.wishItems);
     const cart = useSelector(store => store.cart.cartItems)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEnquiries = enquiryData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(enquiryData.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // API call has to be made inside UseEffect () only

    return (
        <>
            <div className="my-3   mx-auto border-4  border-warning " >
                <div className="mb-5 mx-sm-4  "> 
                    <MovieActionButtons
                        mode={mode}
                        navigate={navigate}
                        wishlistCount={wishlist?.length || 0}
                        wishlist={wishlist}
                        cartCount={cart?.length || 0}
                        cart={cart}
                        />
                </div>

                <div className="border-4 d-flex  flex-column col-11  mx-auto">


                    {
                        enquiryData?.length === 0 ?
                            <>
                                <AboutUs_ImageBanner
                                    cardText={"No Enquires Generated So Far!!"}
                                    banner={"https://img.pikbest.com/wp/202405/tv-console-contemporary-displaying-a-modern-smart-in-sleek-living-room-with-dark-flooring-3d-rendered_9845708.jpg!bw700"}
                                />
                            </>
                            :
                            <>
                                <CustomizedTables enquiryData={currentEnquiries} setEnquiryData={setEnquiryData} mode={mode} />


                                <Pagination className="justify-content-center mt-5">
                                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} />

                                    {currentPage > 2 && (
                                        <>
                                            <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
                                            {currentPage > 3 && <Pagination.Ellipsis />}
                                        </>
                                    )}

                                    {Array.from({ length: totalPages }, (_, index) => index + 1)
                                        .filter(page => Math.abs(page - currentPage) <= 1)
                                        .map(page => (
                                            <Pagination.Item
                                                key={page}
                                                active={page === currentPage}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </Pagination.Item>
                                        ))
                                    }

                                    {currentPage < totalPages - 1 && (
                                        <>
                                            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                                            <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>
                                        </>
                                    )}

                                    <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} />
                                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                                </Pagination>
                            </> }
                </div>
            </div>
        </>
    )
}
export default AllEnquiries