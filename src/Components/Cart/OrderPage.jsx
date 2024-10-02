
function CartPage(){
    return(
        <>
    <div className="mx-4">
     <h1 className=" py-1">Cart Page</h1>
     <div className="text-start py-1 fs-3">Order ID: 334902461</div>
     <div className="text-start py-1 text-secondary">Order date: <span className="text-white">Feb 16,2022</span></div>
     <div className="border-top border-bottom border-secondary">
    
    {/* MACBOOK */}
    <div className="d-flex pt-4 pb-2 ">
    <img src="https://image.biccamera.com/img/00000009687612_A01.jpg?sr.dw=600&sr.jqh=60&sr.dh=600&sr.mat=1" className="rounded" alt="" style={{height:"120px",with:"10%"}}/>
    <div className="text-start ms-4 mt-3" style={{width:'65%'}}>
    <div style={{fontSize:"120%"}}>MacBook Pro 14"</div>
    <div className="text-secondary">Space Gray | 32GB | 1TB</div>
    </div>
    
    {/* Price & Qty */}
    <div className="text-end" style={{width:"35%"}}>
    <div>$2599.00</div>
    <div className="text-secondary">Qty:1</div>
    </div>
    </div>
    
    {/* iPad Pro 12.9 */}
    <div className="d-flex pb-2 ">
    <img src="https://image.biccamera.com/img/00000009687612_A01.jpg?sr.dw=600&sr.jqh=60&sr.dh=600&sr.mat=1" alt="" style={{height:"120px",with:"10%"}} className="rounded"/>
    <div className="text-start ms-4 mt-3" style={{width:'65%'}}>
    <div style={{fontSize:"120%"}}>iPad Pro 12.9"</div>
    <div className="text-secondary">Space Gray | 2TB | Cellular</div>
    </div>

    {/* Price & Qty */}
    <div style={{width:"35%"}} className="text-end">
    <div>$2399.00</div>
    <div className="text-secondary">Qty:1</div>
    </div>
    </div>
    
    {/* AirPods Max */}
    <div className="d-flex pb-4">
    <img src="https://image.biccamera.com/img/00000009687612_A01.jpg?sr.dw=600&sr.jqh=60&sr.dh=600&sr.mat=1" alt="" style={{height:"120px",with:"10%"}} className="rounded"/>
    <div className="text-start mt-3 ms-4" style={{width:'65%'}}>
    <div style={{fontSize:"120%"}}>AirPods Max</div>
    <div className="text-secondary">Space Gray</div>
    
    {/* Price & Qty */}
    </div>
    <div style={{width:"35%"}} className="text-end">
    <div>$2599.00</div>
    <div className="text-secondary">Qty:1</div>
    </div>
    </div>
     </div>
     
        <div className="text-end py-3" style={{marginRight:"20%",fontSize:"120%"}}>Order Summary</div>
        {/* Dotted underline */}
        <div style={{borderBottom:"1px dotted grey", width:"50%", marginLeft:"50%"}}>
    </div>
     <div className="text-end" style={{marginRight:"41%"}}>
        Total
    </div>
     
     </div>
    </>
    )
}
export default CartPage


