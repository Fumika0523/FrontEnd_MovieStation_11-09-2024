function OrderSummaryCard({movieposter,moviename,amount,updatedAt}){
   
   console.log(updatedAt)
   
   const formatDate = (dateString) =>{
    console.log(dateString)
    const date = new Date (dateString)
    console.log(date)
    return date.toLocaleDateString('en-US',{
        year:"numeric",
        month:"short",
        day:"numeric"
    })
   }
    return(
        <>
        <div className="d-flex" >
            <img src={movieposter} alt="" style={{width:"28%",marginBottom:"1%"}}/>
            <div className="ms-3" style={{width:"100%"}}>
                {/* WHen you click today, >>  */}
            <div className="mb-1 fs-5" >Ordered on {formatDate(updatedAt)}</div> 

            <div>Deliver on {formatDate(updatedAt)}</div>

            <div className="d-flex" style={{justifyContent:"space-between"}}>
             <div>MovieName: <span >{moviename}</span></div>
            <div>Price : {amount}</div>
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