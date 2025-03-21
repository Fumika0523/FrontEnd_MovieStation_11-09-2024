function OrderSummaryCard({movieposter,moviename,amount}){
   
   
   
    return(
        <>
        <div className="d-flex" >
            <img src={movieposter} alt="" style={{width:"28%",marginBottom:"1%"}}/>
            <div className="fs-5 ms-3" style={{width:"100%"}}>
                {/* WHen you click today, >>  */}
            <div className="pb-1" >Ordered on Jul 14</div> 
            <div className="d-flex" style={{justifyContent:"space-between"}}>
             <div>{moviename}</div>
            <div>Price : {amount}</div>
            </div>
            </div>
            </div>
        </>
    )
}
export default OrderSummaryCard