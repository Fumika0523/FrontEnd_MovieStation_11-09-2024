function OrderSummary(){
    return(
        <>
         
        <div className="container border my-5 p-5" style={{width:"70%"}}>
            <h1 className="pb-3 fs-2">Order Summary</h1>
           <div className="d-flex">
            <img src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-macbookair-wallpaper-screen_11102020_big.jpg.large_2x.jpg" alt="" style={{width:"18%"}}/>
            <div className="fs-5 ms-3 my-5">
            <div className="pb-1">Delivered on Jul14</div>
            <div>Moviename</div>
            </div>
            </div>
        </div>
        </>
    )
}
export default OrderSummary