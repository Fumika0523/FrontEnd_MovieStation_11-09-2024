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
    // const deliveryDate = ("Mar 21 2025")
    const TodayDate = new Date()
    const orderDateObj = new Date(updatedAt)
    const estimatedObj = new Date(orderDateObj)
    estimatedObj.setDate(estimatedObj.getDate()+4)

    const currentDate = getDateOnly(TodayDate)
    const orderDate = getDateOnly(orderDateObj)
    const estimatedDeliveryDate = getDateOnly(estimatedObj)
    console.log("currentDate",currentDate)
    console.log("orderDate",orderDate)
    console.log("EstimatedDate",estimatedDeliveryDate)
    // const currentDate = "Mar 30, 2025"
    //  console.log("Today' Date:", currentDate)

    // const orderDate = formatDate(updatedAt)

    // console.log("Order Date", orderDate)

    //  const Date1 = new Date (updatedAt)
     //when its empty inside () >>> giving you a today' date. we want to get in iso format
    //  console.log(Date1)

    
 
    //  const EstimatedDeliveryDate = formatDate(Today )
     
    // const EstimatedDeliveryDate = "Mar 28, 2025"
    // const EstimatedDeliveryDate = updatedAt.setDate(updatedAt.getDate()+4)
//    console.log("estimateddeliverydate:",EstimatedDeliveryDate)

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

   // 1. comparing with orderDate < Deliverydate
   // 2. orderDate + DeliveryDate should pass today >> Delivered
    return(
    <>
        <div className="d-flex flex-row mb-5 row mx-auto" 
        style={{}} >
            <div className=" d-flex justify-content-center align-items-center col-md-5 mb-2 col-12">
                <img src={movieposter} alt="" style={{width:"100%"}}/></div>
            <div className=" col-md-7 col-12">
                {/* WHen you click today, >>  */}  
            <div className="d-flex justify-content-between align-items-center  mb-2">
            <div className="" >Ordered <FaCheck className="text-primary me-1" />
            <span>{orderDate}</span> </div> 
        
          {
             (estimatedDeliveryDate > orderDate  )?
             <Button variant="primary" style={{fontSize:"17px",padding:"1px 2%"}}>Delivered</Button>
            :  
            <Button variant="secondary" style={{fontSize:"17px",padding:"1px 2%"}}>Pending</Button> 
          }
          {
            (orderDate < estimatedDeliveryDate ) ?
            <>
            <Button variant="warning" style={{fontSize:"17px",padding:"1px 2%"}}>Processing</Button>
            </>
             :
             null
            }
   </div>

            {/* <div className="text-secondary "> {formatDate(updatedAt)}</div>  */}
             <div className="text-secondary mb-3 ">Estimated delivery 
                <TbTruckDelivery className="mx-1 fs-4 text-success"/>
                {estimatedDeliveryDate}</div>

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