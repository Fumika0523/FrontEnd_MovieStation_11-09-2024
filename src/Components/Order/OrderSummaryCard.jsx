import { Button } from "react-bootstrap"
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";


function OrderSummaryCard({movieposter,moviename,amount,updatedAt}){
   
//    console.log(updatedAt)
//    console.log("amount",amount)
//    console.log("moviename",moviename)
   const formatDate = (dateString) =>{
    // console.log(dateString)
    const date = new Date (dateString)
    // console.log(date)
    return date.toLocaleDateString('en-US',{
        year:"numeric",
        month:"short",
        day:"numeric"
    })
   }

   const getDateOnly = (dateObj) => {
    return dateObj.toISOString().split("T")[0]
  };
    const TodayDate = new Date()
    const orderDateObj = new Date(updatedAt)
    const estimatedObj = new Date(orderDateObj)
    estimatedObj.setDate(estimatedObj.getDate()+4)

    const currentDate = getDateOnly(TodayDate)
    const orderDate = getDateOnly(orderDateObj)
    const estimatedDeliveryDate = getDateOnly(estimatedObj)
    // console.log("currentDate",currentDate)
    // console.log("orderDate",orderDate)
    // console.log("EstimatedDate",estimatedDeliveryDate)
       
//    if (currentDate == EstimatedDeliveryDate )
//     {
//         console.log("Success")
//    } 
//    if (currentDate < EstimatedDeliveryDate){
//     console.log("accepted")
// }
// if (currentDate > EstimatedDeliveryDate){
//     console.log("Failed")
// }

// currentDate == EstimatedDeliveryDate || EstimatedDeliveryDate >= currentDate ? 
// console.log("Success") :
// currentDate < EstimatedDeliveryDate ?
// console.log("Accepted") :
// currentDate > EstimatedDeliveryDate ?
// console.log("Failed") :
// console.log("Not Allowed")


   //3. single click > Asc sort
   //4. Double-click > Desc
   //5. url should be passed from front-end, toggle



    return(
    <>
        <div className="d-flex flex-row mb-5 row mx-auto" 
            style={{}} >
            <div className=" d-flex justify-content-center align-items-center col-md-5 mb-2 col-12">
                <img src={movieposter} alt="" style={{width:"100%"}}/></div>
            <div className=" col-md-7 col-12">
                {/* WHen you click today, >>  */}  
            <div className="justify-content-between fs-5 mb-3 d-flex flex-row text-secondary align-items-center">
            <div className="" >Ordered <FaCheck className="text-primary fs-5 mx-1" />
            <span className="ms-1">{formatDate(orderDate)}</span> 
        </div> 

        {/* OD ED || ED OD >> Contradicting conditions >> constant >> CurrentDate
        Delivery STatus (Date-based comparison only)  */}
          {              
        //   28(CD) == 28(ED) >>>> Delivered || 29(CD) > 28(ED) >> Delivered
             currentDate >= estimatedDeliveryDate ?
             (
                <Button variant="primary" style={{fontSize:"17px",padding:"1px 2%"}}>Delivered</Button>
             )
            :  
            currentDate >= orderDate? (
                //28(CD) == 28(OD) >> Processing || 29(CD) > 28(OD) >> Processing
                <Button variant="warning" style={{fontSize:"17px",padding:"1px 2%"}}>Processing</Button>
            )
            :
           (     
            <Button variant="secondary" style={{fontSize:"17px",padding:"1px 2%"}}>Pending</Button> 
        )
        }
            </div>  
                <div className="fs-5 mb-3 d-flex flex-row align-items-center">
                    Expected
                <TbTruckDelivery className="mx-1 fs-4 text-success"/>
                {formatDate(estimatedDeliveryDate)}
                </div>
     
            <div className="d-flex justify-content-between" >
            <div>{moviename}</div>
            <div>Price : $ {amount}</div>
            
            </div>
            </div>
            </div>
    </>
    )
}
export default OrderSummaryCard

//status Button
// delivery date is after 7 day of order day
//order on <Button>In transit >> After 7 days <delivered> <<< thin button
//should remain delivered status after ,
//total cost should show on Or