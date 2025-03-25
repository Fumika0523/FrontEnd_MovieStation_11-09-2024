import { Button } from "react-bootstrap"

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

    const deliveryDate = ("Mar 21 2025")
   const Date1 = new Date ()
    
    const Today = Date1.setDate(Date1.getDate()+4)
    console.log("Today' Date", Date1)
    const EstimatedDeliveryDate = formatDate(Today )
   console.log(EstimatedDeliveryDate)

   // 1. comparing with orderDate < Deliverydate
   // 2. orderDate + DeliveryDate should pass today >> Delivered
    return(
        <>
        <div className="d-flex flex-row mb-5 row mx-auto" style={{}} >
            <div className=" d-flex justify-content-center align-items-center col-5"><img src={movieposter} alt="" style={{width:"100%"}}/></div>

            <div className=" col-7">
                {/* WHen you click today, >>  */}
                <div className="d-flex flex-row justify-content-between align-items-center mb-2">
            <div className="" >Order Date  {formatDate(updatedAt)} </div> 
            {/* When the delivery date has crossed, automatically the status should change to delivered */}
                {
                    deliveryDate > Today ?
                    <Button variant="warning" style={{fontSize:"17px",padding:"1px 2%"}}>Processing</Button>
                    :
                    <Button variant="primary" style={{fontSize:"17px",padding:"1px 2%"}}>Delivered</Button>

                }
                </div>

            {/* <div className="text-secondary "> {formatDate(updatedAt)}</div> */}
            <div className="text-secondary mb-3">Estimated delivery {EstimatedDeliveryDate}</div>

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
//total cost should show on Order summary