import React from "react";


function CartCard({ movieposter, moviename, amount }) {
    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-center pt-4 pb-2 ">
                <img src={movieposter} className="rounded" alt="" style={{ width: "25%" }} />
                <div className="text-start ms-4 mt-3" style={{ width: '65%' }}>
                    <div className="">{moviename}</div>                   
                </div>

                {/* Price & Qty */}
                <div className="text-end" style={{ width: "35%" }}>
                    <div>${amount}</div>
                    {/* <div className="text-secondary">Qty:1</div> */}
                </div>
            </div>

        </>
    )
}
export default CartCard