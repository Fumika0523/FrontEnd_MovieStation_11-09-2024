import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"

function AllEnquiries() {
 
    const [enquiryData, setEnquiryData] = useState([])

    const token = sessionStorage.getItem('token')
    console.log(token)

    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const getEnquiryData = async () => {
        console.log("Enquiry Data is called....")
        let res = await axios.get(`${url}/allenquiry`, config)
        console.log(res.data.enquiryData)
        setEnquiryData(res.data.enquiryData)
    }

    useEffect(() => {
        getEnquiryData()
    }, []) // APIC call has to be made inside UseEffect () only

    return (
        <>
            <table className="container my-5">
                <tr> 
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile Phone No.</th>
                    <th>Subject</th>
                    <th>Enquiry</th>
                </tr>
                {
                    enquiryData?.map((element, index) => (
                        <tr>
                            <td>{element.firstname}</td>
                            <td>{element.lastname}</td>
                            <td>{element.email}</td>
                            <td>{element.mobilePhoneNum}</td>
                            <td>{element.subject}</td>
                            <td>{element.description}</td>
                        </tr>
                    ))
                }

            </table>


        </>
    )
}
export default AllEnquiries